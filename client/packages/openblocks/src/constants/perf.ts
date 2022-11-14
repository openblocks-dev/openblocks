/**
 * Input/TextArea's default debounce
 */
export const INPUT_DEFAULT_ONCHANGE_DEBOUNCE = 50;

/**
 * enable Action's priority
 */
export const ENABLE_ACTION_PRIORITY = true;

/**
 * timeout to clear the action queue, valid when action priority is enabled
 */
export const CLEAR_ACTION_QUEUE_TIMEOUT = 500;

/**
 * debounce when RootComp updates view, closed as 0
 */
export const UPDATE_ROOT_VIEW_DEBOUNCE = 0;

/**
 * app is regarded as CalmDown if no action is dispatched within this time interval
 */
export const CALM_DOWN_TIMEOUT = 3000;
