import {Context, InlineKeyboard} from "grammy";
import {userStates} from "../utils/userStates";
import {AWAITING_SELECT_JOB_TO_ADD, NEWS_JOB_ADD_NEW_JOB_INLINE_KEYBOARD_CALLBACK} from "../Constants";

const setUserStateToAwaitingSelectJob = (chatId: number) => {
    userStates.set(chatId, {action: AWAITING_SELECT_JOB_TO_ADD});
};

export const addNewJobCommand = async (ctx: Context) => {
    const {chat} = ctx;
    setUserStateToAwaitingSelectJob(chat!.id);
    const availableJobsInlineKeyboard = new InlineKeyboard()
        .text("Get latest news (NewsAPI)", NEWS_JOB_ADD_NEW_JOB_INLINE_KEYBOARD_CALLBACK);

    await ctx.reply("Please select a job to add", {
        reply_markup: availableJobsInlineKeyboard
    });

};
