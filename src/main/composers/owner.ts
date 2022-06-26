import { Composer, Scenes } from 'telegraf'
import { BotCommand } from 'telegraf/typings/core/types/typegram'
import {
    addAllowedUsers,
    getAllowedUsers,
    getOwnerId,
    removeAllowedUsers,
} from '../configs/owner.js'

export const ownerComposer = new Composer<Scenes.WizardContext>()

enum Commands {
    ListAllowedUsers = 'owner_list_allowed_users',
    AddAllowedUser = 'owner_add_allowed_user',
    RemoveAllowedUser = 'owner_rm_allowed_user',
}

export const OwnerCD: BotCommand[] = [
    {
        command: Commands.ListAllowedUsers,
        description: 'Lists all allowed users. No args',
    },
    {
        command: Commands.AddAllowedUser,
        description: 'Adds allowed users. Args: User IDs',
    },
    {
        command: Commands.RemoveAllowedUser,
        description: 'Removes allowed users. Args: User IDs',
    },
]

const verifyOwner = async (ctx: Scenes.WizardContext) => {
    if (ctx.from.id !== getOwnerId()) {
        await ctx.reply('You are not the owner')
        return false
    }
    return true
}

ownerComposer.command(Commands.ListAllowedUsers, async (ctx) => {
    if (!(await verifyOwner(ctx))) return
    try {
        await ctx.reply(getAllowedUsers().toStringList())
    } catch (e) {
        await ctx.replyHelp('retrieve ID list', e)
    }
})

ownerComposer.inputCommand(Commands.AddAllowedUser, 1, async (args, ctx) => {
    if (!(await verifyOwner(ctx))) return
    const idList = args
    try {
        addAllowedUsers(idList.map(Number).filter((id) => id))
        await ctx.reply('Successfully added selected IDs')
    } catch (e) {
        await ctx.replyHelp('add IDs', e)
    }
})

ownerComposer.inputCommand(Commands.RemoveAllowedUser, 1, async (args, ctx) => {
    if (!(await verifyOwner(ctx))) return
    const idList: any[] = args
    try {
        removeAllowedUsers(idList.filter((id) => Number(id) !== NaN))
        await ctx.reply('Successfully removed selected IDs')
    } catch (e) {
        await ctx.replyHelp('remove IDs', e)
    }
})
