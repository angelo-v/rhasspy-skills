import {Handler, RhasspyEvent, RhasspySession} from "../../../core/src";
import {skill} from "../../../core/src/mqtt";

export class DemoHandler implements Handler {
    async handle(event: RhasspyEvent, session: RhasspySession) {
        console.log(event);
        session.say(event.rawInput);
    }
}

skill(['Demo'], new DemoHandler())