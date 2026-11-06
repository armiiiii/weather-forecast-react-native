import { useForecast } from "@/hooks/useForecast";
import { getCoords } from "@/location";
import { getWeatherByCoords } from "@/weather";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  const state = useForecast("Челябинск");

  useEffect(() => {
    getCoords()
    .then((value) => {
      getWeatherByCoords(value)
      .then(console.log)
    })
  }, [])

  switch (state.status) {
    case "loading":
      return <Text>Loading...</Text>;
    case "notFound":
      return <Text>City wasn't found</Text>;
    case "error":
      return <Text>{state.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{state.data.list[0].main.temp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
