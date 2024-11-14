import {Context} from "grammy";
import {AppDataSource} from "../repository/appDataSource";
import {UserSettings} from "../repository/entity/UserSettings";

export const listJobs = async (ctx: Context) => {
    const userSettingsRepository = AppDataSource.getRepository(UserSettings);
    const ERROR_MESSAGE = "There was an error retrieving your jobs. Please try again later.";

    const {reply, chat} = ctx;

};
