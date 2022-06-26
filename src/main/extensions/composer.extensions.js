import { Composer } from 'telegraf';
Composer.prototype.inputCommand = function (command, requiredArgs, callback) {
    this.command(command, (ctx) => {
        const args = ctx.message.text.toClearArray().slice(1);
        if (args.length < requiredArgs)
            return ctx.reply('Недостаточно аргументов, прочтите описание команды');
        callback(args, ctx);
    });
};
