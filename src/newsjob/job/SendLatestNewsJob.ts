import cron, {ScheduledTask} from "node-cron";
import {sendArticlesToChat} from "../SendArticlesToChat";
import {convertTimeToCron} from "../../utils/ConvertTimeToCron";
import {Job} from "../../scheduler/Job";


export class SendLatestNewsJob implements Job {
    public readonly type: string = 'SendLatestNewsJob';
    public readonly id: string;
    public readonly userId: number;
    public readonly chatId: number;
    public time: string;
    public readonly newsQuery: Set<string>;
    private scheduled: boolean = false;
    private task: (() => Promise<void>) | undefined;
    private scheduledTask: ScheduledTask | undefined;

    constructor(userId: number, chatId: number, time: string, newsQuery: Set<string>) {
        this.id = `${chatId}${userId}${time}`;
        this.userId = userId;
        this.chatId = chatId;
        this.time = time;
        this.newsQuery = newsQuery;
        this.scheduledTask = undefined;
    }

    static fromPlain(plain: any): SendLatestNewsJob {
        const {userId, chatId, time, newsQuery} = plain;
        return new SendLatestNewsJob(userId, chatId, time, newsQuery);
    }

    public toPlainObject(): any {
        return {
            id: this.id,
            type: this.type,
            userId: this.userId,
            chatId: this.chatId,
            time: this.time,
            newsQuery: Array.from(this.newsQuery)
        };
    }

    public equals(otherJob: Job): boolean {
        if (!(otherJob instanceof SendLatestNewsJob)) {
            return false;
        } else {
            return this.userId === otherJob.userId && this.chatId === otherJob.chatId && this.time === otherJob.time;
        }
    }

    public schedule() {
        this.task = sendArticlesToChat(this.chatId, this.joinNewsQuery(this.newsQuery));
        const cronTime = convertTimeToCron(this.time);
        if (!this.scheduled) {
            this.scheduledTask = cron.schedule(cronTime, this.task);
            this.scheduled = true;
        } else {
            console.warn(`Job for user ${this.userId} cronTime: ${cronTime} is already scheduled`);
        }
    }

    public cancel() {
        if (this.scheduledTask) {
            this.scheduledTask.stop();
            this.scheduled = false;
        } else {
            console.warn(`Requesting to cancel job but Job ${this.id} for user ${this.userId} is not scheduled`);
        }
    }

    public print(): string {
        return `Bot will send articles:\nquery: ${this.joinNewsQuery(this.newsQuery)}\nWhen: ${this.time}`;
    }

    public addNewsQuery(keyword: string) {
        this.newsQuery.add(keyword);
    }

    public setTime(time: string) {
        this.time = time;
    }

    valid() {
        return this.time !== '' && this.newsQuery.size > 0;
    }


    private joinNewsQuery(newsQuery: Set<string>) {
        return Array.from(newsQuery).join(' ');
    }
}
