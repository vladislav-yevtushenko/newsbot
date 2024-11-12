import {Context} from "grammy";
import {userStates} from "../utils/userStates";
import {handleKeywords} from "./handleKeywords";
import {handleTimeSlots} from "./handleTimeSlots";

export const messageHandler = async (ctx: Context) => {
    const {id} = ctx.chat!;
    const userState = userStates.get(id) || {action: null};

    switch (userState.action) {
        case "awaiting_keywords":
            await handleKeywords(ctx);
            break;
        case "awaiting_time_slots":
            await handleTimeSlots(ctx);
            break;
        default:
            await ctx.reply("Command not recognized. Please enter a valid command.");
            break;
    }

    userStates.set(id, {action: null});
};
