import { PostType } from '../utils/types.js'
import { readMainConfig, writeMainConfig } from './main.js'

export const getPostChannels = () => readMainConfig().postChannels

export const isPostInitialized = (type: PostType): boolean => {
    const config = readMainConfig()
    if(!config.postChannels[type]) return false
    return true
}
export const initializePost = (type: PostType) => {
    const config = readMainConfig()
    config.postChannels[type] = {
        postId: '',
        categories: {},
    }
    writeMainConfig(config)
}

export const getPostId = (postType: PostType) => getPostChannels()[postType].postId

export const setPostID = (postType: PostType, id) => {
    const config = readMainConfig()
    config.postChannels[postType].postId = id
    writeMainConfig(config)
}

