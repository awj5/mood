import { View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import { Image } from "expo-image";
import { EmotionType } from "app";

type EmojiProps = {
  emotion: EmotionType;
};

export default function Emoji(props: EmojiProps) {
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

  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor: props.emotion.color }]}>
      <Image source={emoji[props.emotion.emoji as keyof typeof emoji]} style={styles.image} />
    </View>
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
