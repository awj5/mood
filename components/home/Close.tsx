import { StyleSheet, Pressable } from "react-native";
import * as Device from "expo-device";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { EmotionType } from "app";
import { pressedDefault } from "utils/helpers";

type CloseProps = {
  setShowList: React.Dispatch<React.SetStateAction<boolean>>;
  emotion: EmotionType;
};

export default function Close(props: CloseProps) {
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={() => props.setShowList(false)}
      style={({ pressed }) => [
        pressedDefault(pressed),
        styles.container,
        { marginTop: insets.top, padding: Device.deviceType !== 1 ? 24 : 16 },
      ]}
      hitSlop={16}
    >
      <Ionicons
        name="close-circle"
        size={Device.deviceType !== 1 ? 40 : 32}
        color={props.emotion.angle >= 120 && props.emotion.angle <= 180 ? "white" : "black"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
