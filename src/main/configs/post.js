import { readMainConfig, writeMainConfig } from './main.js';
export const getPostChannels = () => readMainConfig().postChannels;
export const isInitialized = (type) => {
    const config = readMainConfig();
    if (!config.postChannels[type])
        return false;
    return true;
};
export const initialize = (type) => {
    const config = readMainConfig();
    config.postChannels[type] = {
        postId: '',
        categories: {},
        matches: {}
    };
    writeMainConfig(config);
};
export const getPostId = (postType) => getPostChannels()[postType].postId;
export const setID = (postType, id) => {
    const config = readMainConfig();
    config.postChannels[postType].postId = id;
    writeMainConfig(config);
};
