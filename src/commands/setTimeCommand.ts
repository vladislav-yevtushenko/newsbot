import {Context} from "grammy";
import {userStates} from "../utils/userStates";
import {AWAITING_TIME_SLOTS_ACTION, TIME_SLOTS_MESSAGE} from "./Constants";


const setUserStateToAwaitingTimeSlots = (chatId: number) => {
    userStates.set(chatId, {action: AWAITING_TIME_SLOTS_ACTION});
};

export const setTimeCommand = async (ctx: Context) => {
    setUserStateToAwaitingTimeSlots(ctx.chat!.id);
    await ctx.reply(TIME_SLOTS_MESSAGE);

};
