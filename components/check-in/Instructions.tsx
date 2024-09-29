import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import * as Device from "expo-device";
import Animated, { Easing, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { theme } from "utils/helpers";

export default function Instructions() {
  const opacity = useSharedValue(0);
  const colors = theme();

  useEffect(() => {
    opacity.value = withDelay(1500, withTiming(1, { duration: 300, easing: Easing.in(Easing.cubic) }));
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity, marginTop: Device.deviceType !== 1 ? 224 + 32 : 152 + 24 }]}>
      <Text style={[styles.text, { color: colors.secondary, fontSize: Device.deviceType !== 1 ? 24 : 16 }]}>
        Rotate the color wheel to{"\n"}express your current mood
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
  },
  text: {
    fontFamily: "Circular-Book",
    textAlign: "center",
  },
});
