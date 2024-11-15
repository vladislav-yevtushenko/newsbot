import cron from "node-cron";
import {sendArticlesToChat} from "../SendArticlesToChat";
import {convertTimeToCron} from "../../utils/ConvertTimeToCron";
import {Job} from "../../scheduler/Job";


export class SendLatestNewsJob implements Job {
    private readonly userId: number;
    private readonly chatId: number;
    private time: string;
    private readonly newsQuery: Set<string>;
    private scheduled: boolean = false;
    private task: (() => Promise<void>) | undefined;

    constructor(userId: number, chatId: number, time: string, newsQuery: string[]) {
        this.userId = userId;
        this.chatId = chatId;
        this.time = time;
        this.newsQuery = new Set(newsQuery);
    }

    public equals(job: SendLatestNewsJob): boolean {
        return this.userId === job.userId && this.chatId === job.chatId && this.time === job.time;
    }

    public schedule() {
        this.task = sendArticlesToChat(this.chatId, this.joinNewsQuery(this.newsQuery));
        const cronTime = convertTimeToCron(this.time);
        if (!this.scheduled) {
            cron.schedule(cronTime, this.task);
            this.scheduled = true;
        } else {
            console.warn(`Job for user ${this.userId} cronTime: ${cronTime} is already scheduled`);
        }
    }

    public toString(): string {
        return `Bot will send articles:\nquery: ${this.joinNewsQuery(this.newsQuery)}\nWhen: ${this.time}`;
    }

    public addNewsQuery(keyword: string) {
        this.newsQuery.add(keyword);
    }

    public setTime(time: string) {
        this.time = time;
    }

    private joinNewsQuery(newsQuery: Set<string>) {
        return Array.from(newsQuery).join(' ');
    }
}
