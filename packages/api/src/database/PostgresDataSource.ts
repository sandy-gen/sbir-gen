import { DataSource } from 'typeorm'
import { entities } from './entities'
import { postgresMigrations } from './migrations/postgres'


const postgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    schema: process.env.DATABASE_SCHEMA,
    synchronize: true,
    entities: entities,
    migrations: postgresMigrations,
    migrationsRun: false,
    poolSize: 10,
    logging: ['error', 'warn', 'info', 'schema', 'migration'],
    ssl: process.env.DATABASE_SSL === 'true'
})
export default postgresDataSource
