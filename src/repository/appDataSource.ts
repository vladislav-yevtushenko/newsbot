// src/appDataSource.ts
import "reflect-metadata";
import dotenv from "dotenv";
import {DataSource} from "typeorm";
import {UserSettings} from "./entity/UserSettings";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [UserSettings],
    synchronize: true,
    logging: true,
});
