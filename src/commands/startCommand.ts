import {Context} from "grammy";
import {userStates} from "../utils/userStates";

export const startCommand = (ctx: Context) => {
    const {chat} = ctx;
    if (chat) {
        userStates.set(chat.id, {action: null});
        ctx.reply("Welcome! Up and running.");
    } else {
        ctx.reply("This command only works in a chat.");
    }
};
