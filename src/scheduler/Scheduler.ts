import {AppDataSource} from '../repository/appDataSource';
import {UserSettings} from '../repository/entity/UserSettings';
import dotenv from 'dotenv';

import {Job} from "./Job";
import {createJob} from "./JobConstructor";

dotenv.config();


const jobs: Job[] = [];


export const loadJobsFromDb = () => {
    const userRepository = AppDataSource.getRepository(UserSettings);
    userRepository.find().then(
        (foundUserSettings: UserSettings[]) => {
            foundUserSettings.forEach((userSettings: UserSettings) => {
                userSettings.jobs
                    .forEach((job: any) => {
                        let type = job.type;
                        if (type) {
                            const jobInstance = createJob(type, job);
                            addJobToScheduler(jobInstance);
                        }
                    });
            });
        }).catch((err) => {
        console.error(err);
    });
}


export const addJobToScheduler = (job: Job) => {
    if (!jobs.some((existingJob: Job) => existingJob.equals(job))) {
        job.schedule();
        jobs.push(job);
    }
}

export const removeJobFromScheduler = (job: Job) => {
    const index = jobs.findIndex((existingJob: Job) => existingJob.equals(job));
    if (index !== -1) {
        job.cancel();
        jobs.splice(index, 1);
    }
}

