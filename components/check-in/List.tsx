import { useEffect } from "react";
import { Pressable, StyleSheet, View, Text } from "react-native";
import * as Device from "expo-device";
import { StatusBar } from "expo-status-bar";
import { Check } from "lucide-react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { EmotionType } from "app/check-in";

type ItemProps = {
  text: string;
  num: number;
  angle: number;
  words: number[];
  setWords: React.Dispatch<React.SetStateAction<number[]>>;
};

function Item(props: ItemProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  const select = () => {
    const index = props.words.indexOf(props.num);
    const selected = index !== -1 ? true : false;

    scale.value = withTiming(selected ? 0 : 1, {
      duration: selected ? 200 : 300,
      easing: selected ? Easing.inOut(Easing.cubic) : Easing.elastic(2),
    });

    // Add/remove from words array
    if (selected) {
      // Remove
      const words = [...props.words];
      words.splice(index, 1);
      props.setWords(words);
    } else {
      // Add
      props.setWords([...props.words, props.num]);
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    opacity.value = withDelay(
      1000 + 100 * props.num,
      withTiming(1, { duration: 500, easing: Easing.in(Easing.cubic) })
    );
  }, []);

  return (
    <Animated.View style={{ opacity }}>
      <Pressable onPressOut={select} style={[styles.item, { gap: Device.deviceType !== 1 ? 16 : 12 }]} hitSlop={8}>
        <View
          style={[
            styles.checkmark,
            {
              padding: Device.deviceType !== 1 ? 4 : 2,
              borderColor: props.angle >= 120 && props.angle <= 180 ? "white" : "black",
            },
          ]}
        >
          <Animated.View style={[animatedStyles, styles.check]}>
            <Check
              color={props.angle >= 120 && props.angle <= 180 ? "white" : "black"}
              size={Device.deviceType !== 1 ? 32 : 24}
              absoluteStrokeWidth
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
  setWords: React.Dispatch<React.SetStateAction<number[]>>;
  words: number[];
};

export default function List(props: ListProps) {
  useEffect(() => {
    props.setWords([]);
  }, []);

  return (
    <View
      style={[
        styles.container,
        { maxWidth: Device.deviceType !== 1 ? 448 : 304, gap: Device.deviceType !== 1 ? 32 : 24 },
      ]}
    >
      {props.emotion.words.map((item, index) => (
        <Item
          key={index}
          text={item}
          num={index}
          angle={props.emotion.angle}
          words={props.words}
          setWords={props.setWords}
        />
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
    borderWidth: 2,
  },
  check: {
    transformOrigin: "bottom left",
  },
  text: {
    fontFamily: "Circular-Medium",
  },
});
