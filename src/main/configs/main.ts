import { readFileSync, writeFileSync } from 'fs'
import { PostType } from '../utils/types'

const CONFIG_PATH = './config/main.json'

interface MainJSON {
    ownerId: number
    allowedUsers: number[]
    
    keywordSets: {[setName: string]: string[]}
    postChannels: {[postType in PostType]: 
        {
            postId: string
            categories: {[categoryName: string]: string[] //ids or names
            } 
        }
    }
}

export const readMainConfig = (): MainJSON =>
    JSON.parse(readFileSync(CONFIG_PATH).toString())

export const writeMainConfig = (newSettings: MainJSON) =>
    writeFileSync(CONFIG_PATH, JSON.stringify(newSettings))
