import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import * as Device from "expo-device";
import { CircleArrowUp } from "lucide-react-native";
import { pressedDefault, theme } from "utils/helpers";

export default function Input() {
  const colors = theme();
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);

  const send = () => {
    Keyboard.dismiss();
    setText("");
  };

  return (
    <View
      style={[styles.container, { padding: Device.deviceType !== 1 ? 24 : 16, gap: Device.deviceType !== 1 ? 12 : 8 }]}
    >
      <TextInput
        onChangeText={setText}
        value={text}
        placeholder="Message"
        placeholderTextColor={colors.secondary}
        style={[
          styles.input,
          {
            borderColor: focused ? colors.primary : colors.secondary,
            color: colors.primary,
            paddingHorizontal: Device.deviceType !== 1 ? 20 : 16,
            fontSize: Device.deviceType !== 1 ? 24 : 18,
            height: Device.deviceType !== 1 ? 54 : 42,
          },
        ]}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoCapitalize="none"
        onSubmitEditing={() => setText("")}
      />

      <Pressable
        onPress={send}
        style={({ pressed }) => pressedDefault(pressed)}
        hitSlop={8}
        disabled={focused ? false : true}
      >
        <CircleArrowUp
          color={focused ? colors.primary : colors.secondary}
          size={Device.deviceType !== 1 ? 64 : 48}
          absoluteStrokeWidth
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderRadius: 999,
    flex: 1,
    fontFamily: "Circular-Book",
    borderWidth: 2,
  },
});
