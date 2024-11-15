import {Context} from "grammy";
import {saveUserSettings} from "../../repository/SaveUserSettings";
import {deleteJob, getJob} from "../../scheduler/JobSetupStorage";
import {findOrCreateUserSetting} from "../../newsjob/UserSettingsService";
import {addJobToScheduler} from "../../scheduler/Scheduler";
import {UserSettings} from "../../repository/entity/UserSettings";
import {addTimeSlotCallbackHandler} from "../../newsjob/handlers/callback/addTimeSlotCallbackHandler";
import {addNewKeywordCallbackHandler} from "../../newsjob/handlers/callback/addNewKeywordCallbackHandler";

export const doneCallbackHandler = async (ctx: Context) => {
    const {chat, from} = ctx;
    const job = getJob(chat!.id, from!.id);

    if (job) {
        if (job.valid()) {
            const userSetting: UserSettings = await findOrCreateUserSetting(chat!.id, from!.id, from!.username!);
            userSetting.jobs.push(job.toPlainObject());
            await saveUserSettings(userSetting, ctx, `Job scheduled:\n${job.print()}\n`);
            addJobToScheduler(job);
            deleteJob(chat!.id, from!.id);
        } else {
            await ctx.reply("Job is not fully setup...");
            if (job.time === undefined) {
                await addTimeSlotCallbackHandler(ctx);
            }
            if (job.newsQuery.size === 0) {
                await addNewKeywordCallbackHandler(ctx);
            }
        }
    } else {
        await ctx.reply("No job is being set up.");
    }
};
