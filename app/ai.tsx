import { View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function AI() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "", headerBackTitle: "Back" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
