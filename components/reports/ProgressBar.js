import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import * as Progress from "react-native-progress";

const ProgressBar = ({newValue}) => {
  const [value, setValue] = useState(0);

  // Update the progress value whenever `newValue` changes
  useEffect(() => {
    setValue((prevValue) => {
      const updatedValue = prevValue + newValue;

      // Ensure the value stays within the 0-1 range
      return Math.max(0, Math.min(updatedValue, 1));
    });
  }, [newValue]);

  return (
    <View style={styles.container}>
      <Progress.Bar progress={value} width="300" color="grey"  />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
