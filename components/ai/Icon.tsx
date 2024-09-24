import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import * as Device from "expo-device";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, Easing } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { theme } from "utils/helpers";

type IconProps = {
  thinking: boolean;
};

export default function Icon(props: IconProps) {
  const colors = theme();
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 360}deg` }],
  }));

  useEffect(() => {
    rotation.value = props.thinking ? withRepeat(withTiming(1, { duration: 700, easing: Easing.linear }), -1) : 0;
  }, [props.thinking]);

  return (
    <View style={{ width: Device.deviceType !== 1 ? 52 : 40, height: Device.deviceType !== 1 ? 52 : 40 }}>
      <Animated.View style={animatedStyles}>
        <Image source={require("../../assets/img/wheel.png")} style={styles.image} />
      </Animated.View>

      {Device.deviceType !== 1 ? (
        <Svg width="52" height="52" viewBox="0 0 52 52" fill={colors.primary} style={styles.eyes}>
          <Path d="M17.2 26.5C16.35 26.5 15.6166 26.1333 15 25.4C14.3833 24.65 14.075 23.7667 14.075 22.75C14.075 21.7167 14.3833 20.8333 15 20.1C15.6166 19.3667 16.35 19 17.2 19C18.05 19 18.7833 19.3667 19.4 20.1C20.0166 20.8333 20.325 21.7167 20.325 22.75C20.325 23.7667 20.0166 24.65 19.4 25.4C18.7833 26.1333 18.05 26.5 17.2 26.5ZM34.8 26.5C33.95 26.5 33.2166 26.1333 32.6 25.4C31.9833 24.65 31.675 23.7667 31.675 22.75C31.675 21.7167 31.9833 20.8333 32.6 20.1C33.2166 19.3667 33.95 19 34.8 19C35.65 19 36.3833 19.3667 37 20.1C37.6166 20.8333 37.925 21.7167 37.925 22.75C37.925 23.7667 37.6166 24.65 37 25.4C36.3833 26.1333 35.65 26.5 34.8 26.5Z" />
        </Svg>
      ) : (
        <Svg width="40" height="40" viewBox="0 0 40 40" fill={colors.primary} style={styles.eyes}>
          <Path d="M13.2308 20.3847C12.5769 20.3847 12.0128 20.1027 11.5384 19.5386C11.0641 18.9616 10.8269 18.2821 10.8269 17.5001C10.8269 16.7052 11.0641 16.0257 11.5384 15.4616C12.0128 14.8975 12.5769 14.6155 13.2308 14.6155C13.8846 14.6155 14.4487 14.8975 14.9231 15.4616C15.3974 16.0257 15.6346 16.7052 15.6346 17.5001C15.6346 18.2821 15.3974 18.9616 14.9231 19.5386C14.4487 20.1027 13.8846 20.3847 13.2308 20.3847ZM26.7692 20.3847C26.1154 20.3847 25.5513 20.1027 25.0769 19.5386C24.6025 18.9616 24.3654 18.2821 24.3654 17.5001C24.3654 16.7052 24.6025 16.0257 25.0769 15.4616C25.5513 14.8975 26.1154 14.6155 26.7692 14.6155C27.4231 14.6155 27.9872 14.8975 28.4615 15.4616C28.9359 16.0257 29.1731 16.7052 29.1731 17.5001C29.1731 18.2821 28.9359 18.9616 28.4615 19.5386C27.9872 20.1027 27.4231 20.3847 26.7692 20.3847Z" />
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
  eyes: {
    position: "absolute",
  },
});
