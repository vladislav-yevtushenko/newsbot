import {Context, Keyboard} from "grammy";
import {userStates} from "../../../utils/userStates";
import {NEWS_JOB_ADD_TIMESLOT_MESSAGE, NEWS_JOB_SETUP_AWAITING_TIMESLOT_STATE} from "../../../Constants";


export const setUserStateToAwaitingTimeSlots = (chatId: number) => {
    userStates.set(chatId, {action: NEWS_JOB_SETUP_AWAITING_TIMESLOT_STATE});
};

export const addTimeSlotCallbackHandler = async (ctx: Context) => {
    setUserStateToAwaitingTimeSlots(ctx.chat!.id);
    const inlineKeyboard = new Keyboard()
        .text("🕘 09:00")
        .text("🕛 12:00")
        .text("🕑 14:00")
        .text("🕕 18:00")
        .resized(true)
        .oneTime()

    await ctx.reply(NEWS_JOB_ADD_TIMESLOT_MESSAGE, {
        reply_markup: inlineKeyboard
    });
};
