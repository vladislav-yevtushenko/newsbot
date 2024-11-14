import {Context, InlineKeyboard} from "grammy";
import {userStates} from "../../utils/userStates";
import {
    NEWS_JOB_ADD_KEYWORDS_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_ADD_TIMESLOT_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_AWAITING_NEW_JOB_STATE,
    NEWS_JOB_DONE_CALLBACK
} from "../../Constants";
import {SendLatestNewsJob} from "../job/SendLatestNewsJob";
import {setJob} from "../../scheduler/JobSetupStorage";

export const setupSendLatestNewsJob = async (ctx: Context) => {
    const {chat, from} = ctx;
    const job = new SendLatestNewsJob(from!.id, chat!.id, "", []);

    setJob(chat!.id, from!.id, job);

    const inlineKeyboard = new InlineKeyboard()
        .text("Add keywords", NEWS_JOB_ADD_KEYWORDS_INLINE_KEYBOARD_CALLBACK)
        .text("Add time slots", NEWS_JOB_ADD_TIMESLOT_INLINE_KEYBOARD_CALLBACK)
        .text("Done", NEWS_JOB_DONE_CALLBACK);

    userStates.set(ctx.chat!.id, {action: NEWS_JOB_AWAITING_NEW_JOB_STATE});

    await ctx.reply("Please setup the news job", {
        reply_markup: inlineKeyboard
    });
};
