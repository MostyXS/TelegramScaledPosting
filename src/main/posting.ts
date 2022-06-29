import { Markup } from 'telegraf'
import { ParseMode } from 'telegraf/typings/core/types/typegram'
import { PostType } from './utils/types.js'
import { getCategories } from './configs/categories.js'
import { getKeywordsSets } from './configs/keywords.js'
import { getPostId } from './configs/post.js'
import { bot } from './index.js'
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types.js'

export const findKeywordSets = (text: string): string[] => {
    const keywordSets = Object.entries(getKeywordsSets())
    return keywordSets
        .map(([setName, keywords]) => {
            if (
                keywords.some((keyword) =>
                    text.toLowerCase().includes(keyword.toLowerCase())
                )
            )
                return setName
            return undefined
        })
        .filter((setName) => setName != undefined)
}

export const findChannelCategory = (
    postType: PostType,
    channel: string
): string => {
    for (const [categoryName, channels] of Object.entries(
        getCategories(postType)
    )) {
        if (channels.includes(channel)) return categoryName
    }
    return undefined
}

export const postTelegramMessage = async (
    postType: PostType,
    msgToSend: string,
    sourceButton?: {
        text: string
        url: string
    },
    parseMode?: ParseMode,
    removeAttachments: boolean = false
) => {
    const chatId = getPostId(postType)
    try {
        const options: ExtraReplyMessage = {
            disable_web_page_preview: removeAttachments,
            parse_mode: parseMode,
        }

        if (sourceButton)
            options.reply_markup = {
                inline_keyboard: [
                    [Markup.button.url(sourceButton.text, sourceButton.url)],
                ],
            }
        const message = await bot.telegram.sendMessage(chatId, msgToSend, {
            disable_web_page_preview: removeAttachments,
            parse_mode: parseMode,
        })

        return message
    } catch (e) {
        bot.telegram.sendMessageToOwner(
            `Unable to send or pin message in channel in ${postType}. Error: \n` +
                e
        )
    }
}

export const updatePostDescription = async (
    postType: PostType,
    desc: string
) => {
    const chatId = getPostId(postType)
    try {
        await bot.telegram.setChatDescription(chatId, desc)
    } catch (e) {
        console.log(e)
    }
}
