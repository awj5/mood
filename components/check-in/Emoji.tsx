import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Device from "expo-device";
import { Image } from "expo-image";
import * as Haptics from "expo-haptics";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { DimensionsContext, DimensionsContextType } from "context/dimensions";
import { EmotionType } from "app/check-in";
import { theme } from "utils/helpers";

type EmojiProps = {
  emotion: EmotionType;
  showList: boolean;
};

export default function Emoji(props: EmojiProps) {
  const colors = theme();
  const backgroundColor = useSharedValue("transparent");
  const opacity = useSharedValue(0);
  const borderRadius = useSharedValue(0);
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const { dimensions } = useContext<DimensionsContextType>(DimensionsContext);
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
    cool: require("../../assets/img/emoji/cool.svg"),
    grin: require("../../assets/img/emoji/grin.svg"),
  };

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
    width: width.value,
    height: height.value,
    borderRadius: borderRadius.value,
    opacity: opacity.value,
  }));

  useEffect(() => {
    backgroundColor.value = withTiming(props.emotion.color, { duration: 200, easing: Easing.linear });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, [props.emotion]);

  useEffect(() => {
    if (props.showList) {
      // Expand background
      const fullscreen = dimensions.width > dimensions.height ? dimensions.width : dimensions.height;
      width.value = withTiming(fullscreen, { duration: 500, easing: Easing.in(Easing.cubic) });
      height.value = withTiming(fullscreen, { duration: 500, easing: Easing.in(Easing.cubic) });
      borderRadius.value = withTiming(0, { duration: 500, easing: Easing.in(Easing.cubic) });
    } else {
      // Reset
      runOnJS(() => {
        width.value = size;
        height.value = size;
        borderRadius.value = 999;
      })();
    }
  }, [props.showList]);

  useEffect(() => {
    opacity.value = withDelay(1000, withTiming(1, { duration: 500, easing: Easing.in(Easing.cubic) }));
  }, []);

  return (
    <Animated.View style={[styles.container, animatedStyles, { zIndex: props.showList ? 1 : 0 }]}>
      {!props.showList && (
        <>
          <Ionicons
            name="caret-down-sharp"
            size={Device.deviceType !== 1 ? 32 : 24}
            color={colors.secondary}
            style={[styles.caret, { marginTop: Device.deviceType !== 1 ? -56 - 12 : -40 - 8 }]}
          />

          <Image source={emoji[props.emotion.emoji as keyof typeof emoji]} style={styles.image} />
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
  },
  caret: {
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
