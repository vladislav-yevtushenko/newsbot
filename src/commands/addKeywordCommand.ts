import {Context} from "grammy";
import {userStates} from "../utils/userStates";
import {AWAITING_KEYWORDS_STATE} from "./Constants";

const setUserStateToAwaitingKeywords = (chatId: number) => {
    userStates.set(chatId, {action: AWAITING_KEYWORDS_STATE});
};

export const addKeywordCommand = async (ctx: Context) => {
    const {chat} = ctx;
    setUserStateToAwaitingKeywords(chat!.id);
    await ctx.reply("Please enter keywords to add.");

};
