import { DataSource } from 'typeorm'
import { entities } from './entities'
// import { sqliteMigrations } from './migrations/sqlite'
import { getUserHome } from '../utils'
import path from 'path'

const sqlitePath = process.env.DATABASE_PATH ?? path.join(getUserHome(), '.sbir-gen')
const sqliteDataSource = new DataSource({
    type: 'sqlite',
    database: path.resolve(sqlitePath, 'database.sqlite'),
    entities: Object.values(entities),
    // migrations: sqliteMigrations
})
export default sqliteDataSource
