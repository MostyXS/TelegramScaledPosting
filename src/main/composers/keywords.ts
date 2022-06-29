import { Composer, Scenes } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import {
    addKeywordsSet,
    addKeywords,
    getKeywordsSets,
    getKeywords,
    removeKeywordsSet,
    removeKeywords,
} from '../configs/keywords.js'

enum Commands {
    ListSet = 'keywords_set_list',
    AddSet = 'keywords_set_add',
    RemoveSet = 'keywords_set_rm',
    ListKeywords = 'keywords_list',
    AddKeywords = 'keywords_add',
    RemoveKeywords = 'keywords_rm',
}

export const KeywordsCD: BotCommand[] = [
    {
        command: Commands.ListSet,
        description: 'Lists keywords sets.',
    },
    {
        command: Commands.AddSet,
        description: 'Adds keywords set. Args: set_name, wordlist',
    },
    {
        command: Commands.RemoveSet,
        description: 'Removes keywords set. Args: set_name',
    },
    {
        command: Commands.ListKeywords,
        description: 'List keywords on existing set. Args: set_name',
    },
    {
        command: Commands.AddKeywords,
        description: 'Adds keywords to existing set. Args: set_name, wordlist',
    },
    {
        command: Commands.RemoveKeywords,
        description:
            'Removes keywords from existing set. Args: set_name, wordlist',
    },
]

export const keywordsComposer = new Composer<Scenes.WizardContext>()

const isSetExist = (setName: string) => Boolean(getKeywordsSets()[setName])

const verifySetExist = async (
    ctx: Scenes.WizardContext,
    setName: string
): Promise<boolean> => {
    if (!isSetExist(setName)) {
        await ctx.reply('Set does not exist')
        return false
    }
    return true
}

keywordsComposer.command(Commands.ListSet, async (ctx) => {
    try {
        const sets = Object.keys(getKeywordsSets()).toStringList()
        if (sets.trim().length === 0)
            return await ctx.reply('Set list is empty')
        else {
            return await ctx.reply(sets)
        }
    } catch (e) {
        return await ctx.replyHelp('retrieve sets list', e)
    }
})

keywordsComposer.inputCommand(Commands.AddSet, 2, async (args, ctx) => {
    const setName = args[0]
    const wordlist = args.slice(1)
    if (isSetExist(setName)) return await ctx.reply('This set already exist')
    try {
        addKeywordsSet(setName, wordlist)
    } catch (e) {
        return await ctx.replyHelp('add new set', e)
    }
    await ctx.reply('Succesfully added new set')
})

keywordsComposer.inputCommand(Commands.RemoveSet, 1, async (args, ctx) => {
    const setName = args[0]
    if (!(await verifySetExist(ctx, setName))) return
    try {
        removeKeywordsSet(setName)
        await ctx.reply('Succesfully removed set ' + setName)
    } catch (e) {
        return await ctx.replyHelp('remove set', e)
    }
})

keywordsComposer.inputCommand(Commands.ListKeywords, 1, async (args, ctx) => {
    const setName = args[0]
    if (!(await verifySetExist(ctx, setName))) return

    try {
        await ctx.reply(getKeywords(setName).toStringList())
    } catch (e) {
        return await ctx.replyHelp('retrieve set wordlist', e)
    }
})

keywordsComposer.inputCommand(Commands.AddKeywords, 2, async (args, ctx) => {
    const setName = args[0]
    const wordlist = args.slice(1)
    if (!(await verifySetExist(ctx, setName))) return
    try {
        addKeywords(setName, wordlist)
    } catch (e) {
        return await ctx.replyHelp('add words to set', e)
    }
    await ctx.reply('Successfully added words to set ' + setName)
})

keywordsComposer.inputCommand(Commands.RemoveKeywords, 2, async (args, ctx) => {
    const setName = args[0]
    const wordlist = args.slice(1)
    if (!(await verifySetExist(ctx, setName))) return
    try {
        removeKeywords(setName, wordlist)
    } catch (e) {
        return await ctx.replyHelp('remove words from set', e)
    }
    await ctx.reply('Successfully removed words from set ' + setName)
})
