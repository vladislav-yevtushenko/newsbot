import {Context} from "grammy";
import {userStates} from "../../../utils/userStates";
import {NEWS_JOB_SETUP_AWAITING_KEYWORDS_STATE} from "../../../Constants";

export const addNewKeywordCallbackHandler = async (ctx: Context) => {
    const {message} = ctx;

    userStates.set(ctx.chat!.id, {action: NEWS_JOB_SETUP_AWAITING_KEYWORDS_STATE});
    if (!message || !message.text) {
        return ctx.reply('Please provide a keywords separated by space');
    }


}


