import cron from "node-cron";

export const convertTimeToCron = (time: string) => {
    // time is in the format HH:MM
    const [hour, minute] = time.split(":");
    const cronTime = `${minute} ${hour} * * *`;
    if (cron.validate(cronTime)) {
        return cronTime;
    } else {
        throw new Error(`Invalid time format: ${time}`);
    }
};
