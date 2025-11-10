import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import HomeScreen from "./Screens/HomeScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
  },
});
