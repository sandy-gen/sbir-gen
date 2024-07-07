import { Command, Flags } from '@oclif/core'
import path from 'path'
import * as Server from '../index'
import * as DataSource from '../DataSource'
import dotenv from 'dotenv'
import logger from '../utils/logger'

dotenv.config({ path: path.join(__dirname, '..', '..', '.env'), override: true })

enum EXIT_CODE {
    SUCCESS = 0,
    FAILED = 1
}
let processExitCode = EXIT_CODE.SUCCESS

export default class Start extends Command {
    static args = []
    static flags = {
        SBIR_GEN_USERNAME: Flags.string(),
        SBIR_GEN_PASSWORD: Flags.string(),
        PORT: Flags.string(),
        DEBUG: Flags.string(),
        APIKEY_PATH: Flags.string(),
        SECRETKEY_PATH: Flags.string(),
        SBIR_GEN_SECRETKEY_OVERWRITE: Flags.string(),
        LOG_PATH: Flags.string(),
        LOG_LEVEL: Flags.string(),
        TOOL_FUNCTION_BUILTIN_DEP: Flags.string(),
        TOOL_FUNCTION_EXTERNAL_DEP: Flags.string(),
        NUMBER_OF_PROXIES: Flags.string(),
        DATABASE_TYPE: Flags.string(),
        DATABASE_PATH: Flags.string(),
        DATABASE_PORT: Flags.string(),
        DATABASE_HOST: Flags.string(),
        DATABASE_NAME: Flags.string(),
        DATABASE_USER: Flags.string(),
        DATABASE_PASSWORD: Flags.string()
    }

    async stopProcess() {
        logger.info('Shutting down SBIR_GEN...')
        try {
            // Shut down the app after timeout if it ever stuck removing pools
            setTimeout(() => {
                logger.info('SBIR_GEN was forced to shut down after 30 secs')
                process.exit(processExitCode)
            }, 30000)

            // Removing pools
            const serverApp = Server.getInstance()
            if (serverApp) await serverApp.stopApp()
        } catch (error) {
            logger.error('There was an error shutting down SBIR_GEN...', error)
        }
        process.exit(processExitCode)
    }

    async run(): Promise<void> {
        process.on('SIGTERM', this.stopProcess)
        process.on('SIGINT', this.stopProcess)

        // Prevent throw new Error from crashing the app
        // TODO: Get rid of this and send proper error message to ui
        process.on('uncaughtException', (err) => {
            logger.error('uncaughtException: ', err)
        })

        process.on('unhandledRejection', (err) => {
            logger.error('unhandledRejection: ', err)
        })

        const { flags } = await this.parse(Start)

        if (flags.PORT) process.env.PORT = flags.PORT
        if (flags.DEBUG) process.env.DEBUG = flags.DEBUG
        if (flags.NUMBER_OF_PROXIES) process.env.NUMBER_OF_PROXIES = flags.NUMBER_OF_PROXIES

        // Authorization
        if (flags.SBIR_GEN_USERNAME) process.env.SBIR_GEN_USERNAME = flags.SBIR_GEN_USERNAME
        if (flags.SBIR_GEN_PASSWORD) process.env.SBIR_GEN_PASSWORD = flags.SBIR_GEN_PASSWORD

        if (flags.SBIR_GEN_SECRETKEY_OVERWRITE) process.env.SBIR_GEN_SECRETKEY_OVERWRITE = flags.SBIR_GEN_SECRETKEY_OVERWRITE

        // Logs
        if (flags.LOG_PATH) process.env.LOG_PATH = flags.LOG_PATH
        if (flags.LOG_LEVEL) process.env.LOG_LEVEL = flags.LOG_LEVEL

        // Tool functions
        if (flags.TOOL_FUNCTION_BUILTIN_DEP) process.env.TOOL_FUNCTION_BUILTIN_DEP = flags.TOOL_FUNCTION_BUILTIN_DEP
        if (flags.TOOL_FUNCTION_EXTERNAL_DEP) process.env.TOOL_FUNCTION_EXTERNAL_DEP = flags.TOOL_FUNCTION_EXTERNAL_DEP

        // Database config
        if (flags.DATABASE_TYPE) process.env.DATABASE_TYPE = flags.DATABASE_TYPE
        if (flags.DATABASE_PATH) process.env.DATABASE_PATH = flags.DATABASE_PATH
        if (flags.DATABASE_PORT) process.env.DATABASE_PORT = flags.DATABASE_PORT
        if (flags.DATABASE_HOST) process.env.DATABASE_HOST = flags.DATABASE_HOST
        if (flags.DATABASE_NAME) process.env.DATABASE_NAME = flags.DATABASE_NAME
        if (flags.DATABASE_USER) process.env.DATABASE_USER = flags.DATABASE_USER
        if (flags.DATABASE_PASSWORD) process.env.DATABASE_PASSWORD = flags.DATABASE_PASSWORD


        await (async () => {
            try {
                logger.info('Starting SBIR_GEN...')
                await DataSource.init()
                await Server.start()
            } catch (error) {
                logger.error('There was an error starting SBIR_GEN...', error)
                processExitCode = EXIT_CODE.FAILED
                // @ts-ignore
                process.emit('SIGINT')
            }
        })()
    }
}
