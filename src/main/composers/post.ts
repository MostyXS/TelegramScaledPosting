import { Composer, Scenes } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { getCategoryChannels } from '../configs/categories.js'
import * as postConfig from '../configs/post.js'

enum Commands {
    List = 'post_channels_list',
    Set = 'post_channels_set',
}

export const PostCD: BotCommand[] = [
    {
        command: Commands.List,
        description: 'Lists all post channels. No args',
    },
    {
        command: Commands.Set,
        description: 'Sets a post channel. Args: channel name, channel ID',
    },
]

export const postComposer = new Composer<Scenes.WizardContext>()

postComposer.command(Commands.List, async (ctx) => {
    try {
        await ctx.reply(
            Object.entries(postConfig.getPostChannels())
                .map(([key, value]) => `${key}: ${value.postId}`)
                .toStringList()
        )
    } catch (e) {
        await ctx.replyHelp('retrieve post channels', e)
    }
})

postComposer.inputCommand(Commands.Set, 2, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0])
    if(!postType) return
    const channelId = args[1]
    if (!postType) {
        return await ctx.reply(
            'There is no such post type, ask developer for more information'
        )
    }
    try {
        await ctx.telegram.sendMessage(
            channelId,
            'This channel will be set as post channel with name ' + postType
        )
    } catch (e) {
        return await ctx.reply(
            'I have no access to this channel or channel with this ID does not exist, please try another ID'
        )
    }

    try {
        if(postConfig.isInitialized(postType)) postConfig.initialize(postType)

        postConfig.setID(postType, channelId)
        return await ctx.reply(
            `Channel with id ${channelId} successfully set as ${postType} post channel`
        )
    } catch (e) {
        await ctx.replyHelp('set post channel', e)
    }
})
