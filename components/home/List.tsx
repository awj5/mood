import { useEffect } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import * as Device from "expo-device";
import Animated, { Easing, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { EmotionType } from "app";

type ItemProps = {
  text: string;
  num: number;
};

function Item(props: ItemProps) {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      1000 + 100 * props.num,
      withTiming(1, { duration: 700, easing: Easing.in(Easing.cubic) })
    );
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <Pressable>
        <Text style={[styles.text, { fontSize: Device.deviceType !== 1 ? 48 : 36 }]}>{props.text}</Text>
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
    <View style={[styles.container, { width: size }]}>
      {props.emotion.words.map((item, index) => (
        <Item key={index} text={item} num={index} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 1,
  },
  text: {
    fontFamily: "Circular-Medium",
  },
});
