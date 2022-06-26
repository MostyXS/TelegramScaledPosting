import { PostType } from '../utils/types.js'
import {  readMainConfig, writeMainConfig, } from './main.js'

//Add New
export const getMatches = (postType: PostType) => readMainConfig().postChannels[postType].matches


export const addMatch = (postType: PostType, matchName, wordlist: string[]) => {
    const config = readMainConfig()
    config.postChannels[postType].matches[matchName] = wordlist
    writeMainConfig(config)
}
export const removeMatch = (postType: PostType, matchName) => {
    const config = readMainConfig()
    delete config.postChannels[postType].matches[matchName]
    writeMainConfig(config)
}

export const getMatchWords = (postType: PostType, matchName: string) => getMatches(postType)[matchName]

export const addMatchWords = (postType: PostType, matchName, wordlist: string[]) => {
    const config = readMainConfig()
    const oldMatches = config.postChannels[postType].matches[matchName]
    config.postChannels[postType].matches[matchName] = oldMatches.addArray(wordlist)
    writeMainConfig(config)
}

export const removeMatchWords = (postType: PostType, matchName, wordlist: string[]) => {
    const config = readMainConfig()
    const oldMatches = config.postChannels[postType].matches[matchName]
    config.postChannels[postType].matches[matchName] = oldMatches.removeArray(wordlist)
    writeMainConfig(config)
}
