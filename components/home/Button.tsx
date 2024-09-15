import { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Device from "expo-device";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { Easing, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import useDeviceDimensions from "utils/useDeviceDimensions";
import { theme } from "utils/helpers";

export default function Button() {
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const colors = theme();
  const device = useDeviceDimensions();

  useEffect(() => {
    opacity.value = withDelay(2000, withTiming(1, { duration: 300, easing: Easing.in(Easing.cubic) }));
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        device.width > device.height ? styles.landscape : styles.portrait,
        {
          opacity,
          paddingBottom: insets.bottom,
        },
        device.width > device.height
          ? { paddingLeft: Device.deviceType !== 1 ? 224 : 152, paddingTop: insets.top }
          : { paddingTop: Device.deviceType !== 1 ? 224 : 152 },
      ]}
    >
      <Ionicons name="arrow-forward-circle-outline" size={Device.deviceType !== 1 ? 96 : 72} color={colors.primary} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
  },
  portrait: {
    height: "50%",
  },
  landscape: {
    height: "100%",
    width: "50%",
    right: 0,
    alignItems: "center",
  },
});
