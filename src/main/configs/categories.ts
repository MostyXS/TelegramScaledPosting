import { PostType } from '../utils/types.js'
import { readMainConfig, writeMainConfig } from './main.js'

export const getCategories = (type: PostType) => readMainConfig().postChannels[type].categories

export const addCategory = (type: PostType, categoryName: string, channelList: string[]) => {
    const config = readMainConfig()
    config.postChannels[type].categories[categoryName] = channelList
    writeMainConfig(config)
}

export const removeCategory = (type: PostType, categoryName: string) => {
    const config = readMainConfig()
    delete config.postChannels[type].categories[categoryName]
    writeMainConfig(config)
}

export const getCategoryChannels = (type: PostType, categoryName: string) => getCategories(type)[categoryName]

export const addCategoryChannels = (type: PostType, categoryName: string, channelList: string[]) => {
    const config = readMainConfig()
    let oldChannels = config.postChannels[type].categories[categoryName]
    config.postChannels[type].categories[categoryName] = oldChannels.addArray(channelList)
    writeMainConfig(config)
}

export const removeCategoryChannels = (type: PostType, categoryName: string, channelList: string[]) => {
    const config = readMainConfig()
    let oldChannels = config.postChannels[type].categories[categoryName]
    config.postChannels[type].categories[categoryName] = oldChannels.removeArray(channelList)
    writeMainConfig(config)
}