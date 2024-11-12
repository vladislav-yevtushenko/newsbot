import {Context} from "grammy";
import {saveUserSettings} from "./saveUserSettings";
import {findOrCreateUserSetting} from "./findOrCreateUserSetting";

export const handleKeywords = async (ctx: Context) => {
    const {message} = ctx;

    if (!message || !message.text) {
        return ctx.reply('Please provide a list of keywords separated by a comma.');
    }

    const keywords = extractKeywords(message.text);
    let userSetting = await findOrCreateUserSetting(ctx.chat!.id, ctx.from!.id, ctx.from!.username!);

    userSetting.keywords.push(...keywords);

    await saveUserSettings(userSetting, ctx, `Keywords "${keywords.join(', ')}" added successfully!`);
};

const extractKeywords = (text: string): string[] => {
    return text.split(',').map(keyword => keyword.trim());
};

