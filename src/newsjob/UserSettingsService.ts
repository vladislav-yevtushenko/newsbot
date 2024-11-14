import { AppDataSource } from "../repository/appDataSource";
import { UserSettings } from "../repository/entity/UserSettings";

export const findOrCreateUserSetting = async (chatId: number, userId: number, username: string): Promise<UserSettings> => {
    const userSettingRepository = AppDataSource.getRepository(UserSettings);

    let userSetting = await userSettingRepository.findOneBy({ chat_id: chatId, user_id: userId });

    if (!userSetting) {
        userSetting = new UserSettings();
        userSetting.chat_id = chatId;
        userSetting.user_id = userId;
        userSetting.username = username;
        userSetting.jobs = [];
        await userSettingRepository.save(userSetting);
    }

    return userSetting;
};
