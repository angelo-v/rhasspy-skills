import { announceTime } from "./announceTime";

export function announceWorldTime(local: DateTime, other: DateTime) {
  return announceTime(other, 0);
}
