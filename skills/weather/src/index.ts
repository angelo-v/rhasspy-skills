import {skill} from "../../../core/src/mqtt";
import {createGetCurrentWeatherHandler} from "./createGetCurrentWeatherHandler";


skill(['GetCurrentWeather'], createGetCurrentWeatherHandler());