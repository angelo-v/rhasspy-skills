import {Handler, RhasspyEvent, RhasspySession} from "../../../../core/src";
import {WeatherService} from "../service";

export class GetCurrentWeather implements Handler {

    constructor(private readonly weatherService: WeatherService) {
    }

    async handle(event: RhasspyEvent, session: RhasspySession) {
        const slot = event.slots.find(it => it.slotName === 'locality');
        if (!slot) {
            return session.say(
                "Ich habe nicht verstanden, um welchen Ort es geht."
            );
        }
        const locality = slot.value.value;
        const result = await this.weatherService.getCurrentConditions(locality.toString());
        return session.say(`In ${result.locality} sind es aktuell ${result.temperatureInCelsius} Grad. Es ist ${result.description}.`);
    }
}
