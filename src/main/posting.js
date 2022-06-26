import { Markup } from 'telegraf';
import { getCategories } from './configs/categories.js';
import { getMatches } from './configs/matches.js';
import { getPostId } from './configs/post.js';
import { bot } from './index.js';
const getMatchedTags = (postType, msgContent) => {
    const matches = Object.entries(getMatches(postType));
    return matches.map(([matchName, words]) => {
        if (words.some((word) => msgContent.includes(word)))
            return `#${matchName}`;
        return undefined;
    }).filter(tag => tag != undefined);
};
export const findChannelCategory = (postType, channel) => {
    for (const [categoryName, channels] of Object.entries(getCategories(postType))) {
        if (channels.includes(channel))
            return categoryName;
    }
    return undefined;
};
export const postTelegramMessage = async (postType, msgContent, sourceButton, parseMode, removeAttachments = false, addTags = true) => {
    let msgToSend = msgContent;
    const chatId = getPostId(postType);
    if (addTags) {
        const tags = getMatchedTags(postType, msgContent);
        if (tags.length > 0) {
            const tagsString = `\n\n${tags.toString().replaceAll(',', ' ').toUpperCase()}`;
            msgToSend = msgToSend.concat(tagsString);
        }
    }
    try {
        const message = await bot.telegram.sendMessage(chatId, msgToSend, {
            disable_web_page_preview: removeAttachments,
            parse_mode: parseMode,
            reply_markup: {
                inline_keyboard: [
                    [Markup.button.url(sourceButton.text, sourceButton.url)],
                ],
            },
        });
        return message;
    }
    catch (e) {
        bot.telegram.sendMessageToOwner(`Unable to send or pin message in channel in ${postType}. Error: \n` +
            e);
    }
};
export const updatePostDescription = async (postType, desc) => {
    const chatId = getPostId(postType);
    try {
        await bot.telegram.setChatDescription(chatId, desc);
    }
    catch (e) {
        console.log(e);
    }
};
