import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { theme } from "utils/helpers";

export default function Home() {
  const colors = theme();

  return (
    <View style={styles.container}>
      <Link href="/check-in" style={{ color: colors.primary }}>
        Check-in
      </Link>
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
