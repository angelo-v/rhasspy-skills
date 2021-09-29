import axios, {AxiosInstance} from "axios";
import {Handler} from "../../../core/src";
import {GetCurrentWeather} from "./get-current-weather/handler";
import {WttrInWeatherService} from "./wttr.in/WttrInWeatherService";


const wttrInClient: AxiosInstance = axios.create({
    baseURL: 'https://wttr.in',
});

export const createGetCurrentWeatherHandler = (): Handler => {
    const weatherService = new WttrInWeatherService(wttrInClient);
    return new GetCurrentWeather(weatherService);
};
