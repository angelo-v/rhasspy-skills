import { now } from "./now";

export const nowLocal = (): DateTime => {
  const date = now();
  return {
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    month: date.getMonth() + 1,
    second: date.getSeconds(),
    year: date.getFullYear(),
  };
};
