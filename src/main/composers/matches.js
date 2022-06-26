import { Composer } from 'telegraf';
import { addMatch, addMatchWords, getMatches, getMatchWords, removeMatch, removeMatchWords, } from '../configs/matches.js';
var Commands;
(function (Commands) {
    Commands["List"] = "matches_list";
    Commands["AddMatch"] = "matches_add";
    Commands["RemoveMatch"] = "matches_rm";
    Commands["ListMatchWords"] = "matches_list_words";
    Commands["AddMatchWords"] = "matches_add_words";
    Commands["RemoveMatchWords"] = "matches_rm_words";
})(Commands || (Commands = {}));
//Migrate matches to main module
export const MatchesCD = [
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
        description: 'Removes words from existing match. Args: postType, matchName, wordlist',
    },
];
export const matchesComposer = new Composer();
const isMatchExists = (postType, matchName) => Boolean(getMatches(postType)[matchName]);
const verifyMatchExists = async (ctx, postType, matchName) => {
    if (!isMatchExists(postType, matchName)) {
        await ctx.reply('Match does not exists');
        return false;
    }
    return true;
};
matchesComposer.inputCommand(Commands.List, 1, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    try {
        const matches = Object.keys(getMatches(postType)).toStringList();
        if (matches.trim().length === 0)
            return await ctx.reply('No matches on ' + postType);
        else
            return await ctx.reply(matches);
    }
    catch (e) {
        await ctx.replyHelp('retrieve match wordlist', e);
    }
});
matchesComposer.inputCommand(Commands.AddMatch, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const matchName = args[1];
    const wordlist = args.slice(2);
    if (isMatchExists(postType, matchName))
        return await ctx.reply('This match already exists');
    try {
        addMatch(postType, matchName, wordlist);
    }
    catch (e) {
        await ctx.replyHelp('add new match', e);
    }
    await ctx.reply('Succesfully added new match');
});
matchesComposer.inputCommand(Commands.RemoveMatch, 2, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const matchName = args[1];
    if (!(await verifyMatchExists(ctx, postType, matchName)))
        return;
    try {
        removeMatch(postType, matchName);
        await ctx.reply('Succesfully removed match ' + matchName);
    }
    catch (e) {
        await ctx.replyHelp('remove match', e);
    }
});
matchesComposer.inputCommand(Commands.ListMatchWords, 2, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const matchName = args[1];
    if (!(await verifyMatchExists(ctx, postType, matchName)))
        return;
    try {
        await ctx.reply(getMatchWords(postType, matchName).toStringList());
    }
    catch (e) {
        await ctx.replyHelp('retrieve match wordlist', e);
    }
});
matchesComposer.inputCommand(Commands.AddMatchWords, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const matchName = args[1];
    const wordlist = args.slice(2);
    if (!(await verifyMatchExists(ctx, postType, matchName)))
        return;
    try {
        addMatchWords(postType, matchName, wordlist);
    }
    catch (e) {
        await ctx.replyHelp('add words to match', e);
    }
    await ctx.reply('Successfully added words to match ' + matchName);
});
matchesComposer.inputCommand(Commands.RemoveMatchWords, 3, async (args, ctx) => {
    const postType = await ctx.verifyPostType(args[0]);
    if (!postType)
        return;
    const matchName = args[1];
    const wordlist = args.slice(2);
    if (!(await verifyMatchExists(ctx, postType, matchName)))
        return;
    try {
        removeMatchWords(postType, matchName, wordlist);
    }
    catch (e) {
        await ctx.replyHelp('remove words from match', e);
    }
    await ctx.reply('Successfully removed words from match ' + matchName);
});
