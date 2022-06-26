import { Context } from 'telegraf';
import { PostType } from '../utils/types.js';
Context.prototype.replyHelp = async function (action, err) {
    const helpMessage = `Unable to ${action}, check formatiing or ask programmer for help.`;
    return await this.telegram.sendMessageToOwner(`${helpMessage}\n There is a problem somewhere, reporting error: \n ${err}`);
};
Context.prototype.verifyPostType = async function (toVerify) {
    const postType = PostType[toVerify.toUpperCase()];
    if (!postType) {
        const postList = Object.values(PostType).toStringList();
        await this.reply(`Wrong post type, available types: \n${postList}`);
    }
    return postType;
};
