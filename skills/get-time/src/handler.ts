import {now} from "./now";
import {Handler, RhasspyEvent, RhasspySession} from "../../../core/src";
import {announceTime} from "./announceTime";

export class GetCurrentTime implements Handler {
  async handle(event: RhasspyEvent, session: RhasspySession) {
    const text = announceTime(now());
    return session.say(text);
  }
}
