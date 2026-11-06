import { Platform, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { convertTemp, today } from "@/utils";
import { OwmForecastResponse } from "@/weather";

const HERO_PHOTO =
  "https://images.unsplash.com/photo-1558418294-9da149757efe?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900";

export default function Hero({ data }: Readonly<{ data: OwmForecastResponse }>) {
  const now = data.list[0];

  return (
    <View className="h-[338px] mx-3.5 rounded-[30px]" style={styles.shadow}>
      <View className="flex-1 rounded-[30px] overflow-hidden">
        <Image
          source={{ uri: HERO_PHOTO }}
          contentFit="cover"
          contentPosition={{ left: "50%", top: "42%" }}
          style={StyleSheet.absoluteFill}
          accessible={false}
        />

        <LinearGradient
          colors={["rgba(30,87,143,0.1)", "rgba(32,63,101,0.26)", "rgba(23,43,70,0.62)"]}
          locations={[0, 0.55, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View className="absolute left-6 right-6 bottom-[26px]">
          <Text className="text-white text-xs font-semibold uppercase tracking-[0.84px] opacity-[.84]">
            {today()}
          </Text>

          <View className="flex-row items-center justify-between mt-1 -mb-0.5">
            <Text className="text-white text-[76px] leading-[76px] font-medium tracking-[-5px]">
              {convertTemp(now.main.temp, "C")}°
            </Text>
          </View>

          <Text className="text-white text-2xl font-semibold capitalize">
            {now.weather[0].description}
          </Text>

          <Text className="text-white opacity-90">
            Feels like {convertTemp(now.main.feels_like, "C")}° · H{" "}
            {convertTemp(now.main.temp_max, "C")}° / L {convertTemp(now.main.temp_min, "C")}°
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: {
      shadowColor: "rgb(43, 94, 145)",
      shadowOffset: { width: 0, height: 18 },
      shadowOpacity: 0.2,
      shadowRadius: 21,
    },
    android: { elevation: 10 },
    default: {},
  })!,
});
