import { DataSource } from 'typeorm'
import logger from '../utils/logger'

export const buildPostgresSchema = async (): Promise<void> => {
    const DATABASE_SCHEMA = process.env.DATABASE_SCHEMA || 'public'
    const DATABASE_NAME = process.env.DATABASE_NAME

    logger.info(`Validating schema ${DATABASE_SCHEMA} exists`)
    const tempDataSource = new DataSource({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || '5432'),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: DATABASE_NAME,
        ssl: process.env.DATABASE_SSL === 'true'
    })
    const queryRunner = tempDataSource.createQueryRunner()

    try {
        await tempDataSource.initialize()
        await queryRunner.connect()

        const schemaExists = await queryRunner.hasSchema(DATABASE_SCHEMA)
        if (schemaExists) {
            logger.info(`Schema ${DATABASE_SCHEMA} exists`)
        } else {
            logger.info(`Schema does not exist, creating ${DATABASE_SCHEMA} schema`)
            await queryRunner.createSchema(DATABASE_SCHEMA, true)
        }

        logger.info(`Validating ${DATABASE_SCHEMA} is in search path`)
        const searchPath = await queryRunner.query(`SHOW search_path;`)
        if (searchPath[0].search_path.includes(DATABASE_SCHEMA)) {
            logger.info(`Schema ${DATABASE_SCHEMA} already in search path: ${searchPath[0].search_path}`)
        } else {
            logger.info(`Schema ${DATABASE_SCHEMA} not in search path, adding`)
            const setSearchPathQuery = `ALTER DATABASE "${DATABASE_NAME}" SET search_path TO ${DATABASE_SCHEMA};`
            logger.info(`Setting search path with query: ${setSearchPathQuery}`)
            await queryRunner.query(setSearchPathQuery)
        }

        logger.info(`Ensuring uuid-ossp extention exist in ${DATABASE_SCHEMA}`)
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA ${DATABASE_SCHEMA};`)
    } catch (error) {
        logger.error(error)
    } finally {
        await queryRunner.release()
        await tempDataSource.destroy()
    }
}
