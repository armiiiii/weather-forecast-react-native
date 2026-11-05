import { getWeatherByCity, OwmForecastResponse } from "@/weather";
import { useEffect, useState } from "react";

type RequestState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "notFound" }
  | { status: "error"; message: string };

type State = RequestState<OwmForecastResponse>

export function useForecast(city: string): State {
  const [state, setState] = useState<State>({status: "loading"})

  useEffect(() => {
    let cancelled = false

    getWeatherByCity(city)

    .then((response) => {
      if (cancelled) return
      if (response === null) { 
        setState({ status: 'notFound' })
        return
      }
      setState({status: 'success', data: response})
    })
    
    .catch((e) => setState({status: 'error', message: e.message}))

    return () => { cancelled = true }
  }, [city])

  return state
}