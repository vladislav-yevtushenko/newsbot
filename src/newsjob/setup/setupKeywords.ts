import {Context, InlineKeyboard} from "grammy";
import {getJob, setJob} from "../../scheduler/JobSetupStorage";
import {
    NEWS_JOB_ADD_KEYWORDS_DONE_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_ADD_KEYWORDS_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_ADD_TIMESLOT_INLINE_KEYBOARD_CALLBACK,
    RESET_STATE_CALLBACK
} from "../../Constants";

export const setupKeywords = async (ctx: Context) => {
    const {chat, from, message} = ctx;
    const job = getJob(chat!.id, from!.id);
    const inlineKeyBoard = new InlineKeyboard()
        .text("Add more", NEWS_JOB_ADD_KEYWORDS_INLINE_KEYBOARD_CALLBACK)
        .row()
        .text("Add Time", NEWS_JOB_ADD_TIMESLOT_INLINE_KEYBOARD_CALLBACK)
        .row()
        .text("Done", NEWS_JOB_ADD_KEYWORDS_DONE_INLINE_KEYBOARD_CALLBACK)
        .text("Cancel", RESET_STATE_CALLBACK)
    if (job) {
        job.addNewsQuery(message!.text!)
        setJob(chat!.id, from!.id, job);
        await ctx.reply(`Keywords "${message!.text!}" has been add to the job.`, {
            reply_markup: inlineKeyBoard
        });
    } else {
        await ctx.reply("No job is being set up. Please start a new job setup.");
    }
};
