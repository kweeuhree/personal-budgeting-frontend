import { createLogger } from "redux-logger";

export const logger = createLogger({
  collapsed: true, // Collapse actions for better readability
  duration: true, // Log the duration of each action
  timestamp: false, // Disable timestamps
  diff: true, // Show the state differences
});
