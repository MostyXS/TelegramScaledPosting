import { Composer, Scenes } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { PostType } from '../utils/types.js'
import {
    addMatch,
    addMatchWords,
    getMatches,
    getMatchWords,
    removeMatch,
    removeMatchWords,
} from '../configs/matches.js'

enum Commands {
    List = 'matches_list',
    AddMatch = 'matches_add',
    RemoveMatch = 'matches_rm',
    ListMatchWords = 'matches_list_words',
    AddMatchWords = 'matches_add_words',
    RemoveMatchWords = 'matches_rm_words',
}
//Migrate matches to main module
export const MatchesCD: BotCommand[] = [
    {
        command: Commands.List,
        description: 'Lists all matches. Args: postType',
    },
    {
        command: Commands.AddMatch,
        description: 'Adds new match pair. Args: postType, matchName, wordlist',
    },
    {
        command: Commands.RemoveMatch,
        description: 'Removes match. Args: postType, matchName',
    },
    {
        command: Commands.ListMatchWords,
        description: 'List wordlist on specific match. Args: postType, matchName'
    },
    {
        command: Commands.AddMatchWords,
        description: 'Adds words to existing match. Args: postType, matchName, wordlist',
    },
    {
        command: Commands.RemoveMatchWords,
        description:
            'Removes words from existing match. Args: postType, matchName, wordlist',
    },
]

export const matchesComposer = new Composer<Scenes.WizardContext>()

const isMatchExists = (postType: PostType, matchName: string) =>
    Boolean(getMatches(postType)[matchName])

const verifyMatchExists = async (
    ctx: Scenes.WizardContext,
    postType: PostType,
    matchName: string
): Promise<boolean> => {
    if (!isMatchExists(postType, matchName)) {
        await ctx.reply('Match does not exists')
        return false
    }
    return true
}

matchesComposer.inputCommand(Commands.List, 1, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0])
    if (!postType) return
    try {
        const matches = Object.keys(getMatches(postType)).toStringList()
        if(matches.trim().length === 0)
            return await ctx.reply('No matches on '+ postType)
        else
            return await ctx.reply(matches)
    } catch (e) {
        await ctx.replyHelp('retrieve match wordlist', e)
    }
})

matchesComposer.inputCommand(Commands.AddMatch, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0])
    if (!postType) return
    const matchName = args[1]
    const wordlist = args.slice(2)
    if (isMatchExists(postType, matchName))
        return await ctx.reply('This match already exists')
    try {
        addMatch(postType, matchName, wordlist)
    } catch (e) {
        await ctx.replyHelp('add new match', e)
    }
    await ctx.reply('Succesfully added new match')
})

matchesComposer.inputCommand(Commands.RemoveMatch, 2, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0])
    if (!postType) return
    const matchName = args[1]
    if (!(await verifyMatchExists(ctx, postType, matchName))) return
    try {
        removeMatch(postType, matchName)
        await ctx.reply('Succesfully removed match ' + matchName)
    } catch (e) {
        await ctx.replyHelp('remove match', e)
    }
})

matchesComposer.inputCommand(Commands.ListMatchWords, 2, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0])
    if (!postType) return
    const matchName = args[1]
    if (!(await verifyMatchExists(ctx, postType, matchName))) return

    try {
        await ctx.reply(getMatchWords(postType, matchName).toStringList())
    } catch (e) {
        await ctx.replyHelp('retrieve match wordlist', e)
    }
})

matchesComposer.inputCommand(Commands.AddMatchWords, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0])
    if (!postType) return
    const matchName = args[1]
    const wordlist = args.slice(2)
    if (!(await verifyMatchExists(ctx, postType, matchName))) return
    try {
        addMatchWords(postType, matchName, wordlist)
    } catch (e) {
        await ctx.replyHelp('add words to match', e)
    }
    await ctx.reply('Successfully added words to match ' + matchName)
})

matchesComposer.inputCommand(
    Commands.RemoveMatchWords,
    3,
    async (args, ctx) => {
        const postType = await ctx.verifyPostType(args[0])
        if (!postType) return
        const matchName = args[1]
        const wordlist = args.slice(2)
        if (!(await verifyMatchExists(ctx, postType, matchName))) return
        try {
            removeMatchWords(postType, matchName, wordlist)
        } catch (e) {
            await ctx.replyHelp('remove words from match', e)
        }
        await ctx.reply('Successfully removed words from match ' + matchName)
    }
)
