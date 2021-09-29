import {RhasspyEvent, RhasspySession} from "../../../../core/src";
import {WeatherConditions, WeatherService} from "../service";
import {GetCurrentWeather} from "./handler";

describe('get current weather', () => {

    let session: RhasspySession;

    beforeEach(() => {
        session = {
            say: jest.fn(),
        };
    });

    it('returns the current weather conditions of the asked location', async () => {
        const conditions: WeatherConditions = {
            description: 'Nebel',
            temperatureInCelsius: "18",
            locality: 'Hamburg'
        }
        const weatherService: WeatherService = {
            getCurrentConditions: jest.fn().mockResolvedValue(conditions)
        }
        await new GetCurrentWeather(weatherService).handle({
                slots: [
                    {
                        value: { value: "hamburg" },
                        slotName: "locality",
                    },
                ],
            } as unknown as RhasspyEvent,
            session);
        expect(weatherService.getCurrentConditions).toHaveBeenCalledWith('hamburg');
        expect(session.say).toHaveBeenCalledWith('In Hamburg sind es aktuell 18 Grad. Es ist Nebel.')
    });

    describe("fails", () => {
        it("when no locality slot is given", async () => {
            const event = {
                slots:  [],
            } as unknown as RhasspyEvent;
            const session = {
                say: jest.fn(),
            };
            await new GetCurrentWeather(
                {} as WeatherService
            ).handle(
                event,
                session
            );
            expect(session.say).toHaveBeenCalledWith(
                "Ich habe nicht verstanden, um welchen Ort es geht."
            );
        });
    });
});