import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import HorizontalLine from "./reports/HorizontalLine";
import CustomButtonTab from "./reports/CustomButtonTab";
import ReportPrevMonthComponent from "./reports/ReportPrevMonthComponent ";
import ReportThisMonthComponent from "./reports/ReportThisMonthComponent";

const ReportComponent = ({
  incomeTransactions,
  expenseTransactions,
  setExpenseTransactions,
  setIncomeTransactions,
  budgetEntries,
  setBudgetEntries
}) => {


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

      {selectedButton === "Prev Month" && 
        <ReportPrevMonthComponent 
          incomeTransactions={incomeTransactions}
          expenseTransactions={expenseTransactions}
          budgetEntries={budgetEntries}
        />}
      {selectedButton === "This Month" &&
       <ReportThisMonthComponent 
          incomeTransactions={incomeTransactions}
          expenseTransactions={expenseTransactions}
          setExpenseTransactions={setExpenseTransactions}
          setIncomeTransactions={setIncomeTransactions}
          budgetEntries={budgetEntries}
          setBudgetEntries={setBudgetEntries}
       />}
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
