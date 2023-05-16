import { Handler, RhasspyEvent, RhasspySession } from "../../../core/src";
import { randomAnswer } from "./randomAnswer";

export class StaticAnswerHandler implements Handler {
  async handle(event: RhasspyEvent, session: RhasspySession) {
    const possibleAnswers = event.slots?.map((it) => it.value.value.toString());
    if (possibleAnswers?.length === 1) {
      session.say(possibleAnswers[0], event.siteId);
    } else if (event.slots?.length > 1) {
      session.say(randomAnswer(possibleAnswers), event.siteId);
    } else {
      session.say("Das weiß ich leider nicht", event.siteId);
    }
  }
}
