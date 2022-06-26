export {}

import { Telegram } from 'telegraf'
import { Message } from 'telegraf/typings/core/types/typegram'
import { getOwnerId } from '../configs/owner.js'

declare module 'telegraf' {
    interface Telegram {
        sendMessageToOwner(
            this: Telegram,
            content: string
        ): Promise<Message.TextMessage>
    }
}

Telegram.prototype.sendMessageToOwner = async function (this, content) {
    return await this.sendMessage(getOwnerId(), content)
}
