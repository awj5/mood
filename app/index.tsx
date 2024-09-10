import { View, StyleSheet } from "react-native";
import Wheel from "../components/Wheel";

export default function Home() {
  return (
    <View style={styles.container}>
      <Wheel />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
