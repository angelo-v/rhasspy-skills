import {RhasspyEvent, RhasspySession} from "../../../core/src";
import {DemoHandler} from "./handler";

describe('handler', () => {
    let session: RhasspySession;

    beforeEach(() => {
        session = {
            say: jest.fn(),
        };
    });

    it('echos the raw input', async () => {
        const handler = new DemoHandler()
        await handler.handle({
            rawInput: "hallo echo",
        } as unknown as RhasspyEvent, session)
        expect(session.say).toHaveBeenCalledWith(
            expect.stringMatching("hallo echo")
        )
    });
});