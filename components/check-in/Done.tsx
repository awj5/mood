import { useContext, useEffect } from "react";
import { StyleSheet, Pressable, Text } from "react-native";
import * as Device from "expo-device";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { Easing, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { DimensionsContext, DimensionsContextType } from "context/dimensions";
import { pressedDefault } from "utils/helpers";

type DoneProps = {
  angle: number;
  words: number[];
};

export default function Done(props: DoneProps) {
  const opacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { dimensions } = useContext<DimensionsContextType>(DimensionsContext);

  useEffect(() => {
    if (props.words.length) {
      opacity.value = withTiming(1, { duration: 300, easing: Easing.in(Easing.cubic) });
    } else {
      opacity.value = withDelay(
        !opacity.value ? 2000 : 0,
        withTiming(0.25, { duration: 300, easing: Easing.in(Easing.cubic) })
      );
    }
  }, [props.words]);

  return (
    <Animated.View
      style={[
        styles.container,
        dimensions.width > dimensions.height ? styles.landscape : styles.portrait,
        {
          opacity,
          paddingBottom: insets.bottom,
        },
        dimensions.width > dimensions.height
          ? { paddingLeft: Device.deviceType !== 1 ? 224 : 152, paddingTop: insets.top }
          : { paddingTop: Device.deviceType !== 1 ? 224 : 152 },
      ]}
    >
      <Pressable
        onPress={() => router.push("chat")}
        style={({ pressed }) => [
          pressedDefault(pressed),
          styles.button,
          {
            borderColor: props.angle >= 120 && props.angle <= 180 ? "white" : "black",
            paddingHorizontal: Device.deviceType !== 1 ? 24 : 20,
            paddingVertical: Device.deviceType !== 1 ? 8 : 6,
          },
        ]}
        hitSlop={16}
        disabled={props.words.length ? false : true}
      >
        <Text
          style={[
            styles.text,
            {
              color: props.angle >= 120 && props.angle <= 180 ? "white" : "black",
              fontSize: Device.deviceType !== 1 ? 36 : 30,
              lineHeight: Device.deviceType !== 1 ? 44 : 38,
            },
          ]}
        >
          Done
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
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
  button: {
    borderRadius: 999,
    borderWidth: 2,
  },
  text: {
    fontFamily: "Circular-Book",
  },
});
