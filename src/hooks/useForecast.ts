import { RequestState } from "@/utils";
import { ForecastQuery, OwmForecastResponse, getWeather } from "@/weather";
import { useEffect, useState } from "react";
  
type State = RequestState<OwmForecastResponse>

export function useForecast(query: ForecastQuery | null): State {
  const [state, setState] = useState<State>({status: "loading"})

  const key = query ? JSON.stringify(query) : null;

  useEffect(() => {
    if (!query) return

    let cancelled = false
    
    getWeather(query)
    .then((response) => {
      if (cancelled) return
      if (response === null) { 
        setState({ status: 'notFound' })
        return
      }
      setState({status: 'success', data: response})
    })
    .catch((e) => { 
      if (cancelled) return  
      setState({status: 'error', message: e.message})
    })

    return () => { cancelled = true }
  }, [key])

  return state
}