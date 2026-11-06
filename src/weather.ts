import { Coords } from './location';

export type OwmCondition = {
  id: number;            // condition code (500 = light rain, 800 = clear, 80x = clouds)
  main: string;          // "Rain", "Clouds", "Clear" (always English)
  description: string;   // translated by the lang= parameter ("небольшой дождь")
  icon: string;          // "10n"
};

export type OwmMain = {
  temp: number;          // °C (units=metric)
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;      // hPa
  humidity: number;      // %
  sea_level?: number;
  grnd_level?: number;
};

export type OwmWind = {
  speed: number;         // m/s
  deg: number;
  gust?: number;
};

export type OwmPrecipitation = { "1h"?: number; "3h"?: number }; // mm

export type OwmForecastEntry = {
  dt: number;            // Unix SECONDS, start of the 3-hour slot
  dt_txt: string;        // "2026-11-05 18:00:00", in UTC, not local time!
  main: OwmMain & {
    temp_kf?: number;    // internal correction value, ignore it
    dew_point?: number;  // not in the official docs, so optional
  };
  weather: OwmCondition[];
  clouds: { all: number };          // %
  wind: OwmWind;
  visibility?: number;              // metres
  pop: number;                      // chance of rain or snow, 0..1 (0.96 = 96%)
  rain?: { "3h"?: number };         // mm over the 3 hours, only if it rains
  snow?: { "3h"?: number };
  sys: { pod: "d" | "n" };          // part of day: day / night
};

export type OwmForecastResponse = {
  cod: string;           // "200" (a STRING here, a number in /weather)
  message: number;
  cnt: number;           // number of entries (40)
  list: OwmForecastEntry[];
  city: {
    id: number;
    name: string;        // translated by lang= ("Челябинск")
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;    // UTC offset in seconds
    sunrise: number;     // Unix seconds
    sunset: number;
  };
};

export async function getWeatherByCity(city: string): Promise<OwmForecastResponse | null> {
  const record = {
    q: city,
    lang: 'ru',
    appid: process.env.EXPO_PUBLIC_API_KEY,
    units: 'metric'
  } as Record<string, string>
  const params = new URLSearchParams(record)

  const url = `https://api.openweathermap.org/data/2.5/forecast?${params}`

  const response = await fetch(url)

  if (response.status === 404) {
    // OK to response with null if nothing was found
    return null 
  }

  if (!response.ok) {
    throw new Error("Server didn't respond correctly or didn't respond at all.")
  }
  
  return await response.json() as OwmForecastResponse
}

export async function getWeatherByCoords(coords: Coords): Promise<OwmForecastResponse | null> {
  const record = {
    lat: coords.latitude,
    lon: coords.longitude,
    lang: 'ru',
    appid: process.env.EXPO_PUBLIC_API_KEY,
    units: 'metric'
  } as Record<string, any>

  const params = new URLSearchParams(record)

  const url = `https://api.openweathermap.org/data/2.5/forecast?${params}`

  const response = await fetch(url)

  if (response.status === 404) {
    // OK to response with null if nothing was found
    return null 
  }

  if (!response.ok) {
    throw new Error("Server didn't respond correctly or didn't respond at all.")
  }
  
  return await response.json() as OwmForecastResponse
}

export type ForecastQuery =
  | { type: "city"; city: string }
  | { type: "coords"; coords: Coords };

export async function getWeather(query: ForecastQuery) {
  if (query.type === 'city') return await getWeatherByCity(query.city)
  return await getWeatherByCoords(query.coords)
}