import {SendLatestNewsJob} from "../newsjob/job/SendLatestNewsJob";

const jobSetupStorage = new Map<string, SendLatestNewsJob>();

export const setJob = (chatId: number, userId: number, job: SendLatestNewsJob): void => {
    jobSetupStorage.set(getJobKey(chatId, userId), job);
};

export const getJob = (chatId: number, userId: number): SendLatestNewsJob | undefined => {
    return jobSetupStorage.get(getJobKey(chatId, userId));
};

export const deleteJob = (chatId: number, userId: number): void => {
    jobSetupStorage.delete(getJobKey(chatId, userId));
};

const getJobKey = (chatId: number, userId: number): string => {
    return `${chatId}${userId}`;
};
