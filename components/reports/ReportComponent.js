import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import HorizontalLine from "./HorizontalLine";
import CustomButtonTab from "./CustomButtonTab";
import ReportPrevMonthComponent from "./ReportPrevMonthComponent ";
import ReportThisMonthComponent from "./ReportThisMonthComponent";

const ReportComponent = () => {
  const [selectedButton, setSelectedButton] = useState("This Month");

  return (
    <View style={styles.container}>
      <View style={styles.headerTab}>
        <View
          style={{
            flexDirection: "row",
            width: "60%",
            justifyContent: "space-around",
          }}
        >
          <CustomButtonTab
            title="Prev Month"
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
          <CustomButtonTab
            title="This Month"
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        </View>
        <HorizontalLine />
      </View>

      {selectedButton === "Prev Month" && <ReportPrevMonthComponent />}
      {selectedButton === "This Month" && <ReportThisMonthComponent />}
    </View>
  );
};

export default ReportComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerTab: {
    marginTop: 10,
    marginBottom: 10,
  },
});
