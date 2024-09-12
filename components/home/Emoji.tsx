import { View, StyleSheet } from "react-native";
import * as Device from "expo-device";
import { Image } from "expo-image";

type EmojiProps = {
  color: string;
};

export default function Emoji(props: EmojiProps) {
  const size = Device.deviceType !== 1 ? 384 : 260; // Smaller on phones

  const emoji = {
    white: require("../../assets/img/emoji/white.svg"),
    red: require("../../assets/img/emoji/red.svg"),
    magenta: require("../../assets/img/emoji/magenta.svg"),
    blue: require("../../assets/img/emoji/blue.svg"),
    black: require("../../assets/img/emoji/black.svg"),
    cyan: require("../../assets/img/emoji/cyan.svg"),
    lime: require("../../assets/img/emoji/lime.svg"),
    yellow: require("../../assets/img/emoji/yellow.svg"),
  };

  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor: props.color }]}>
      <Image source={emoji[props.color as keyof typeof emoji]} style={styles.image} />
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
