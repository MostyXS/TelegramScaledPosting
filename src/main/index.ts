import { Telegraf, session, Telegram, Context, Scenes } from 'telegraf'
import { MainCD, mainComposer } from './staged.js'
import { isUserAllowed, getOwnerId } from './configs/owner.js'

//Connection to client
export const bot = new Telegraf<Scenes.WizardContext>(
    process.env.TELEGRAM_API_TOKEN
)

bot.use(session())
bot.use((ctx, next) => {
    if (!isUserAllowed(ctx.from.id))
        return ctx.reply('You are not allowed to use this bot')
    next()
})
bot.use(mainComposer.middleware())

bot.start(async (ctx) => {
    await ctx.telegram.setMyCommands(MainCD)
    await ctx.reply('You have successfully registered commands')
    await ctx.reply('Statistics formatting is: #tag: number of mentions')
})

bot.launch().then(() => {
    console.log('Connected to telegram api')
})
