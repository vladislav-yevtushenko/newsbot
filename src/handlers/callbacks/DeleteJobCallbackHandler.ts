import {Context} from "grammy";
import {AppDataSource} from "../../repository/appDataSource";
import {UserSettings} from "../../repository/entity/UserSettings";
import {createJob} from "../../scheduler/JobConstructor";
import {removeJobFromScheduler} from "../../scheduler/Scheduler";

function deleteJobFromScheduler(userSetting: UserSettings, jobId: string) {
    userSetting.jobs
        .map(job => createJob(job.type, job))
        .filter(job => job.id === jobId)
        .forEach(job => removeJobFromScheduler(job));
}

export const deleteJobCallbackHandler = async (ctx: Context) => {
    let callbackData = ctx.callbackQuery?.data;
    if (callbackData) {
        const jobId = callbackData.split(":")[1];
        console.log(`Deleting job with id: ${jobId}`);
        const userSettingRepository = AppDataSource.getRepository(UserSettings);
        let userSetting = await userSettingRepository.findOneBy({chat_id: ctx.chat!.id, user_id: ctx.from!.id});
        if (userSetting) {
            deleteJobFromScheduler(userSetting, jobId);

            userSetting.jobs = userSetting.jobs.filter(job => job.id !== jobId);

            await userSettingRepository.save(userSetting);
        }
        await ctx.reply(`Job with id: ${jobId} has been deleted`);
    }

};
