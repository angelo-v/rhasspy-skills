import { AxiosInstance } from "axios";
import { WeatherConditions, WeatherService } from "../service";

export class WttrInWeatherService implements WeatherService {
  constructor(private readonly wttrInClient: AxiosInstance) {}

  async getCurrentConditions(locality: string): Promise<WeatherConditions> {
    const response = await this.wttrInClient.get(
      `${encodeURIComponent(locality)}?format=j1&lang=de`
    );
    const data = await response.data
    return {
      locality: data.nearest_area[0].areaName[0].value,
      description: data.current_condition[0].lang_de[0].value,
      temperatureInCelsius: data.current_condition[0].temp_C,
    };
  }
}
