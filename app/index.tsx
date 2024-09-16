import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import EmotionData from "data/emotions.json";
import Wheel from "components/home/Wheel";
import Emoji from "components/home/Emoji";
import Instructions from "components/home/Instructions";
import Heading from "components/home/Heading";
import Button from "components/home/Button";
import Close from "components/home/Close";

export type EmotionType = {
  angle: number;
  color: string;
  emoji: string;
};

export default function Home() {
  const [angle, setAngle] = useState(0);
  const [emotion, setEmotion] = useState<EmotionType>(EmotionData[0]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    // Snap to 1 of 12 angles (groups of 30 degrees)
    if ((angle >= 345 && angle <= 360 && emotion.angle !== 0) || (angle >= 0 && angle < 15 && emotion.angle !== 0)) {
      setEmotion(EmotionData[0]); // White
    } else if (angle >= 15 && angle < 45 && emotion.angle !== 30) {
      setEmotion(EmotionData[1]); // Red
    } else if (angle >= 45 && angle < 75 && emotion.angle !== 60) {
      setEmotion(EmotionData[2]); // Magenta red
    } else if (angle >= 75 && angle < 105 && emotion.angle !== 90) {
      setEmotion(EmotionData[3]); // Magenta
    } else if (angle >= 105 && angle < 135 && emotion.angle !== 120) {
      setEmotion(EmotionData[4]); // Blue magenta
    } else if (angle >= 135 && angle < 165 && emotion.angle !== 150) {
      setEmotion(EmotionData[5]); // Blue
    } else if (angle >= 165 && angle < 195 && emotion.angle !== 180) {
      setEmotion(EmotionData[6]); // Black
    } else if (angle >= 195 && angle < 225 && emotion.angle !== 210) {
      setEmotion(EmotionData[7]); // Cyan
    } else if (angle >= 225 && angle < 255 && emotion.angle !== 240) {
      setEmotion(EmotionData[8]); // Green cyan
    } else if (angle >= 255 && angle < 285 && emotion.angle !== 270) {
      setEmotion(EmotionData[9]); // Green
    } else if (angle >= 285 && angle < 315 && emotion.angle !== 300) {
      setEmotion(EmotionData[10]); // Yellow green
    } else if (angle >= 315 && angle < 345 && emotion.angle !== 330) {
      setEmotion(EmotionData[11]); // Yellow
    }
  }, [angle]);

  return (
    <View style={styles.container}>
      <Heading />
      <Emoji emotion={emotion} showList={showList} />
      <Instructions />
      <Button setShowList={setShowList} />
      <Wheel setAngle={setAngle} />
      {showList && <Close setShowList={setShowList} emotion={emotion} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
