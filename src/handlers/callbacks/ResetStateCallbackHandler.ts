import {userStates} from "../../utils/userStates";
import {Context} from "grammy";
import {deleteJob} from "../../scheduler/JobSetupStorage";

export const resetStateCallbackHandler = async (ctx: Context) => {
    userStates.set(ctx.chat!.id, {action: null})
    deleteJob(ctx.chat!.id, ctx.from!.id)
    await ctx.reply("Ok. Canceled.")
};
