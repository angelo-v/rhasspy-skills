import { now } from "./now";

/**
 * get the time in the given time zone
 * @param timeZone
 */
export function nowIn(timeZone: string): DateTime {
  const dateString = now().toLocaleString("en-US", { timeZone });
  const date = new Date(dateString);
  return {
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    month: date.getMonth() + 1,
    second: date.getSeconds(),
    year: date.getFullYear(),
  };
}
