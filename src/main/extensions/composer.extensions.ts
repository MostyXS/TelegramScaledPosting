export {}

import { Composer, Scenes } from 'telegraf'

declare module 'telegraf' {
    interface Composer<C extends Context> {
        inputCommand(
            this: Composer<Scenes.WizardContext>,
            command: string,
            requiredArgs: number,
            callback: (args: string[], ctx: Scenes.WizardContext) => any
        )
    }
}

Composer.prototype.inputCommand = function (
    this,
    command,
    requiredArgs,
    callback
) {
    this.command(command, (ctx) => {
        const args: string[] = ctx.message.text.toClearArray().slice(1)
        if (args.length < requiredArgs)
            return ctx.reply(
                'Недостаточно аргументов, прочтите описание команды'
            )
        callback(args, ctx)
    })
}
