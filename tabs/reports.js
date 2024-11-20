import React from "react";
import { StyleSheet, View, Text } from "react-native";
import ReportComponent from "../components/ReportComponent";

const ReportsTab = () => {
  return (
    <View style={styles.container}>
      <ReportComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 24,
    fontStyle: "bold",
  },
});

export default ReportsTab;
