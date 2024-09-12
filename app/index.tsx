import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Wheel from "components/home/Wheel";
import Emoji from "components/home/Emoji";

export default function Home() {
  const [angle, setAngle] = useState(0);
  const [color, setColor] = useState("");

  useEffect(() => {
    // Snap to 1 of 8 angles (groups of 45 degrees)
    if ((angle >= 337.5 && angle <= 360 && color !== "white") || (angle >= 0 && angle < 22.5 && color !== "white")) {
      setColor("white");
    } else if (angle >= 22.5 && angle < 67.5 && color !== "red") {
      setColor("red");
    } else if (angle >= 67.5 && angle < 112.5 && color !== "magenta") {
      setColor("magenta");
    } else if (angle >= 112.5 && angle < 157.5 && color !== "blue") {
      setColor("blue");
    } else if (angle >= 157.5 && angle < 202.5 && color !== "black") {
      setColor("black");
    } else if (angle >= 202.5 && angle < 247.5 && color !== "cyan") {
      setColor("cyan");
    } else if (angle >= 247.5 && angle < 292.5 && color !== "lime") {
      setColor("lime");
    } else if (angle >= 292.5 && angle < 337.5 && color !== "yellow") {
      setColor("yellow");
    }
  }, [angle]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{angle}</Text>
      <Emoji color={color} />
      <Wheel setAngle={setAngle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    position: "absolute",
    top: 128,
  },
});
