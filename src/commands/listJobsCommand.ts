import {Context, InlineKeyboard} from "grammy";
import {AppDataSource} from "../repository/appDataSource";
import {UserSettings} from "../repository/entity/UserSettings";
import {createJob} from "../scheduler/JobConstructor";

export const listJobsCommand = async (ctx: Context) => {
    const userSettingsRepository = AppDataSource.getRepository(UserSettings);
    const {chat, from} = ctx;
    const chatId = chat!.id;
    try {
        const userSettings = await userSettingsRepository.findOneBy({chat_id: chatId, user_id: from!.id});
        if (!userSettings) {
            await ctx.reply("User settings not found.");
            return;
        }
        const jobs = userSettings.jobs.map(job => createJob(job.type, job));
        const keyboard = new InlineKeyboard()
        jobs.forEach(job => ([
            keyboard.text(`❌ ${job.print()}`, `delete_job:${job.id}`),
            keyboard.row()
        ]));

        await ctx.reply(`Here are your current jobs: `, {
            reply_markup: keyboard
        });
    } catch (error) {
        console.error("Error retrieving user jobs:", error);
    }
};

