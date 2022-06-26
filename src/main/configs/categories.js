import { readMainConfig, writeMainConfig } from './main.js';
export const getCategories = (type) => readMainConfig().postChannels[type].categories;
export const addCategory = (type, categoryName, channelList) => {
    const config = readMainConfig();
    config.postChannels[type].categories[categoryName] = channelList;
    writeMainConfig(config);
};
export const removeCategory = (type, categoryName) => {
    const config = readMainConfig();
    delete config.postChannels[type].categories[categoryName];
    writeMainConfig(config);
};
export const getCategoryChannels = (type, categoryName) => getCategories(type)[categoryName];
export const addCategoryChannels = (type, categoryName, channelList) => {
    const config = readMainConfig();
    let oldChannels = config.postChannels[type].categories[categoryName];
    config.postChannels[type].categories[categoryName] = oldChannels.addArray(channelList);
    writeMainConfig(config);
};
export const removeCategoryChannels = (type, categoryName, channelList) => {
    const config = readMainConfig();
    let oldChannels = config.postChannels[type].categories[categoryName];
    config.postChannels[type].categories[categoryName] = oldChannels.removeArray(channelList);
    writeMainConfig(config);
};
