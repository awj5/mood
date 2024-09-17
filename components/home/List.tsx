import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import * as Device from "expo-device";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { EmotionType } from "app";
import { pressedDefault } from "utils/helpers";

type ItemProps = {
  text: string;
  num: number;
  angle: number;
};

function Item(props: ItemProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const [selected, setSelected] = useState(false);

  const select = () => {
    scale.value = withTiming(selected ? 0 : 1, {
      duration: selected ? 200 : 300,
      easing: selected ? Easing.inOut(Easing.cubic) : Easing.elastic(2),
    });

    setSelected(!selected);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    opacity.value = withDelay(
      1000 + 100 * props.num,
      withTiming(1, { duration: 700, easing: Easing.in(Easing.cubic) })
    );
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <Pressable
        onPressOut={select}
        style={({ pressed }) => [pressedDefault(pressed), styles.item, { gap: Device.deviceType !== 1 ? 16 : 12 }]}
        hitSlop={8}
      >
        <View
          style={[
            styles.checkmark,
            {
              borderWidth: Device.deviceType !== 1 ? 2 : 1.5,
              padding: Device.deviceType !== 1 ? 4 : 2,
              borderColor: props.angle >= 120 && props.angle <= 180 ? "white" : "black",
            },
          ]}
        >
          <Animated.View style={[animatedStyles, styles.check]}>
            <Ionicons
              name="checkmark"
              size={Device.deviceType !== 1 ? 32 : 24}
              color={props.angle >= 120 && props.angle <= 180 ? "white" : "black"}
            />
          </Animated.View>
        </View>

        <Text
          style={[
            styles.text,
            {
              fontSize: Device.deviceType !== 1 ? 48 : 36,
              color: props.angle >= 120 && props.angle <= 180 ? "white" : "black",
            },
          ]}
        >
          {props.text}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

type ListProps = {
  emotion: EmotionType;
};

export default function List(props: ListProps) {
  const size = Device.deviceType !== 1 ? 448 : 304; // Smaller on phones

  return (
    <View style={[styles.container, { maxWidth: size, gap: Device.deviceType !== 1 ? 32 : 24 }]}>
      {props.emotion.words.map((item, index) => (
        <Item key={index} text={item} num={index} angle={props.emotion.angle} />
      ))}

      <StatusBar style={props.emotion.angle >= 120 && props.emotion.angle <= 180 ? "light" : "dark"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkmark: {
    borderRadius: 999,
  },
  check: {
    transformOrigin: "bottom left",
  },
  text: {
    fontFamily: "Circular-Medium",
  },
});
