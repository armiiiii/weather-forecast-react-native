import { useForecast } from "@/hooks/useForecast";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  const state = useForecast("Челябинск")

  switch (state.status) {
    case 'loading': return <Text>Loading...</Text>
    case 'notFound': return <Text>City wasn't found</Text>
    case'error': return <Text>{state.message}</Text>
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
