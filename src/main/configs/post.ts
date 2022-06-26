import { PostType } from '../utils/types.js'
import { readMainConfig, writeMainConfig } from './main.js'

export const getPostChannels = () => readMainConfig().postChannels

export const isInitialized = (type: PostType): boolean => {
    const config = readMainConfig()
    if(!config.postChannels[type]) return false
    return true
}
export const initialize = (type: PostType) => {
    const config = readMainConfig()
    config.postChannels[type] = {
        postId: '',
        categories: {},
        matches: {}
    }
    writeMainConfig(config)
}

export const getPostId = (postType: PostType) => getPostChannels()[postType].postId

export const setID = (postType: PostType, id) => {
    const config = readMainConfig()
    config.postChannels[postType].postId = id
    writeMainConfig(config)
}

