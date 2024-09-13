import { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Device from "expo-device";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import Animated, { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import { EmotionType } from "app";

type EmojiProps = {
  emotion: EmotionType;
};

export default function Emoji(props: EmojiProps) {
  const backgroundColor = useSharedValue("transparent");
  const size = Device.deviceType !== 1 ? 384 : 260; // Smaller on phones

  const emoji = {
    peace: require("../../assets/img/emoji/peace.svg"),
    angry: require("../../assets/img/emoji/angry.svg"),
    love: require("../../assets/img/emoji/love.svg"),
    cry: require("../../assets/img/emoji/cry.svg"),
    dead: require("../../assets/img/emoji/dead.svg"),
    sleepy: require("../../assets/img/emoji/sleepy.svg"),
    smile: require("../../assets/img/emoji/smile.svg"),
    excited: require("../../assets/img/emoji/excited.svg"),
    stars: require("../../assets/img/emoji/stars.svg"),
    sad: require("../../assets/img/emoji/sad.svg"),
    shocked: require("../../assets/img/emoji/shocked.svg"),
    grin: require("../../assets/img/emoji/grin.svg"),
  };

  useEffect(() => {
    backgroundColor.value = withTiming(props.emotion.color, { duration: 200, easing: Easing.linear });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [props.emotion]);

  return (
    <Animated.View style={[styles.container, { width: size, height: size, backgroundColor }]}>
      <Image source={emoji[props.emotion.emoji as keyof typeof emoji]} style={styles.image} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderRadius: 999,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
