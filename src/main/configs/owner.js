import { readMainConfig, writeMainConfig } from './main.js';
export const getOwnerId = () => readMainConfig().ownerId;
export const getAllowedUsers = () => readMainConfig().allowedUsers;
export const isUserAllowed = (idToCheck) => idToCheck === getOwnerId() || idToCheck in getAllowedUsers();
export const addAllowedUsers = (userlist) => {
    let config = readMainConfig();
    const oldUsers = config.allowedUsers;
    config.allowedUsers = oldUsers.addArray(userlist);
    writeMainConfig(config);
};
export const removeAllowedUsers = (userlist) => {
    let config = readMainConfig();
    const oldUsers = config.allowedUsers;
    config.allowedUsers = oldUsers.removeArray(userlist);
    writeMainConfig(config);
};
