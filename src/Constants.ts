const AWAITING_SELECT_JOB_TO_ADD = "awaiting_select_job_to_add";
const NEWS_JOB_AWAITING_NEW_JOB_STATE = "adding_getting_news_job";
const NEWS_JOB_SETUP_AWAITING_KEYWORDS_STATE = "awaiting_news_query_to_be_added"
const NEWS_JOB_SETUP_AWAITING_TIMESLOT_STATE = "awaiting_time_slots_to_be_added"
const NEWS_JOB_ADD_TIMESLOT_INLINE_KEYBOARD_CALLBACK = "add_news_time_slots";
const NEWS_JOB_ADD_KEYWORDS_DONE_INLINE_KEYBOARD_CALLBACK = "adding_keywords_done"
const NEWS_JOB_ADD_TIMESLOT_DONE_INLINE_KEYBOARD_CALLBACK = "adding_timeslot_done"
const NEWS_JOB_ADD_TIMESLOT_MESSAGE = "Please enter the timeslots (comma-separated) when you want to receive news updates, e.g., '08:00, 12:00, 18:00'.";
const NEWS_JOB_DONE_CALLBACK = "news_job_done_callback"
const NEWS_JOB_ADD_NEW_JOB_INLINE_KEYBOARD_CALLBACK = "scheduleJobForNews";
const NEWS_JOB_ADD_KEYWORDS_INLINE_KEYBOARD_CALLBACK = "add_news_keywords";
const RESET_STATE_CALLBACK = "resetState"

export {
    NEWS_JOB_ADD_KEYWORDS_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_SETUP_AWAITING_KEYWORDS_STATE,
    NEWS_JOB_SETUP_AWAITING_TIMESLOT_STATE,
    NEWS_JOB_ADD_KEYWORDS_DONE_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_ADD_TIMESLOT_DONE_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_ADD_TIMESLOT_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_DONE_CALLBACK,
    NEWS_JOB_ADD_TIMESLOT_MESSAGE,
    AWAITING_SELECT_JOB_TO_ADD,
    NEWS_JOB_ADD_NEW_JOB_INLINE_KEYBOARD_CALLBACK,
    NEWS_JOB_AWAITING_NEW_JOB_STATE,
    RESET_STATE_CALLBACK
}