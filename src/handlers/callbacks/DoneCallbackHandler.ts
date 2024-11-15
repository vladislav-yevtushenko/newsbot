import {Context} from "grammy";
import {saveUserSettings} from "../../repository/SaveUserSettings";
import {deleteJob, getJob} from "../../scheduler/JobSetupStorage";
import {findOrCreateUserSetting} from "../../newsjob/UserSettingsService";
import {addJobToScheduler} from "../../scheduler/Scheduler";

export const doneCallbackHandler = async (ctx: Context) => {
    const {chat, from} = ctx;
    const job = getJob(chat!.id, from!.id);

    if (job) {
        const userSetting = await findOrCreateUserSetting(chat!.id, from!.id, from!.username!);
        userSetting.jobs.push(job);
        await saveUserSettings(userSetting, ctx, `Job scheduled:\n${job.toString()}\n`);
        addJobToScheduler(job);
        deleteJob(chat!.id, from!.id);
    } else {
        await ctx.reply("No job is being set up.");
    }
};
