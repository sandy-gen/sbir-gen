import { Request, Response } from 'express'
import { Solicitation } from '../database/entities/Solicitation'
import { Topic } from '../database/entities/Topic'
import { classToPlain, instanceToPlain } from 'class-transformer'
import { SolicitationTopic } from '../dto/SolicitationTopic'

const solicitationTopicData = [
    {
        id: 1,
        solicitation: {
            solicitation_title: 'DOD SBIR 24.4 Annual ',
            solicitation_number: '24.4',
            agency: 'Department of Defense',
            branch: 'N/A',

            open_date: '2023-10-03',
            close_date: '2025-03-31',
            application_due_date: ['2025-03-31'],
            sbir_solicitation_link: 'https://www.sbir.gov/node/2484451',
            solicitation_agency_url: 'https://www.defensesbirsttr.mil/SBIR-STTR/Opportunities/',
            current_status: 'open'
        },
        topic: {
            topic_title: 'xTech Search 8 SBIR Finalist Open Topic Competition',
            branch: 'Army',
            topic_number: 'A244-P001',
            topic_description:
                'OUSD (R&E) MODERNIZATION PRIORITYems\u2019 life cycle. Critical technology focus areas include Artificial Intelligence / Machine Learning (AI/ML); Advanced Materials; Advanced Manufacturing; Autonomy; Cyber; Electronics; Human Performance; Immersive; Network Technologies; Position, Navigation and Timing (PNT); Power; Software Modernization; and Sensors. See attached document on the Valid Eval registration page for a list of the top Army Modernization Priorities and other critical Army Focus Areas.\u00a0 \r\n\r\n\u00a0\r\n\r\n'
        }
    }
]

export class SolicitationService {
    getAllSolicitationTopics() {
        // const solicitationTopics = this.solicitationRepo.find({
        //     relations: ["topic"],
        // });
        const solicitationTopics = solicitationTopicData

        return solicitationTopics
    }
    constructor(appDataSource: any) {
        this.appDataSource = appDataSource
        this.solicitationRepo = this.appDataSource.getRepository(Solicitation)
        this.topicRepo = this.appDataSource.getRepository(Topic)
    }

    appDataSource: any
    solicitationRepo: any
    topicRepo: any

    async processSolicitations() {
        console.log('Processing solicitations')
        // const cronJob = new CronJob('*/1000 * * * * *', async () => {
        // console.log('Running cron job')
        await this.fetchSolicitationData().then((data) => {
            // console.log('Data:', data)
            this.saveSolicitations(data)
            return data
        })

    }

    async saveSolicitations(data: any) {
        console.log('Saving solicitations')
        let counter = 0
        const savedSolicitations: any[] = []
        data?.forEach((solicitation: any, i: number) => {
            counter++
            const newSolicitation = this.solicitationRepo.create(solicitation)
            newSolicitation.topics = solicitation.solicitation_topics.map((topic: any) => {
                const newTopic = this.topicRepo.create(topic)
                return newTopic
            })
            this.solicitationRepo.save(newSolicitation)
            savedSolicitations.push(newSolicitation)
        })
        console.log(`Saved ${counter} solicitations`)
    }

    async fetchSolicitationData() {
        const url = 'https://www.sbir.gov/api/solicitations.json'
        return fetch(url)
                .then((res: any) => res.json())
                .then((data) => {
                    console.log('Data fetched')
                    return data
            })
            .catch((err) => {
                console.log(err)
            })
    }
    

    async createSolicitation(req: Request) {
        // Create a solicitation
        const newSolicitation = new Solicitation()
        const body = req.body
        Object.assign(newSolicitation, body)
        await this.solicitationRepo.save(newSolicitation)
        return { message: 'Solicitation created' }
    }

    async updateSolicitation(id: string, req: Request) {
        // Update a solicitation
        const solicitation = await this.solicitationRepo.findOne(id)
        if (!solicitation) {
            return { message: 'Solicitation not found' }
        }
        const body = req.body
        Object.assign(solicitation, body)
        await this.solicitationRepo.save(solicitation)
        return { message: 'Solicitation updated' }
    }

    async deleteSolicitation(id: string) {
        // Delete a solicitation
        const solicitation = await this.solicitationRepo.findOne(id)
        if (!solicitation) {
            return { message: 'Solicitation not found' }
        }
        solicitation.isDeleted = true
        await this.solicitationRepo.save(solicitation)
        return { message: 'Solicitation deleted' }
    }

    async getSolicitation(id: string) {
        // Get a solicitation
        const solicitation = await this.solicitationRepo.findOne(id)
        return solicitation
    }

    async getSolicitationTopic(id: string) {
        // Get a solicitation topic
        const solicitation = await this.solicitationRepo.createQueryBuilder('solicitation')
            .innerJoinAndSelect('solicitation.topics', 'topic')
            .where('solicitation.id = :id', { id: id })
            .getOne()
        return solicitation
    }


    async getSolicitationTopics(req: Request, res: Response) {
        try {

            const solicitations = await this.solicitationRepo.createQueryBuilder('solicitation')
            .leftJoinAndSelect('solicitation.topics', 'topic')
            .select([
                'solicitation.id',
                'solicitation.solicitation_title',
                'solicitation.solicitation_number',
                'solicitation.open_date',
                'solicitation.close_date',
                'topic.id',
                'topic.topic_title',
                'topic.topic_description',
                'topic.branch'
            ])
            .orderBy('solicitation.id', 'ASC')
            .getMany();

        // Serialize the solicitations using classToPlain to ensure no circular references
        const serializedSolicitations = instanceToPlain(solicitations);

        // Flatten the structure
        const flattenedData = serializedSolicitations.flatMap((solicitation: { topics: any[]; id: any; solicitation_title: any; solicitation_number: any; open_date: any; close_date: any }) => 
            solicitation.topics.map(topic => new SolicitationTopic({
                solicitation_id: solicitation.id,
                solicitation_title: solicitation.solicitation_title,
                solicitation_number: solicitation.solicitation_number,
                open_date: solicitation.open_date,
                close_date: solicitation.close_date,
                topic_id: topic.id,
                topic_title: topic.topic_title,
                topic_description: topic.topic_description,
                topic_branch: topic.branch,
            }))
        );
        
        // Return the flattened data
        return flattenedData;
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'An error occurred while fetching solicitations with topics.' });
        }
    }
    async getAllSolicitations(req: Request, res: Response) {
        // Get all solicitations
        const solicitations = await this.solicitationRepo.find()
        return res.json(solicitations)
    }

    async getSolicitationsByAgency(agency: string) {
        // Get all solicitations by agency
        console.log('Agency:', agency)
        const solicitations = await this.solicitationRepo.find({
            where: { agency: agency }
        })
        return solicitations
    }

    async getAgencies() {
        // Get all agencies
        const agencies = await this.solicitationRepo.createQueryBuilder('solicitation').select('agency').distinct(true).getRawMany()
        return agencies
    }
}

export default SolicitationService
