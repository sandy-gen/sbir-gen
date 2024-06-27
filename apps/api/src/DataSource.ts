import 'reflect-metadata'
import { DataSource } from 'typeorm'
import mysqlDataSource from './database/MySqlDataSource'
import postgresDataSource from './database/PostgresDataSource'
import sqliteDataSource from './database/SqliteDataSource'
import { buildPostgresSchema } from './database/buildPostgresSchema'

let appDataSource: DataSource

export const init = async (): Promise<void> => {
    switch (process.env.DATABASE_TYPE) {
        case 'mysql': {
            appDataSource = mysqlDataSource
            break
        }
        case 'postgres': {
            await buildPostgresSchema()
            appDataSource = postgresDataSource
            break
        }
        case 'sqlite':
        default: {
            appDataSource = sqliteDataSource
            break
        }
    }
}

export function getDataSource(): DataSource {
    if (appDataSource === undefined) {
        init()
    }
    return appDataSource
}
