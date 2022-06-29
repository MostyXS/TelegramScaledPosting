import { Composer, Scenes } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import { PostType } from '../utils/types.js'
import {
    addCategory,
    addCategoryChannels,
    getCategories,
    getCategoryChannels,
    removeCategory,
    removeCategoryChannels,
} from '../configs/categories.js'

enum Commands {
    ListCategories = 'categories_list',
    AddCategory = 'categories_add',
    RemoveCategory = 'categories_rm',
    ListChannels = 'categories_list_channels',
    AddChannels = 'categories_add_channels',
    RemoveChannels = 'categories_rm_channels',
}

export const CategoriesCD: BotCommand[] = [
    {
        command: Commands.ListCategories,
        description: 'Lists all categories in post channel. Args: post_type',
    },
    {
        command: Commands.AddCategory,
        description:
            'Adds new category to post_type. Args: post_type, category_name, id_list',
    },
    {
        command: Commands.RemoveCategory,
        description:
            'Removes category from post_type. Args: post_type, category_name',
    },
    {
        command: Commands.ListChannels,
        description:
            'List channels on category. Args: post_type, category_name',
    },
    {
        command: Commands.AddChannels,
        description:
            'Adds channels to category. Args: post_type, category_name, channels',
    },
    {
        command: Commands.RemoveChannels,
        description:
            'Removes channels from category. Args: post_type, category_name, channels',
    },
]
const getCategoryNames = (postType: PostType) =>
    Object.keys(getCategories(postType))

const verifyCateogryExists = async (
    ctx: Scenes.WizardContext,
    postType: PostType,
    categoryName: string
): Promise<boolean> => {
    if (categoryName in getCategoryNames(postType)) {
        await ctx.reply('Category does not exist')
        return false
    }
    return true
}

export const categoriesComposer = new Composer<Scenes.WizardContext>()
//#region CATEGORY
categoriesComposer.inputCommand(
    Commands.ListCategories,
    1,
    async (args, ctx) => {
        const postType = await ctx.verifyPostType(args[0])
        if (!postType) return
        try {
            await ctx.reply(getCategoryNames(postType).toStringList())
        } catch (e) {
            await ctx.replyHelp('list categories', e)
        }
    }
)

categoriesComposer.inputCommand(Commands.AddCategory, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0])
    if (!postType) return
    const categoryName = args[1]
    if (categoryName in getCategoryNames(postType))
        return await ctx.reply('This category is already exists')
    const channels = args.slice(2)
    try {
        addCategory(postType, categoryName, channels)
    } catch (e) {
        await ctx.replyHelp('add cateogry', e)
    }
    ;(await ctx.reply('Successfully added category ')) + categoryName
})

categoriesComposer.inputCommand(
    Commands.RemoveCategory,
    2,
    async (args, ctx) => {
        const postType = await ctx.verifyPostType(args[0])
        if (!postType) return
        const categoryName = args[1]
        if (!(await verifyCateogryExists(ctx, postType, categoryName))) return
        try {
            removeCategory(postType, categoryName)
        } catch (e) {
            await ctx.replyHelp('remove category', e)
        }
        await ctx.reply('Successfully removed category ' + categoryName)
    }
)
//#endregion

//#region

categoriesComposer.inputCommand(Commands.ListChannels, 2, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0])
    if (!postType) return
    const categoryName = args[1]
    if (!(await verifyCateogryExists(ctx, postType, categoryName))) return
    try {
        await ctx.reply(
            getCategoryChannels(postType, categoryName).toStringList()
        )
    } catch (e) {
        await ctx.replyHelp('list channels', e)
    }
})

categoriesComposer.inputCommand(Commands.AddChannels, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0])
    if (!postType) return
    const categoryName = args[1]
    if (!(await verifyCateogryExists(ctx, postType, categoryName))) return
    const channels = args.slice(2)
    try {
        addCategoryChannels(postType, categoryName, channels)
    } catch (e) {
        await ctx.replyHelp('add channels', e)
    }
    await ctx.reply('Successfully added channels to category ' + categoryName)
})

categoriesComposer.inputCommand(
    Commands.RemoveChannels,
    3,
    async (args, ctx) => {
        const postType = await ctx.verifyPostType(args[0])
        if (!postType) return
        const categoryName = args[1]
        if (!(await verifyCateogryExists(ctx, postType, categoryName))) return
        const channels = args.slice(2)
        try {
            removeCategoryChannels(postType, categoryName, channels)
        } catch (e) {
            await ctx.replyHelp('remove channels', e)
        }
        await ctx.reply(
            'Successfully remove channels from category ' + categoryName
        )
    }
)
