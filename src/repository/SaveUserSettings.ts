import {UserSettings} from "./entity/UserSettings";
import {Context} from "grammy";
import {AppDataSource} from "./appDataSource";

export const saveUserSettings = async (userSetting: UserSettings, ctx: Context, successMessage: string) => {
    const userSettingRepository = AppDataSource.getRepository(UserSettings);

    try {

        await userSettingRepository.save(userSetting);
        await ctx.reply(successMessage);
    } catch (err) {
        console.error(err);
        await ctx.reply(`An error occurred while saving your settings. Please try again later.\n\n${err}`);
    }
};
