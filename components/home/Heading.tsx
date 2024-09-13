import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import * as Device from "expo-device";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { Easing, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import useDeviceDimensions from "utils/useDeviceDimensions";
import { theme } from "utils/helpers";

export default function Heading() {
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const colors = theme();
  const device = useDeviceDimensions();

  useEffect(() => {
    opacity.value = withDelay(1500, withTiming(1, { duration: 500, easing: Easing.in(Easing.cubic) }));
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        device.width > device.height ? styles.landscape : styles.portrait,
        {
          opacity,
          paddingTop: insets.top,
        },
        device.width > device.height
          ? { paddingRight: Device.deviceType !== 1 ? 224 : 152, paddingBottom: insets.bottom }
          : { paddingBottom: Device.deviceType !== 1 ? 224 : 152 },
      ]}
    >
      <Text
        style={[
          styles.text,
          { color: colors.primary, fontSize: Device.deviceType !== 1 ? (device.width > device.height ? 36 : 48) : 30 },
        ]}
      >
        How are{device.width > device.height ? "\n" : " "}you feeling?
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    justifyContent: "center",
  },
  portrait: {
    height: "50%",
  },
  landscape: {
    height: "100%",
    width: "50%",
    left: 0,
    alignItems: "center",
  },
  text: {
    fontFamily: "Circular-Medium",
    textAlign: "center",
  },
});
