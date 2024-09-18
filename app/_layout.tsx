import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Device from "expo-device";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { theme } from "../utils/helpers";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const colors = theme();

  const [fontsLoaded, fontError] = useFonts({
    "Circular-Black": require("../assets/fonts/lineto-circular-black.ttf"),
    "Circular-Bold": require("../assets/fonts/lineto-circular-bold.ttf"),
    "Circular-Book": require("../assets/fonts/lineto-circular-book.ttf"),
    "Circular-Medium": require("../assets/fonts/lineto-circular-medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null; // Show splash until fonts ready

  const changeScreenOrientation = async () => {
    await ScreenOrientation.unlockAsync();
  };

  if (Device.deviceType === 2) changeScreenOrientation(); // Allow landscape on tablets

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          contentStyle: {
            backgroundColor: colors.primaryBg,
          },
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.primaryBg,
          },
          headerTintColor: colors.primary,
        }}
      />
    </GestureHandlerRootView>
  );
}
