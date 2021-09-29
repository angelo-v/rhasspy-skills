export interface WeatherConditions {
    locality: string;
    temperatureInCelsius: string;
    description: string;
}

export interface WeatherService {
    getCurrentConditions: (locality: string) => Promise<WeatherConditions>
}