import { Coords, getCoords } from "@/location";
import { RequestState } from "@/utils";
import { useEffect, useState } from "react";

type State = RequestState<Coords>

export function useCoords(): State {
  const [state, setState] = useState<State>({status: "loading"})

  useEffect(() => {
    let cancelled = false

    getCoords()

    .then((response) => {
      if (cancelled) return
      if (response === null) { 
        setState({ status: 'notFound' })
        return
      }
      setState({status: 'success', data: response})
    })
    
    .catch(() => setState({status: 'error', message: "Unable to locate"}))

    return () => { cancelled = true }
  }, [])

  return state
}