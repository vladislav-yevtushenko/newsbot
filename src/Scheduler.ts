import cron from 'node-cron';
import {AppDataSource} from './appDataSource';
import {UserSettings} from './entity/UserSettings';
import {searchNews} from './searchNews';
import {Bot} from 'grammy';
import dotenv from 'dotenv';

dotenv.config();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
if (!TELEGRAM_TOKEN) {
    throw new Error('TELEGRAM_TOKEN is not defined in the environment variables');
}

const bot = new Bot(TELEGRAM_TOKEN);


function sendArticles(user: UserSettings) {
    return async () => {
        for (const keyword of user.keywords) {
            const articles = await searchNews(keyword);
            if (articles.length > 0) {
                const results = articles
                    .map((article, index) => {
                        return `${index + 1}. [${article.title}](${article.url})\n${article.description}\n`;
                    })
                    .join("\n");

                await bot.api.sendMessage(
                    user.chat_id,
                    `Top news results for *"${keyword}"*:\n\n${results}`,
                    {parse_mode: "Markdown"}
                );
            } else {
                await bot.api.sendMessage(
                    user.chat_id,
                    `No news found for "${keyword}". Try a different keyword.`
                );
            }
        }
    };
}

function convertTimeToCron(time: string) {
    // time is in the format HH:MM
    const [hour, minute] = time.split(":");
    const cronTime = `${minute} ${hour} * * *`;
    if (cron.validate(cronTime)) {
        return cronTime;
    } else {
        throw new Error(`Invalid time format: ${time}`);
    }
}

const runJob = (user: UserSettings) => {
    user?.scheduled_time.forEach((time) => {
        console.log(`Scheduling job for user ${user.id} at ${time}`);
        const cronTime = convertTimeToCron(time);
        const job = cron.schedule(cronTime, sendArticles(user));
        job.start();
    })
};

export const scheduleRefresh = async () => {
    const userRepository = AppDataSource.getRepository(UserSettings);
    await userRepository.find().then(
        (users) => {
            users.forEach((user) => {
                runJob(user);
            })
        }).catch((err) => {
        console.error(err);
    })
};

export const scheduleRefreshForUser = async (chatId: number, userId: number) => {
    const userRepository = AppDataSource.getRepository(UserSettings);
    await userRepository.findOne({where: {chat_id: chatId, id: userId}})
        .then(user => runJob(user!))
        .catch((err) => {
            console.error(err);
        })

}

AppDataSource.initialize().then(async () => {
    setInterval(() => {
        scheduleRefresh()
    }, 1000 * 60);
}).catch(err => {
    console.error("Error during Data Source initialization:", err);
});


