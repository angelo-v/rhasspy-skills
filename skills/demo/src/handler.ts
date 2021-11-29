import {Handler, RhasspyEvent, RhasspySession} from "../../../core/src";

export class DemoHandler implements Handler {
    async handle(event: RhasspyEvent, session: RhasspySession) {
        console.log(event);
        session.say(event.rawInput);
    }
}