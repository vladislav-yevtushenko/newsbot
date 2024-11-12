import {Context} from "grammy";
import {saveUserSettings} from "./saveUserSettings";
import {findOrCreateUserSetting} from "./findOrCreateUserSetting";
import {UserSettings} from "../entity/UserSettings";
import {scheduleRefreshForUser} from "../Scheduler";

export const handleTimeSlots = async (ctx: Context) => {

    const {text} = ctx.message!;
    const {chat, from} = ctx;
    const timeslots = text?.split(',')
        .map(time => time.trim())
        .map(time => {
            return checkTimeString(time);
        });
    let userSetting: UserSettings = await findOrCreateUserSetting(chat!.id, from!.id, from!.username!);
    userSetting.scheduled_time.push(...timeslots!);

    await saveUserSettings(userSetting, ctx, `Timeslots "${timeslots?.join(', ')}" set successfully!`);

    scheduleRefreshForUser(chat!.id, from!.id);
}

function checkTimeString(str: string) {
    if (/^[0-2][0-9]:[0-5][0-9]$/.test(str)) {
        return str;
    } else {
        throw new Error(`Invalid time format: ${str}`);
    }
}
