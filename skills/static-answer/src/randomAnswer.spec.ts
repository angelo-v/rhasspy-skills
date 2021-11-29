import {randomAnswer} from "./randomAnswer";

describe('random answer', () => {
    it('picks the first answer', () => {
        const answer = randomAnswer(["first", "second"], 0.49)
        expect(answer).toEqual("first");
    });
    it('picks the second answer', () => {
        const answer = randomAnswer(["first", "second"], 0.5)
        expect(answer).toEqual("second");
    });
});