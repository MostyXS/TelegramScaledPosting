import { Composer } from 'telegraf';
import { addCategory, addCategoryChannels, getCategories, getCategoryChannels, removeCategory, removeCategoryChannels } from '../configs/categories.js';
var Commands;
(function (Commands) {
    Commands["ListCategories"] = "categories_list";
    Commands["AddCategory"] = "categories_add";
    Commands["RemoveCategory"] = "categories_rm";
    Commands["ListChannels"] = "categories_list_channels";
    Commands["AddChannels"] = "categories_add_channels";
    Commands["RemoveChannels"] = "categories_rm_channels";
})(Commands || (Commands = {}));
export const CategoriesCD = [
    {
        command: Commands.ListCategories,
        description: 'Lists all categories in post channel. Args: post_type',
    },
    {
        command: Commands.AddCategory,
        description: 'Adds new category to post_type. Args: post_type, category_name, id_list',
    },
    {
        command: Commands.RemoveCategory,
        description: 'Removes category from post_type. Args: post_type, category_name',
    },
    {
        command: Commands.ListChannels,
        description: 'List channels on category. Args: post_type, category_name'
    },
    {
        command: Commands.AddChannels,
        description: 'Adds channels to category. Args: post_type, category_name, channels',
    },
    {
        command: Commands.RemoveChannels,
        description: 'Removes channels from category. Args: post_type, category_name, channels',
    },
];
const getCategoryNames = (postType) => Object.keys(getCategories(postType));
const verifyCateogryExists = async (ctx, postType, categoryName) => {
    if (categoryName in getCategoryNames(postType)) {
        await ctx.reply('Category does not exist');
        return false;
    }
    return true;
};
export const categoriesComposer = new Composer();
console.log(categoriesComposer.inputCommand);
//#region CATEGORY
categoriesComposer.inputCommand(Commands.ListCategories, 1, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    try {
        await ctx.reply(getCategoryNames(postType).toStringList());
    }
    catch (e) {
        await ctx.replyHelp('list categories', e);
    }
});
categoriesComposer.inputCommand(Commands.AddCategory, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const categoryName = args[1];
    if (categoryName in getCategoryNames(postType))
        return await ctx.reply('This category is already exists');
    const channels = args.slice(2);
    try {
        addCategory(postType, categoryName, channels);
    }
    catch (e) {
        await ctx.replyHelp('add cateogry', e);
    }
    await ctx.reply('Successfully added category ') + categoryName;
});
categoriesComposer.inputCommand(Commands.RemoveCategory, 2, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const categoryName = args[1];
    if (!(await verifyCateogryExists(ctx, postType, categoryName)))
        return;
    try {
        removeCategory(postType, categoryName);
    }
    catch (e) {
        await ctx.replyHelp('remove category', e);
    }
    await ctx.reply('Successfully removed category ' + categoryName);
});
//#endregion
//#region 
categoriesComposer.inputCommand(Commands.ListChannels, 2, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const categoryName = args[1];
    if (!(await verifyCateogryExists(ctx, postType, categoryName)))
        return;
    try {
        await ctx.reply(getCategoryChannels(postType, categoryName).toStringList());
    }
    catch (e) {
        await ctx.replyHelp('list channels', e);
    }
});
categoriesComposer.inputCommand(Commands.AddChannels, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const categoryName = args[1];
    if (!(await verifyCateogryExists(ctx, postType, categoryName)))
        return;
    const channels = args.slice(2);
    try {
        addCategoryChannels(postType, categoryName, channels);
    }
    catch (e) {
        await ctx.replyHelp('add channels', e);
    }
    await ctx.reply('Successfully added channels to category ' + categoryName);
});
categoriesComposer.inputCommand(Commands.RemoveChannels, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const categoryName = args[1];
    if (!(await verifyCateogryExists(ctx, postType, categoryName)))
        return;
    const channels = args.slice(2);
    try {
        removeCategoryChannels(postType, categoryName, channels);
    }
    catch (e) {
        await ctx.replyHelp('remove channels', e);
    }
    await ctx.reply('Successfully remove channels from category ' + categoryName);
});
