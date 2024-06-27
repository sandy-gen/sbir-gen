import path from 'path'
import fs from 'fs'
import {
    IComponentCredentials,
    ICredentialDataDecrypted,
    IDatabaseEntity,
} from '../Interface'

import { randomBytes } from 'crypto'
import { AES, enc } from 'crypto-js'



const REDACTED_CREDENTIAL_VALUE = '_BLANK_08070706_2444254'

export const databaseEntities: IDatabaseEntity = {
    // ChatFlow: ChatFlow,
}

/**
 * Returns the home folder path of the user if
 * none can be found it falls back to the current
 * working directory
 *
 */
export const getUserHome = (): string => {
    let variableName = 'HOME'
    if (process.platform === 'win32') {
        variableName = 'USERPROFILE'
    }

    if (process.env[variableName] === undefined) {
        // If for some reason the variable does not exist
        // fall back to current folder
        return process.cwd()
    }
    return process.env[variableName] as string
}

/**
 * Returns the path of node modules package
 * @param {string} packageName
 * @returns {string}
 */
export const getNodeModulesPackagePath = (packageName: string): string => {
    const checkPaths = [
        path.join(__dirname, '..', 'node_modules', packageName),
        path.join(__dirname, '..', '..', 'node_modules', packageName),
        path.join(__dirname, '..', '..', '..', 'node_modules', packageName),
        path.join(__dirname, '..', '..', '..', '..', 'node_modules', packageName),
        path.join(__dirname, '..', '..', '..', '..', '..', 'node_modules', packageName)
    ]
    for (const checkPath of checkPaths) {
        if (fs.existsSync(checkPath)) {
            return checkPath
        }
    }
    return ''
}
/**
 * Map MimeType to InputField
 * @param {string} mimeType
 * @returns {Promise<string>}
 */
export const mapMimeTypeToInputField = (mimeType: string) => {
    switch (mimeType) {
        case 'text/plain':
            return 'txtFile'
        case 'application/pdf':
            return 'pdfFile'
        case 'application/json':
            return 'jsonFile'
        case 'text/csv':
            return 'csvFile'
        case 'application/json-lines':
        case 'application/jsonl':
        case 'text/jsonl':
            return 'jsonlinesFile'
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return 'docxFile'
        case 'application/vnd.yaml':
        case 'application/x-yaml':
        case 'text/vnd.yaml':
        case 'text/x-yaml':
        case 'text/yaml':
            return 'yamlFile'
        default:
            return ''
    }
}

/**
 * Generate an encryption key
 * @returns {string}
 */
export const generateEncryptKey = (): string => {
    return randomBytes(24).toString('base64')
}

export const getEncryptionKeyPath = (): string => {
    return process.env.SECRETKEY_PATH ? path.join(process.env.SECRETKEY_PATH, 'encryption.key') : getEncryptionKeyFilePath()
}

const getEncryptionKeyFilePath = (): string => {
    const checkPaths = [
        path.join(__dirname, '..', '..', 'encryption.key'),
        path.join(__dirname, '..', '..', 'server', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', 'server', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', '..', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', '..', 'server', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', '..', '..', 'encryption.key'),
        path.join(__dirname, '..', '..', '..', '..', '..', 'server', 'encryption.key'),
        path.join(getUserHome(), '.sbir-gen', 'encryption.key')
    ]
    for (const checkPath of checkPaths) {
        if (fs.existsSync(checkPath)) {
            return checkPath
        }
    }
    return ''
}

/**
 * Returns the encryption key
 * @returns {Promise<string>}
 */
export const getEncryptionKey = async (): Promise<string> => {
    if (process.env.SBIRGEN_SECRETKEY_OVERWRITE !== undefined && process.env.SBIRGEN_SECRETKEY_OVERWRITE !== '') {
        return process.env.SBIRGEN_SECRETKEY_OVERWRITE
    }
    try {
        return await fs.promises.readFile(getEncryptionKeyPath(), 'utf8')
    } catch (error) {
        const encryptKey = generateEncryptKey()
        const defaultLocation = process.env.SECRETKEY_PATH
            ? path.join(process.env.SECRETKEY_PATH, 'encryption.key')
            : path.join(getUserHome(), '.sbir-gen', 'encryption.key')
        await fs.promises.writeFile(defaultLocation, encryptKey)
        return encryptKey
    }
}

/**
 * Encrypt credential data
 * @param {ICredentialDataDecrypted} plainDataObj
 * @returns {Promise<string>}
 */
export const encryptCredentialData = async (plainDataObj: ICredentialDataDecrypted): Promise<string> => {
    const encryptKey = await getEncryptionKey()
    return AES.encrypt(JSON.stringify(plainDataObj), encryptKey).toString()
}

/**
 * Decrypt credential data
 * @param {string} encryptedData
 * @param {string} componentCredentialName
 * @param {IComponentCredentials} componentCredentials
 * @returns {Promise<ICredentialDataDecrypted>}
 */
// export const decryptCredentialData = async (
//     encryptedData: string,
//     componentCredentialName?: string,
//     componentCredentials?: IComponentCredentials
// ): Promise<ICredentialDataDecrypted> => {
//     const encryptKey = await getEncryptionKey()
//     const decryptedData = AES.decrypt(encryptedData, encryptKey)
//     const decryptedDataStr = decryptedData.toString(enc.Utf8)
//     if (!decryptedDataStr) return {}
// }

/**
 * Get all values from a JSON object
 * @param {any} obj
 * @returns {any[]}
 */
export const getAllValuesFromJson = (obj: any): any[] => {
    const values: any[] = []

    function extractValues(data: any) {
        if (typeof data === 'object' && data !== null) {
            if (Array.isArray(data)) {
                for (const item of data) {
                    extractValues(item)
                }
            } else {
                for (const key in data) {
                    extractValues(data[key])
                }
            }
        } else {
            values.push(data)
        }
    }

    extractValues(obj)
    return values
}
