import Hero from "@/components/Hero/Hero";
import { useCoords } from "@/hooks/useCoords";
import { useForecast } from "@/hooks/useForecast";
import { ForecastQuery } from "@/weather";
import { StyleSheet, Text, View } from "react-native";

const DEFAULT_CITY = 'Челябинск'

export default function Index() {
  let query: ForecastQuery | null;
  const coords = useCoords()

  switch (coords.status) {
    case "loading": 
      query = null
      break
    case "notFound":
    case "error":
      query = { type: 'city', city: DEFAULT_CITY }
      break
    case "success":
      query = { type: 'coords', coords: coords.data }
  }

  const state = useForecast(query)

  switch (state.status) {
    case "loading": return <Text>Loading...</Text>;
    case "notFound": return <Text>City wasn't found</Text>;
    case "error": return <Text>{state.message}</Text>;
  }

  return (
    <Hero data={state.data} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
