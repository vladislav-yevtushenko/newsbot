import {Job} from "./Job";
import {SendLatestNewsJob} from "../newsjob/job/SendLatestNewsJob";

type JobConstructor = (plain: object) => Job;

const jobMap = new Map<string, JobConstructor>();

export const registerJob = (type: string, ctor: JobConstructor): void => {
    jobMap.set(type, ctor);
};

export const createJob = (type: string, plain: object): Job => {
    const jobConstructor = jobMap.get(type);
    if (!jobConstructor) {
        throw new Error(`Unknown job type: ${type}`);
    }
    return jobConstructor(plain);
};

registerJob(SendLatestNewsJob.name, SendLatestNewsJob.fromPlain);
