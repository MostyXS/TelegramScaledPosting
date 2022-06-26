export {}

import { Context, Scenes } from 'telegraf'
import { Message } from 'telegraf/typings/core/types/typegram'
import { PostType } from '../utils/types.js'

declare module 'telegraf' {
    interface Context {
        replyHelp(
            this: Scenes.WizardContext,
            action: string,
            error
        ): Promise<Message.TextMessage>
        verifyPostType(this: Scenes.WizardContext, toVerify: string): Promise<PostType>
    }
}

Context.prototype.replyHelp = async function (this, action, err) {
    const helpMessage = `Unable to ${action}, check formatiing or ask programmer for help.`
    return await this.telegram.sendMessageToOwner(
        `${helpMessage}\n There is a problem somewhere, reporting error: \n ${err}`
    )
}

Context.prototype.verifyPostType = async function (this, toVerify: string): Promise<PostType> {
    const postType: PostType = PostType[toVerify.toUpperCase()]
    if(!postType) {
        const postList = Object.values(PostType).toStringList()
        await this.reply(`Wrong post type, available types: \n${postList}`)   
    }
    return postType
} 
