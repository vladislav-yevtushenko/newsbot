import {Context} from "grammy";
import {userStates} from "../utils/userStates";
import {
    NEWS_JOB_SETUP_AWAITING_KEYWORDS_STATE,
    NEWS_JOB_SETUP_AWAITING_TIMESLOT_STATE,
    RESET_STATE_CALLBACK
} from "../Constants";
import {setupKeywords} from "../newsjob/setup/setupKeywords";
import {setupTimeSlot} from "../newsjob/setup/setupTimeSlot";

const inlineKeyboard = {
    inline_keyboard: [
        [
            {text: "Cancel", callback_data: RESET_STATE_CALLBACK}
        ]
    ]
};
export const messageHandler = async (ctx: Context) => {
    const {id} = ctx.chat!;
    const userState = userStates.get(id) || {action: null};

    switch (userState.action) {
        case NEWS_JOB_SETUP_AWAITING_KEYWORDS_STATE:
            setupKeywords(ctx)
            break;
        case NEWS_JOB_SETUP_AWAITING_TIMESLOT_STATE:
            setupTimeSlot(ctx);
            break;
        default:
            await ctx.reply("Command not recognized. Please enter a valid command.", {
                reply_markup: inlineKeyboard
            });

            break;
    }

    userStates.set(id, {action: null});
};
