import {Context} from "grammy";
import {userStates} from "../utils/userStates";

export const startCommand = async (ctx: Context) => {
    const {chat} = ctx;
    if (chat) {
        userStates.set(chat.id, {action: null});
        await ctx.reply("Welcome! Up and running.");
    } else {
        await ctx.reply("This command only works in a chat.");
    }
};
