import {RhasspyEvent, RhasspySession} from "../../../core/src";
import {StaticAnswerHandler} from "./handler";

import {randomAnswer} from "./randomAnswer";

jest.mock('./randomAnswer');

describe('handler', () => {
    let session: RhasspySession;

    beforeEach(() => {
        session = {
            say: jest.fn(),
        };
    });

    it('responds when it does not have any slots', async () => {
        const handler = new StaticAnswerHandler()
        await handler.handle({
        } as unknown as RhasspyEvent, session)
        expect(session.say).toHaveBeenCalledWith(
            expect.stringMatching("Das weiß ich leider nicht")
        )
    });

    it('responds when slots are empty', async () => {
        const handler = new StaticAnswerHandler()
        await handler.handle({
            slots: [],
        } as unknown as RhasspyEvent, session)
        expect(session.say).toHaveBeenCalledWith(
            expect.stringMatching("Das weiß ich leider nicht")
        )
    });

    it('responds with the first and only answer', async () => {
        const handler = new StaticAnswerHandler()
        await handler.handle({
            slots: [
                {
                    entity: "answer",
                    value: { kind: "Unknown", value: "die antwort lautet 42" },
                    slotName: "answer",
                    rawValue: "",
                    confidence: 1,
                    range: { start: 8, end: 13, rawStart: 8, rawEnd: 13 },
                },
            ],
        } as unknown as RhasspyEvent, session)
        expect(session.say).toHaveBeenCalledWith(
            expect.stringMatching("die antwort lautet 42")
        )
    });

    it('picks a random answer', async () => {
        (randomAnswer as jest.Mock).mockReturnValue("zweite antwort")
        const handler = new StaticAnswerHandler()
        await handler.handle({
            slots: [
                {
                    entity: "answer",
                    value: { kind: "Unknown", value: "erste antwort" },
                    slotName: "answer",
                    rawValue: "",
                    confidence: 1,
                    range: { start: 8, end: 13, rawStart: 8, rawEnd: 13 },
                },
                {
                    entity: "answer",
                    value: { kind: "Unknown", value: "zweite antwort" },
                    slotName: "answer",
                    rawValue: "",
                    confidence: 1,
                    range: { start: 8, end: 13, rawStart: 8, rawEnd: 13 },
                },
            ],
        } as unknown as RhasspyEvent, session)
        expect(randomAnswer).toHaveBeenCalledWith(["erste antwort", "zweite antwort"])
        expect(session.say).toHaveBeenCalledWith(
            expect.stringMatching("zweite antwort")
        )
    });
});