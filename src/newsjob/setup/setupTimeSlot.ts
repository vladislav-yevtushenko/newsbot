import {Context, InlineKeyboard} from "grammy";
import {getJob, setJob} from "../../scheduler/JobSetupStorage";
import {NEWS_JOB_ADD_TIMESLOT_DONE_INLINE_KEYBOARD_CALLBACK, RESET_STATE_CALLBACK} from "../../Constants";

export const setupTimeSlot = async (ctx: Context) => {
    const {text} = ctx.message!;
    const {chat, from} = ctx;
    const job = getJob(chat!.id, from!.id);
    const inlineKeyboard = new InlineKeyboard()
        .text("Done", NEWS_JOB_ADD_TIMESLOT_DONE_INLINE_KEYBOARD_CALLBACK)
        .text("Cancel", RESET_STATE_CALLBACK)
    if (job) {
        text?.split(',')
            .map(time => time.trim())
            .filter(checkTimeString)
            .forEach(time => {
                job.setTime(time) //TODO should be incapsulate
                setJob(chat!.id, from!.id, job);
            });

        await ctx.reply("Time slots added to the job.", {
            reply_markup: inlineKeyboard
        });
    } else {
        await ctx.reply("No job is being set up.");
    }
};

const checkTimeString = (str: string) => {
    return /^\d{1,2}:[0-5]\d$/.test(str);
};
