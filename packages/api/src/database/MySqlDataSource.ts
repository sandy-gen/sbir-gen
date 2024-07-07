import { DataSource } from 'typeorm'
import { entities } from './entities'
// import { mysqlMigrations } from './migrations/mysql'

const mysqlDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    charset: 'utf8mb4',
    migrationsRun: true,
    entities: Object.values(entities),
    // migrations: mysqlMigrations
})
export default mysqlDataSource
