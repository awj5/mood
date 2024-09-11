import { useEffect, useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Device from "expo-device";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";

export default function Wheel() {
  const { height, width } = useWindowDimensions();
  const rotation = useSharedValue(0);
  const previousRotation = useSharedValue(0); // Store the previous rotation
  const startAngle = useSharedValue(0); // Track the starting angle of the gesture
  const [dimensions, setDimensions] = useState({ width: width, height: height });
  const wheelSize = Device.deviceType !== 1 ? 512 : 304; // Smaller on phones
  const initWidth = width;
  const initHeight = height;
  const initOrientation = width > height ? "landscape" : "portrait";

  const pan = Gesture.Pan()
    .onBegin((e) => {
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const deltaX = e.absoluteX - centerX;
      const deltaY = e.absoluteY - centerY;
      startAngle.value = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert to degrees
    })
    .onUpdate((e) => {
      const centerX = dimensions.width / 2;
      const centerY = dimensions.height / 2;
      const deltaX = e.absoluteX - centerX;
      const deltaY = e.absoluteY - centerY;
      const currentAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert to degrees
      rotation.value = previousRotation.value + (currentAngle - startAngle.value); // Update the rotation based on the difference between the starting angle and current angle
    })
    .onEnd(() => {
      previousRotation.value = rotation.value;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  useEffect(() => {
    ScreenOrientation.addOrientationChangeListener((e) => {
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
  }, []);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          animatedStyles,
          {
            width: wheelSize,
            height: wheelSize,
          },
        ]}
        hitSlop={32}
      >
        <Image source={require("../assets/img/wheel.png")} style={styles.image} />
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
