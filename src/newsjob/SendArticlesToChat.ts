import {searchNews} from "./api/searchNews";
import {bot} from "../TelegramBot";


export const sendArticlesToChat = (chatId: number, keyword: string) => async () => {
    const articles = await searchNews(keyword);
    if (articles.length > 0) {
        const results = articles
            .map((article, index) => {
                return `${index + 1}. [${article.title}](${article.url})\n${article.description}\n`;
            })
            .join("\n");
        await bot.api.sendMessage(
            chatId, `Top news results for *"${keyword}"*:\n\n${results}`, {parse_mode: "Markdown"});
    } else {
        await bot.api.sendMessage(chatId, `No news found for "${keyword}". Try a different keyword.`);
    }
};
