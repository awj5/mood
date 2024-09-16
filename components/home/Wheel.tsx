import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
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
import useDeviceDimensions from "utils/useDeviceDimensions";

type WheelProps = {
  setAngle: React.Dispatch<React.SetStateAction<number>>;
};

export default function Wheel(props: WheelProps) {
  const dimensions = useDeviceDimensions();
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(-360);
  const previousRotation = useSharedValue(0); // Store the previous rotation
  const startAngle = useSharedValue(0); // Track the starting angle of the gesture
  const size = Device.deviceType !== 1 ? 448 : 304; // Smaller on phones

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
