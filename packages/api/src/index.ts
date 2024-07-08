import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import cors from 'cors'
import http from 'http'
import logger from './utils/logger'
import { expressRequestLogger } from './utils/logger'
import * as fs from 'fs'
import { Server } from 'socket.io'
// import { Variable } from './database/entities/Variable'
import { User } from './database/entities/user/User'
// import { PromptTemplate } from './database/entities/PromptTemplate'
// import { UserAuthenticationRequest } from "./database/entities/user/UserAuthenticationRequest";
import { UserProfile } from './database/entities/user/UserProfile'
import { Company } from './database/entities/org/Company'
import jwt from 'jsonwebtoken'
import md5 from 'md5'
import InitUsers from './InitUsers'
import { getDataSource } from './DataSource'
import SolicitationService from './services/solicitation_service'
import UserTopicService from './services/user_topic_service'
import { sanitizeMiddleware } from './utils/XSS'
import { generateDeck } from './utils/deck_generator'
import { UserInputData } from './Interface'
import { UserAuthenticationRequest } from './dto/UserAuthenticationRequest'
import { Proposal } from './database/entities/Proposal'

const secretKey = '83477efdhdfhdiseiy'

const initDb = process.env.INIT_USERS || false
export class App {
    app: express.Application
    AppDataSource = getDataSource()

    constructor() {
        this.app = express()
    }

    async initDatabase() {
        // Initialize database
        this.AppDataSource.initialize()
            .then(async () => {
                logger.info('📦 Data Source has been initialized!')

                // Run Migrations Scripts
                await this.AppDataSource.runMigrations({ transaction: 'each' })

                if (initDb) {
                    logger.info('📦 Initializing DB with users')
                    InitUsers()
                        .then(() => {
                            logger.info('✅ Users have been initialized!')
                        })
                        .catch((err) => {
                            logger.error('❌ Error during DB user initialization:', err)
                        })
                } else {
                    logger.info('🆗 Skipping DB user initialization')
                }

                logger.info('✅ SBIR GEN is now running!')
            })
            .catch((err) => {
                logger.error('❌ [server]: Error during Data Source initialization:', err)
            })
    }

    authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (!token) {
            return res.sendStatus(401)
        }

        jwt.verify(token, secretKey, (err: any) => {
            if (err) {
                return res.sendStatus(403)
            }

            next()
        })
    }

    async config(socketIO?: Server) {
        // Limit is needed to allow sending/receiving base64 encoded string
        this.app.use(express.json({ limit: '50mb' }))
        this.app.use(express.urlencoded({ limit: '50mb', extended: true }))

        if (process.env.NUMBER_OF_PROXIES && parseInt(process.env.NUMBER_OF_PROXIES) > 0)
            this.app.set('trust proxy', parseInt(process.env.NUMBER_OF_PROXIES))

        // Allow access from *
        this.app.use(cors())

        // Switch off the default 'X-Powered-By: Express' header
        this.app.disable('x-powered-by')

        // Add the expressRequestLogger middleware to log all requests
        this.app.use(expressRequestLogger)

        // Add the sanitizeMiddleware to guard against XSS
        this.app.use(sanitizeMiddleware)
        // this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
        const whitelistURLs = ['/api/v1/user/uaa/', '/api/v1/ip', '/api/v1/solicitation', '/api/v1/proposal', '/api/v1/user-topic']

        this.app.use((req, res, next) => {
            if (req.url.includes('/api/v1/')) {
                whitelistURLs.some((url) => req.url.includes(url)) ? next() : this.authenticateToken(req, res, next)
            } else next()
        })
        const upload = multer({
            dest: `${path.join(__dirname, '..', 'uploads')}/`
        })
    
        this.app.get('/api/v1/ip', (request, response) => {
            response.send({
                ip: request.ip,
                msg: 'See the returned IP address in the response. If it matches your current IP address ( which you can get by going to http://ip.nfriedly.com/ or https://api.ipify.org/ ), then the number of proxies is correct and the rate limiter should now work correctly. If not, increase the number of proxies by 1 until the IP address matches your own.'
            })
        })
        
        this.app.post('/api/v1/user/:id/cp', async (req: Request, res: Response) => {
            const body = req.body
            const updatedUser = new User()
            Object.assign(updatedUser, body)
            const id = req.params.id
            const user = await this.AppDataSource.getRepository(User).find({
                where: { id }
            })
            if (user.length === 0) return res.status(404).send(`User ${updatedUser.username} not found`)
            updatedUser.password = md5(updatedUser.password)
            Object.assign(user, updatedUser)
            const results = this.AppDataSource.getRepository(User).save(user)
            return res.json(results)
        })

        // Authenticate
        this.app.post('/api/v1/user/uaa', async (req: Request, res: Response) => {
            const body = req.body
            const newUserAuthenticationRequest = new UserAuthenticationRequest()
            Object.assign(newUserAuthenticationRequest, body)

            // password is hidden and can't be queried using repo.find(), need to use query builder
            const userAuth = await this.AppDataSource.getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.userProfile', 'userProfile')
                .where('user.username = :username', {
                    username: newUserAuthenticationRequest.username
                })
                .andWhere('user.password = :password', {
                    password: newUserAuthenticationRequest.password
                })
                .printSql()
                .getOne()

            if (userAuth) {
                const token = jwt.sign({ userAuth }, secretKey)
                return res.json({ token })
            }

            return res.status(403).send(`User ${newUserAuthenticationRequest.username} not found`)
        })

        // ----------------------------------------
        // User
        // ----------------------------------------

        // Create new user
        this.app.post('/api/v1/user/new', async (req: Request, res: Response) => {
            const newUser = req.body
            if (!newUser.username) return res.status(400).send(`Username is required`)
            if (!newUser?.userProfile?.emailAddress) return res.status(400).send(`Email is required`)
            const userRepo = this.AppDataSource.getRepository(User)

            // todo: TS-45 changes this (switch login to email) - what is the unique identifier?
            const existingUser = await userRepo.findOneBy({
                username: newUser.username
            })
            if (existingUser) return res.status(400).send(`User ${newUser.username} already exists`)

            // todo: TS-78 - password should be required and editable on form
            newUser.password = md5('1234')
            const savedUser = await userRepo.save(newUser)
            return res.json(savedUser)
        })

        //Update user
        this.app.patch('/api/v1/user/:id', async (req: Request, res: Response) => {
            const body = req.body
            const id = req.params.id
            const userRepo = this.AppDataSource.getRepository(User)
            const existingUser = await userRepo.findOneBy({ id })
            if (!existingUser) return res.status(404).send(`User with id: ${id} not found`)

            const { userProfile, ...userUpdate } = body
            Object.assign(existingUser, userUpdate)

            if (userProfile) {
                Object.assign(existingUser.userProfile, userProfile)
            }
            const results = await userRepo.save(existingUser)
            return res.json(results)
        })

        // Get all users
        this.app.get('/api/v1/user', async (req: Request, res: Response) => {
            // profiles are eagerly loaded
            const results = await this.AppDataSource.getRepository(User).find()
            return res.json(results)
        })

        // Get user by id
        this.app.get('/api/v1/user/:id', async (req: Request, res: Response) => {
            const id = req.params.id
            const existingUser = await this.AppDataSource.getRepository(User).findOneBy({ id })
            if (!existingUser) return res.status(404).send(`User with id: ${id} not found`)
            return res.json(existingUser)
        })

        // Delete user by id
        this.app.delete('/api/v1/user/:id', async (req: Request, res: Response) => {
            const id = req.params.id
            const results = await this.AppDataSource.getRepository(User).delete({
                id
            })
            return res.json(results)
        })

        // ----------------------------------------
        // Company
        // ----------------------------------------

        // Create new company
        this.app.post('/api/v1/company', async (req: Request, res: Response) => {
            const body = req.body
            const newCompany = new Company()
            Object.assign(newCompany, body)
            const results = await this.AppDataSource.getRepository(Company).save(newCompany)
            return res.json(results)
        })

        // Update company
        this.app.patch('/api/v1/company/:id', async (req: Request, res: Response) => {
            const body = req.body
            const id = req.params.id
            const companyRepo = this.AppDataSource.getRepository(Company)
            const existingCompany = await companyRepo.findOneBy({ id })
            if (!existingCompany) return res.status(404).send(`Company with id: ${id} not found`)

            Object.assign(existingCompany, body)

            const results = await companyRepo.save(existingCompany)
            return res.json(results)
        })

        // Get all companies
        this.app.get('/api/v1/company', async (req: Request, res: Response) => {
            const results = await this.AppDataSource.getRepository(Company).find()
            return res.json(results)
        })

        // Get company by id
        this.app.get('/api/v1/company/:id', async (req: Request, res: Response) => {
            const id = req.params.id

            const results = await this.AppDataSource.getRepository(Company).find({
                where: { id }
            })
            return res.json(results)
        })

        // Delete company by id
        this.app.delete('/api/v1/company/:id', async (req: Request, res: Response) => {
            const results = await this.AppDataSource.getRepository(Company).delete(req.params.id)
            return res.json(results)
        })

        // ----------------------------------------
        // User Profile
        // ----------------------------------------

        // Get all user profiles
        this.app.get('/api/v1/user-profile', async (req: Request, res: Response) => {
            const results = await this.AppDataSource.getRepository(UserProfile).find()
            return res.json(results)
        })

        // Create new user profile
        this.app.post('/api/v1/user-profile', async (req: Request, res: Response) => {
            const body = req.body
            const newUserProfile = new UserProfile()
            Object.assign(newUserProfile, body)
            const results = await this.AppDataSource.getRepository(UserProfile).save(newUserProfile)
            return res.json(results)
        })

        // Update user profile
        this.app.patch('/api/v1/user-profile/:id', async (req: Request, res: Response) => {
            const body = req.body
            const newUserProfile = new UserProfile()
            Object.assign(newUserProfile, body)
            const results = await this.AppDataSource.getRepository(UserProfile).save(newUserProfile)
            return res.json(results)
        })

        // Get user profile by id
        this.app.get('/api/v1/user-profile/:id', async (req: Request, res: Response) => {
            const id = req.params.id
            const results = await this.AppDataSource.getRepository(UserProfile).find({ where: { id } })
            return res.json(results)
        })

        // Delete user profile by id
        this.app.delete('/api/v1/user-profile/:id', async (req: Request, res: Response) => {
            const results = await this.AppDataSource.getRepository(UserProfile).delete(req.params.id)
            return res.json(results)
        })

        this.app.get('/api/v1/version', async (req: Request, res: Response) => {
            const getPackageJsonPath = (): string => {
                const checkPaths = [
                    path.join(__dirname, '..', 'package.json'),
                    path.join(__dirname, '..', '..', 'package.json'),
                    path.join(__dirname, '..', '..', '..', 'package.json'),
                    path.join(__dirname, '..', '..', '..', '..', 'package.json'),
                    path.join(__dirname, '..', '..', '..', '..', '..', 'package.json')
                ]
                for (const checkPath of checkPaths) {
                    if (fs.existsSync(checkPath)) {
                        return checkPath
                    }
                }
                return ''
            }

            const packagejsonPath = getPackageJsonPath()
            if (!packagejsonPath) return res.status(404).send('Version not found')
            try {
                const content = await fs.promises.readFile(packagejsonPath, 'utf8')
                const parsedContent = JSON.parse(content)
                return res.json({ version: parsedContent.version })
            } catch (error) {
                return res.status(500).send(`Version not found: ${error}`)
            }
        })

        /************************************************************************
         * Solicitation API
         ************************************************************************/
        const solicitationService = new SolicitationService(this.AppDataSource)

        // Ger solicitation topics from solicitation service getSolicitationTopics
        this.app.get('/api/v1/solicitation/solicitation-topics', async (req:Request, res: Response) => {
            const solicitations = await solicitationService.getSolicitationTopics(req, res)
            return res.json(solicitations)
        })


        // Get solicitations from API
        this.app.get('/api/v1/solicitation/retrieve', async (req: Request, res: Response) => {
            return await solicitationService.getAllSolicitations(req, res)
        })

        this.app.get('/api/v1/solicitation/process', async (req: Request, res: Response) => {
            return await solicitationService.processSolicitations()
        })

        this.app.get('/api/v1/solicitation/agency/:agency', async (req: Request, res: Response) => {
            const solicitations = await solicitationService.getSolicitationsByAgency(req.params.agency)
            return solicitations
        })
        this.app.get('/api/v1/solicitation', async (req: Request, res: Response) => {
            const solicitations = await solicitationService.getAllSolicitations(req, res)
            return solicitations
        })

        this.app.get('/api/v1/solicitation/agency', async (req: Request, res: Response) => {
            const agencies = await solicitationService.getAgencies()
            return res.json(agencies)
        })

        this.app.get('/api/v1/solicitation-topic/:id', async (req: Request, res: Response) => {
            const solicitationTopic = await solicitationService.getSolicitationTopic(req.params.id)
            return res.json(solicitationTopic)
        })

        this.app.get('/api/v1/solicitation/list-sol-topic', async (req: Request, res: Response) => {
            const data = await solicitationService.fetchSolicitationData()
            return res.json(data)
        })

        this.app.get('/api/v1/solicitation-topic', async (req: Request, res: Response) => {
            const solicitationTopics = await solicitationService.getAllSolicitationTopics()
            return res.json(solicitationTopics)
        })

        this.app.get('/api/v1/solicitation/:id', async (req: Request, res: Response) => {
            const solicitation = await solicitationService.getSolicitation(req.params.id)
            return res.json(solicitation)
        })

        this.app.post('/api/v1/solicitation', async (req: Request, res: Response) => {
            return await solicitationService.createSolicitation(req)
        })

        this.app.patch('/api/v1/solicitation/:id', async (req: Request, res: Response) => {
            return await solicitationService.updateSolicitation(req.params.id, req)
        })

        this.app.delete('/api/v1/solicitation/:id', async (req: Request, res: Response) => {
            return await solicitationService.deleteSolicitation(req.params.id)
        })

        // ----------------------------------------

        // User Topic
        // ----------------------------------------
        const userTopicService = new UserTopicService(this.AppDataSource)
        // Create new user topic
        this.app.post('/api/v1/user-topic', async (req: Request) => {
            return await userTopicService.createUserTopic(req.body)
        })

        // Update user topic
        this.app.patch('/api/v1/user-topic/:id', async (req: Request, res: Response) => {
            return await userTopicService.updateUserTopic(req.params.id, req.body)
        })

        // Get user topic by id
        this.app.get('/api/v1/user-topic/:id', async (req: Request, res: Response) => {
            return await userTopicService.getUserTopic(req.params.id)
        })

        this.app.get('/api/v1/user-topic', async (req: Request, res: Response) => {
            return await userTopicService.getUserTopics()
        })

        // Delete user topic by id
        this.app.delete('/api/v1/user-topic/:id', async (req: Request, res: Response) => {
            return await userTopicService.deleteUserTopic(req.params.id)
        })

        // ----------------------------------------

        // CRUD Proposal

        // Create new proposal
        this.app.post('/api/v1/proposal', async (req: Request, res: Response) => {
            const body = req.body
            const newProposal = new Proposal()
            Object.assign(newProposal, body)
            const results = await this.AppDataSource.getRepository(Proposal).save(newProposal)
            return res.json(results)
        })

        // Update proposal
        this.app.patch('/api/v1/proposal/:id', async (req: Request, res: Response) => {
            const body = req.body
            const id = req.params.id
            const proposalRepo = this.AppDataSource.getRepository(Proposal)
            const existingProposal = await proposalRepo.findOneBy({ id })
            if (!existingProposal) return res.status(404).send(`Proposal with id: ${id} not found`)

            Object.assign(existingProposal, body)

            const results = await proposalRepo.save(existingProposal)
            return res.json(results)
        })

        // Get all proposals
        this.app.get('/api/v1/proposal', async (req: Request, res: Response) => {
            const results = await this.AppDataSource.getRepository(Proposal).find()
            return res.json(results)
        })

        // Get proposal by id
        this.app.get('/api/v1/proposal/:id', async (req: Request, res: Response) => {
            const id = req.params.id
            const results = await this.AppDataSource.getRepository(Proposal).find({ where: { id } })
            return res.json(results)
        })

        // Delete proposal by id
        this.app.delete('/api/v1/proposal/:id', async (req: Request, res: Response) => {
            const results = await this.AppDataSource.getRepository(Proposal).delete(req.params.id)
            return res.json(results)
        })

        


        // Create endpoint to generate PRD
        this.app.post('/api/v1/generate-prd', async (req: Request, res: Response) => {
            try {
                const userInputData: UserInputData = req.body
                const filePath = await generatePRD(userInputData)
                res.download(filePath, 'generated_prd.txt', (err) => {
                    if (err) {
                        console.error('Error downloading the file:', err)
                    }
                })
            } catch (error) {
                console.error('Error generating PRD:', error)
                res.status(500).json({ message: 'Error generating PRD' })
            }
        })

        // Create endpoint to generate Technical Specifications
        this.app.post('/api/v1/generate-tech-spec', async (req: Request, res: Response) => {
            try {
                const userInputData: UserInputData = req.body
                const filePath = await generateTechSpec(userInputData)
                res.download(filePath, 'generated_tech_spec.txt', (err) => {
                    if (err) {
                        console.error('Error downloading the file:', err)
                    }
                })
            } catch (error) {
                console.error('Error generating Technical Specifications:', error)
                res.status(500).json({ message: 'Error generating Technical Specifications' })
            }
        })

        // CReate endpoint Generate Presentation
        this.app.post('/api/v1/generate-presentation', async (req: Request, res: Response) => {
            try {
                // Example usage
                const userInputData: UserInputData = {
                    product_name: 'Innovative Tech Solution',
                    tagline: 'Revolutionizing the Future',
                    agency: 'National Science Foundation',
                    program: 'Technology Advancement Program',
                    sbir_num: 'NSF-2024-001',
                    company: 'Tech Innovators Inc.',
                    topic_number: 'TI-2024-059',
                    topic_title: 'Advanced AI for Environmental Sustainability',
                    tech_focus: 'Artificial Intelligence, Environmental Science',
                    proposal_number: 'TI-PROP-2024-003',
                    project_overview:
                        'This project aims to develop advanced AI technologies to tackle environmental challenges, including climate change and biodiversity loss.',
                    project_technical_merit:
                        'The project leverages cutting-edge machine learning algorithms to predict climate patterns and suggest measures for biodiversity conservation.',
                    project_team:
                        'Led by Dr. Jane Doe, a renowned expert in AI and environmental science, alongside a dedicated team of researchers and developers.',
                    project_commercialization:
                        'The technology developed will be commercialized through partnerships with environmental organizations and government agencies, providing a scalable solution for global adoption.',
                    technical_problem:
                        'Current environmental prediction models lack accuracy and fail to provide actionable insights for policy-making and conservation efforts.',
                    significance:
                        'Improving prediction models through AI can significantly impact policy formulation, conservation strategies, and ultimately, global environmental sustainability.',
                    solution:
                        'Our solution incorporates advanced machine learning techniques to enhance the accuracy of environmental predictions, enabling effective conservation strategies.',
                    problem_quote: 'The greatest threat to our planet is the belief that someone else will save it.',
                    problem_quote_author: 'Robert Swan'
                }

                const configPath = './deck_generator/config.json'
                generateDeck(userInputData, configPath)
            } catch (error) {
                console.error('Error generating proposal:', error)
                res.status(500).json({ message: 'Error generating proposal' })
            }
            return res.json({ message: 'Presentation generated' })
        })
    }

    async stopApp() {
        try {
            const removePromises: any[] = []
            await Promise.all(removePromises)
        } catch (e) {
            logger.error(`❌[server]: SBIRGEN Server shut down error: ${e}`)
        }
    }
}

let serverApp: App | undefined
export async function start(): Promise<void> {
    serverApp = new App()

    const port = parseInt(process.env.PORT || '', 10) || 8080
    const server = http.createServer(serverApp.app)

    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    })

    await serverApp.initDatabase()
    await serverApp.config(io)

    server.listen(port, () => {
        logger.info(`SBIR GEN Server is listening at ${port}`)
    })
}

export function loadTemplate(templatePath: string): string {
    return fs.readFileSync(templatePath, 'utf-8')
}

export function replaceTokens(template: string, data: UserInputData): string {
    return template.replace(/{{(.*?)}}/g, (_, token) => data[token as keyof UserInputData] || '')
}

export function saveDocument(content: string, filePath: string): void {
    fs.writeFileSync(filePath, content, 'utf-8')
}

export async function generatePRD(inputData: UserInputData): Promise<string> {
    const templatePath = './templates/prdTemplate.txt'
    const template = loadTemplate(templatePath)
    const prdContent = replaceTokens(template, inputData)
    const outputPath = path.join(__dirname, 'generated_prd.txt')
    saveDocument(prdContent, outputPath)
    return outputPath
}

export async function generateTechSpec(inputData: UserInputData): Promise<string> {
    const templatePath = './templates/tsdTemplate.txt'
    const template = loadTemplate(templatePath)
    const techSpecContent = replaceTokens(template, inputData)
    const outputPath = path.join(__dirname, 'generated_tech_spec.txt')
    saveDocument(techSpecContent, outputPath)
    return outputPath
}

export function getInstance(): App | undefined {
    return serverApp
}
