import {AppDataSource} from '../repository/appDataSource';
import {UserSettings} from '../repository/entity/UserSettings';
import dotenv from 'dotenv';

import {Job} from "./Job";

dotenv.config();


const jobs: Job[] = [];


export const loadJobsFromDb = () => {
    const userRepository = AppDataSource.getRepository(UserSettings);
    userRepository.find().then(
        (foundUserSettings: UserSettings[]) => {
            foundUserSettings.forEach(
                (userSettings: UserSettings) => {
                    userSettings.jobs.forEach((job: Job) => {
                        addJobToScheduler(job);
                    })
                });
        }).catch((err) => {
        console.error(err);
    })
}

export const addJobToScheduler = (job: Job) => {
    if (!jobs.some((existingJob: Job) => existingJob.equals(job))) {
        job.schedule();
        jobs.push(job);
    }
}

