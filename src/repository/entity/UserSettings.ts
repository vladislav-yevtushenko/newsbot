// src/entity/UserSetting.ts
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

import {Job} from "../../scheduler/Job";

@Entity()
export class UserSettings {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    chat_id!: number;

    @Column()
    user_id!: number;

    @Column()
    username!: string;

    @Column("jsonb")
    jobs!: Job[];
}
