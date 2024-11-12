// src/entity/UserSetting.ts
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

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
    keywords!: string[];

    @Column("jsonb")
    scheduled_time!: string[];
}
