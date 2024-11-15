import {Context, InlineKeyboard} from "grammy";
import {getJob, setJob} from "../../scheduler/JobSetupStorage";
import {NEWS_JOB_ADD_TIMESLOT_DONE_INLINE_KEYBOARD_CALLBACK, RESET_STATE_CALLBACK} from "../../Constants";
import {addTimeSlotCallbackHandler} from "../handlers/callback/addTimeSlotCallbackHandler";

export const setupTimeSlot = async (ctx: Context) => {
    const {text} = ctx.message!;
    const {chat, from} = ctx;
    const job = getJob(chat!.id, from!.id);
    const inlineKeyboard = new InlineKeyboard()
        .text("Done", NEWS_JOB_ADD_TIMESLOT_DONE_INLINE_KEYBOARD_CALLBACK)
        .text("Cancel", RESET_STATE_CALLBACK)

    if (job) {
        if (text && /^(\d{1,2}:\d{1,2}(\s*,\s*)*)+$/.test(text)) {
            text?.split(',')
                .map(time => time.trim())
                .filter(checkTimeString)
                .forEach(time => {
                    job.setTime(time)
                    setJob(chat!.id, from!.id, job);
                    ctx.reply(`Time: ${time} added to the job.`, {
                        reply_markup: inlineKeyboard
                    });
                });
        } else {
            await ctx.reply("Invalid time format. Please enter time in HH:MM format separated by comma. e.g. 08:00," +
                " 12:00, 18:00");
            await addTimeSlotCallbackHandler(ctx)
        }
    } else {
        await ctx.reply("No job is being set up.");
    }
};

const checkTimeString = (str: string) => {
    return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(str);
};
