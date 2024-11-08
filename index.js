import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import {searchNews} from "./searchNews.js";

dotenv.config();


const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (!TELEGRAM_TOKEN) {
  throw new Error('TELEGRAM_TOKEN is not defined in the environment variables');
}
const bot = new TelegramBot(TELEGRAM_TOKEN, {polling: true});

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const keyword = msg.text?.trim();

    if (keyword) {
        try {
            bot.sendMessage("Начинаю искать...");
            const articles = await searchNews(keyword);

            if (articles.length > 0) {
                const results = articles
                    .map((article, index) => {
                        return `${index + 1}. [${article.title}](${article.url})\n${article.description}\n`;
                    })
                    .join("\n");

                bot.sendMessage(
                    chatId,
                    `Top news results for *"${keyword}"*:\n\n${results}`,
                    {parse_mode: "Markdown"},
                );
            } else {
                bot.sendMessage(
                    chatId,
                    `No news found for "${keyword}". Try a different keyword.`,
                );
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            bot.sendMessage(chatId, "Sorry, there was an error fetching the news.");
        }
    } else {
        bot.sendMessage(chatId, "Please enter a keyword to search for news.");
    }
});
