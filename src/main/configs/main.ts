import { readFileSync, writeFileSync } from 'fs'
import { PostType } from '../utils/types'

const CONFIG_PATH = './config/main.json'

interface MainJSON {
    ownerId: number
    allowedUsers: number[]
    
    postChannels: {[postType in PostType]: 
        {
            matches: {[tag: string]: string[]}
            postId: string
            categories: {[channelCategory: string]: string[] //ids or names}
            } 
        }
    }
}

export const readMainConfig = (): MainJSON =>
    JSON.parse(readFileSync(CONFIG_PATH).toString())

export const writeMainConfig = (newSettings: MainJSON) =>
    writeFileSync(CONFIG_PATH, JSON.stringify(newSettings))
