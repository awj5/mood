import { StyleSheet, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from "react-native";
import { Stack } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import Response from "components/ai/Response";
import Input from "components/ai/Input";

export default function AI() {
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "", headerBackTitle: "Back" }} />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView>
          <Response />
        </ScrollView>

        <Input />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
