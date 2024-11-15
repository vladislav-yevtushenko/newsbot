import dotenv from "dotenv";
import {Bot} from "grammy";
import {startCommand} from "./commands/startCommand";
import {messageHandler} from "./handlers/messageHandler";
import {addNewJobCommand} from "./commands/addNewJobCommand";
import {
    NEWS_JOB_ADD_KEYWORDS_DONE_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_ADD_KEYWORDS_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_ADD_NEW_JOB_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_ADD_TIMESLOT_DONE_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_ADD_TIMESLOT_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_DONE_CALLBACK,
    RESET_STATE_CALLBACK
} from "./Constants";
import {setupSendLatestNewsJob} from "./newsjob/setup/SetupSendLatestNewsJob";
import {resetStateCallbackHandler} from "./handlers/callbacks/ResetStateCallbackHandler";
import {addNewKeywordCallbackHandler} from "./newsjob/handlers/callback/addNewKeywordCallbackHandler";
import {addTimeSlotCallbackHandler} from "./newsjob/handlers/callback/addTimeSlotCallbackHandler";
import {doneCallbackHandler} from "./handlers/callbacks/DoneCallbackHandler";
import {listJobsCommand} from "./commands/listJobsCommand";
import {deleteJobCallbackHandler} from "./handlers/callbacks/DeleteJobCallbackHandler";

dotenv.config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (!TELEGRAM_TOKEN) {
    throw new Error('TELEGRAM_TOKEN is not defined in the environment variables');
}

const bot = new Bot(TELEGRAM_TOKEN);

const commands = [
    {command: "/start", description: "Start the bot"},
    {command: "/add_job", description: "Add a new job"},
    {command: "/list_jobs", description: "List all jobs"}
];

bot.api.setMyCommands(commands).then(() => {

})
bot.command("start", startCommand);
bot.command("add_job", addNewJobCommand);
bot.command("list_jobs", listJobsCommand);
bot.on("message:text", messageHandler);
bot.callbackQuery(NEWS_JOB_ADD_NEW_JOB_INLINE_KEYBOARD_CALLBACK, setupSendLatestNewsJob)
bot.callbackQuery(NEWS_JOB_ADD_KEYWORDS_INLINE_KEYBOARD_CALLBACK, addNewKeywordCallbackHandler)
bot.callbackQuery(NEWS_JOB_ADD_TIMESLOT_INLINE_KEYBOARD_CALLBACK, addTimeSlotCallbackHandler)
bot.callbackQuery(NEWS_JOB_DONE_CALLBACK, doneCallbackHandler)
bot.callbackQuery(RESET_STATE_CALLBACK, resetStateCallbackHandler)
bot.callbackQuery(NEWS_JOB_ADD_KEYWORDS_DONE_INLINE_KEYBOARD_CALLBACK, doneCallbackHandler)
bot.callbackQuery(NEWS_JOB_ADD_TIMESLOT_DONE_INLINE_KEYBOARD_CALLBACK, doneCallbackHandler)
bot.callbackQuery(/^delete_job:\d+/, deleteJobCallbackHandler)

export {bot};
