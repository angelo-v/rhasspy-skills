import { Handler, RhasspyEvent, RhasspySession } from "../../../core/src";
import { announceTime } from "./announceTime";
import { announceWorldTime } from "./announceWorldTime";
import { nowIn } from "./nowIn";
import { nowLocal } from "./nowLocal";

export class GetCurrentTime implements Handler {
  async handle(event: RhasspyEvent, session: RhasspySession) {
    let text;
    if (event.intent.intentName == "GetTime") {
      text = announceTime(nowLocal());
    } else {
      const timezoneSlot = event.slots.filter(
        (it) => it.slotName == "timezone"
      )[0];
      text = announceWorldTime(
        timezoneSlot.rawValue,
        nowLocal(),
        nowIn(timezoneSlot.value.value.toString())
      );
    }
    return session.say(text, event.siteId);
  }
}
