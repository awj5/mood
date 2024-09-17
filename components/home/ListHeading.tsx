import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import * as Device from "expo-device";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { Easing, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

type ListHeadingProps = {
  width: number;
  height: number;
  angle: number;
};

export default function ListHeading(props: ListHeadingProps) {
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    opacity.value = withDelay(500, withTiming(1, { duration: 500, easing: Easing.in(Easing.cubic) }));
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        props.width > props.height ? styles.landscape : styles.portrait,
        {
          opacity,
          paddingTop: insets.top,
        },
        props.width > props.height
          ? { paddingRight: Device.deviceType !== 1 ? 192 : 130, paddingBottom: insets.bottom }
          : { paddingBottom: Device.deviceType !== 1 ? 192 : 130 },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            color: props.angle >= 120 && props.angle <= 180 ? "white" : "black",
            fontSize: Device.deviceType !== 1 ? (props.width > props.height ? 30 : 36) : 24,
          },
        ]}
      >
        Choose words that{"\n"}describe your mood
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    justifyContent: "center",
    zIndex: 1,
  },
  portrait: {
    height: "50%",
  },
  landscape: {
    height: "100%",
    width: "50%",
    left: 0,
  },
  text: {
    fontFamily: "Circular-Bold",
    textAlign: "center",
  },
});
