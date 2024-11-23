import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import * as Progress from "react-native-progress";

import {Colors} from "../../assets/colors";

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
      <Progress.Bar 
        progress={value} 
        width={300} 
        color={Colors.green}  
        unfilledColor={Colors.lightGrey}  
        borderWidth={0}   />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: "90%",
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
