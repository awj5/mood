import { StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";

export default function Wheel() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;
  const wheelSize = windowWidth - 64;
  const rotation = useSharedValue(0);
  const previousRotation = useSharedValue(0); // Store the previous rotation
  const startAngle = useSharedValue(0); // Track the starting angle of the gesture

  const pan = Gesture.Pan()
    .onBegin((e) => {
      const deltaX = e.absoluteX - centerX;
      const deltaY = e.absoluteY - centerY;
      startAngle.value = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert to degrees
    })
    .onUpdate((e) => {
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

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[
          animatedStyles,
          {
            width: wheelSize,
            height: wheelSize,
            marginHorizontal: (windowWidth - wheelSize) / 2,
            marginVertical: (windowHeight - wheelSize) / 2,
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
