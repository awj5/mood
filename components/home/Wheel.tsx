import { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Device from "expo-device";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
  runOnJS,
} from "react-native-reanimated";

type WheelProps = {
  setAngle: React.Dispatch<React.SetStateAction<number>>;
};

export default function Wheel(props: WheelProps) {
  const { height, width } = useWindowDimensions();
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(-360);
  const previousRotation = useSharedValue(0); // Store the previous rotation
  const startAngle = useSharedValue(0); // Track the starting angle of the gesture
  const [dimensions, setDimensions] = useState({ width: width, height: height });
  const size = Device.deviceType !== 1 ? 448 : 304; // Smaller on phones
  const initWidth = width;
  const initHeight = height;
  const initOrientation = width > height ? "landscape" : "portrait";

  const pan = Gesture.Pan()
    .onBegin((e) => {
      const deltaX = e.absoluteX - dimensions.width / 2;
      const deltaY = e.absoluteY - dimensions.height / 2;
      startAngle.value = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert to degrees
    })
    .onUpdate((e) => {
      const deltaX = e.absoluteX - dimensions.width / 2;
      const deltaY = e.absoluteY - dimensions.height / 2;
      const currentAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert to degrees
      var newRotation = previousRotation.value + (currentAngle - startAngle.value); // Update the rotation based on the difference between the starting angle and current angle

      // Normalize rotation to be within 0-360 degrees
      if (newRotation < 0) {
        newRotation += 360;
      } else if (newRotation >= 360) {
        newRotation %= 360;
      }

      rotation.value = newRotation;
      runOnJS(props.setAngle)(newRotation);
    })
    .onEnd(() => {
      previousRotation.value = rotation.value;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    // Animate in
    rotation.value = withDelay(500, withTiming(0, { duration: 1000, easing: Easing.out(Easing.cubic) }));
    opacity.value = withDelay(500, withTiming(1, { duration: 1000, easing: Easing.in(Easing.cubic) }));

    const subscription = ScreenOrientation.addOrientationChangeListener((e) => {
      // Reset wheel
      rotation.value = 0;
      previousRotation.value = 0;
      startAngle.value = 0;
      props.setAngle(0);

      // Hack! - useWindowDimensions doesn't return correct dimensions when rotating iPad so use initial values instead
      if (
        (initOrientation === "portrait" && e.orientationInfo.orientation === 3) ||
        (initOrientation === "portrait" && e.orientationInfo.orientation === 4) ||
        (initOrientation === "landscape" && e.orientationInfo.orientation !== 3 && e.orientationInfo.orientation !== 4)
      ) {
        setDimensions({ width: initHeight, height: initWidth });
      } else {
        setDimensions({ width: initWidth, height: initHeight });
      }
    });

    return () => ScreenOrientation.removeOrientationChangeListener(subscription); // Clean up
  }, []);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          animatedStyles,
          {
            width: size,
            height: size,
          },
        ]}
        hitSlop={32}
      >
        <Image source={require("../../assets/img/wheel.png")} style={styles.image} />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
