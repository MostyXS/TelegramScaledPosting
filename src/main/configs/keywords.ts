import { readMainConfig, writeMainConfig } from './main.js'

//Add New
export const getKeywordsSets = () => readMainConfig().keywordSets

export const addKeywordsSet = (setName: string, wordlist: string[]) => {
    const config = readMainConfig()
    config.keywordSets[setName] = wordlist
    writeMainConfig(config)
}
export const removeKeywordsSet = (setName: string) => {
    const config = readMainConfig()
    delete config.keywordSets[setName]
    writeMainConfig(config)
}

export const getKeywords = (setName: string) => getKeywordsSets()[setName]

export const addKeywords = (setName: string, wordlist: string[]) => {
    const config = readMainConfig()
    const oldSet = config.keywordSets[setName]
    config.keywordSets[setName] = oldSet.addArray(wordlist)
    writeMainConfig(config)
}

export const removeKeywords = (setName: string, wordlist: string[]) => {
    const config = readMainConfig()
    const oldSet = config.keywordSets[setName]
    config.keywordSets[setName] = oldSet.removeArray(wordlist)
    writeMainConfig(config)
}
