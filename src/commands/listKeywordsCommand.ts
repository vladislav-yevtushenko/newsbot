import {Context} from "grammy";
import {AppDataSource} from "../appDataSource";
import {UserSettings} from "../entity/UserSettings";

export const listKeywordsCommand = async (ctx: Context) => {
    const userSettingsRepository = AppDataSource.getRepository(UserSettings);
    const ERROR_MESSAGE = "There was an error retrieving your keywords. Please try again later.";

    const {reply, chat} = ctx;
    try {
        if (chat) {
            const userSettings = await userSettingsRepository.findOne({where: {chat_id: chat.id}});
            replyWithKeywords(ctx, userSettings);
        } else {
            reply("This command can only be used in a chat.");
        }
    } catch (err) {
        console.error(err);
        reply(ERROR_MESSAGE);
    }
};

const replyWithKeywords = (ctx: Context, userSettings: UserSettings | null) => {
    if (userSettings && userSettings.keywords.length > 0) {
        const keywordList = userSettings.keywords.join(', ');
        ctx.reply(`Your keywords: ${keywordList}`);
    } else {
        ctx.reply("You have no keywords added.");
    }
};
