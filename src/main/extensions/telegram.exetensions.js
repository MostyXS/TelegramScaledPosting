import { Telegram } from 'telegraf';
import { getOwnerId } from '../configs/owner.js';
Telegram.prototype.sendMessageToOwner = async function (content) {
    return await this.sendMessage(getOwnerId(), content);
};
