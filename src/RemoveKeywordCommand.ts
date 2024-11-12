import {Context} from "grammy";
import {userStates} from "./utils/userStates";
import {REMOVING_KEYWORDS_STATE} from "./commands/Constants";

const setUserStateToRemovingKeywords = (chatId: number) => {
    userStates.set(chatId, {action: REMOVING_KEYWORDS_STATE});
}

export const removeKeywordCommand = async (ctx: Context) => {
    setUserStateToRemovingKeywords(ctx.chat!.id);
    await ctx.reply("Please enter keywords to remove.");
};
