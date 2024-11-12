import {UserSettings} from "../entity/UserSettings";
import {AppDataSource} from "../appDataSource";

export const findOrCreateUserSetting = async (chatId: number, userId: number, username: string): Promise<UserSettings> => {
    const userSettingRepository = AppDataSource.getRepository(UserSettings);
    let userSetting = await userSettingRepository.findOne({where: {chat_id: chatId}});

    if (!userSetting) {
        userSetting = new UserSettings();
        userSetting.chat_id = chatId;
        userSetting.user_id = userId;
        userSetting.username = username;
        userSetting.scheduled_time = [];
        userSetting.keywords = [];
    }

    return userSetting;
};
