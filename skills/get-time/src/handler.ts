import { Handler, RhasspyEvent, RhasspySession } from "../../../core/src";
import { announceTime } from "./announceTime";
import { nowLocal } from "./nowLocal";

export class GetCurrentTime implements Handler {
  async handle(event: RhasspyEvent, session: RhasspySession) {
    const text = announceTime(nowLocal());
    return session.say(text);
  }
}
