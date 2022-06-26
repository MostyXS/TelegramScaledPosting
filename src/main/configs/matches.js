import { readMainConfig, writeMainConfig, } from './main.js';
//Add New
export const getMatches = (postType) => readMainConfig().postChannels[postType].matches;
export const addMatch = (postType, matchName, wordlist) => {
    const config = readMainConfig();
    config.postChannels[postType].matches[matchName] = wordlist;
    writeMainConfig(config);
};
export const removeMatch = (postType, matchName) => {
    const config = readMainConfig();
    delete config.postChannels[postType].matches[matchName];
    writeMainConfig(config);
};
export const getMatchWords = (postType, matchName) => getMatches(postType)[matchName];
export const addMatchWords = (postType, matchName, wordlist) => {
    const config = readMainConfig();
    const oldMatches = config.postChannels[postType].matches[matchName];
    config.postChannels[postType].matches[matchName] = oldMatches.addArray(wordlist);
    writeMainConfig(config);
};
export const removeMatchWords = (postType, matchName, wordlist) => {
    const config = readMainConfig();
    const oldMatches = config.postChannels[postType].matches[matchName];
    config.postChannels[postType].matches[matchName] = oldMatches.removeArray(wordlist);
    writeMainConfig(config);
};
