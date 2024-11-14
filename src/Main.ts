import {AppDataSource} from "./repository/appDataSource";
import {bot} from "./TelegramBot";
import {loadJobsFromDb} from "./scheduler/Scheduler";


AppDataSource.initialize().then(async () => {
    console.log("Data Source has been initialized!");
    loadJobsFromDb();
    await bot.start();
}).catch(err => {
    console.error("Error during Data Source initialization:", err);
});


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

