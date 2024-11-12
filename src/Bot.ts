import {Bot} from "grammy";
import dotenv from "dotenv";
import {AppDataSource} from "./appDataSource";
import {startCommand} from "./commands/startCommand";
import {addKeywordCommand} from "./commands/addKeywordCommand";
import {setTimeCommand} from "./commands/setTimeCommand";
import {listKeywordsCommand} from "./commands/listKeywordsCommand";
import {messageHandler} from "./handlers/messageHandler";
import {removeKeywordCommand} from "./RemoveKeywordCommand";

dotenv.config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (!TELEGRAM_TOKEN) {
    throw new Error('TELEGRAM_TOKEN is not defined in the environment variables');
}

const bot = new Bot(TELEGRAM_TOKEN);

const commands = [
    {command: "/start", description: "Start the bot"},
    {command: "/add_keyword", description: "Add a keyword to receive news updates"},
    {command: "/remove_keyword", description: "Remove a keyword to stop receiving news updates"},
    {command: "/list_keywords", description: "List all keywords"},
    {command: "/set_time", description: "Set the time to receive news updates"},
];

bot.api.setMyCommands(commands);

AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!");
}).catch(err => {
    console.error("Error during Data Source initialization:", err);
});

bot.command("start", startCommand);
bot.command("add_keyword", addKeywordCommand);
bot.command("set_time", setTimeCommand);
bot.command("list_keywords", listKeywordsCommand);
bot.command("remove_keyword", removeKeywordCommand);
bot.on("message:text", messageHandler);

bot.start();

// Gracefully shutdown the postgres client on exit
process.on('exit', () => {
    AppDataSource.destroy();
});

process.on('SIGINT', () => {
    AppDataSource.destroy();
    process.exit();
});

process.on('SIGTERM', () => {
    AppDataSource.destroy();
    process.exit();
});

