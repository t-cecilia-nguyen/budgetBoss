import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { FontAwesome } from "react-native-vector-icons";

import { Colors } from "../../assets/colors";
import ProgressBar from "./ProgressBar";
import TransactionList from "../TransactionListComponent";

const { width: screenWidth } = Dimensions.get("window");

const ReportPrevMonthComponent = ({
  incomeTransactions,
  expenseTransactions,
}) => {
  const totalIncome = incomeTransactions.reduce(
    (sum, txn) => sum + txn.Amount,
    0
  );
  const totalExpense = expenseTransactions.reduce(
    (sum, txn) => sum + txn.Amount,
    0
  );
  const budget = totalIncome - totalExpense;

  const expensePercentage = totalIncome > 0 ? totalExpense / totalIncome : 0;

 
  
  return (
    <View style={styles.container}>
      <ScrollView nestedScrollEnabled>
        <View style={styles.card}>
          <Text style={styles.cardText}>Running Budget</Text>
          <View style={styles.noteBox}>
            <View style={styles.flexBox}>
              <FontAwesome name="circle" size={15} color={Colors.lightGrey} />
              <Text>Budget</Text>
            </View>
            <View style={styles.flexBox}>
              <FontAwesome name="circle" size={15} color={Colors.green} />
              <Text>Expense</Text>
            </View>
          </View>
          <View style={styles.spacer}></View>
          <ProgressBar newValue={expensePercentage} />
          <View style={styles.amountYouCanSpend}>
            <Text style={styles.textBold}>Amount you can spend</Text>
            <Text style={ [{color: Colors.green}, styles.textBold] }>${budget}</Text>
          </View>
          <View style={styles.horizontalBox}>
            <View style={styles.totalBudget}>
              <Text style={styles.textBold}>Total Budget</Text>
              <Text style={ [{color: Colors.green}, styles.textBold] }>${totalIncome}</Text>
            </View>
            <View style={styles.totalSpent}>
              <Text style={styles.textBold}>Total Spent</Text>
              <Text style={ [{color: Colors.green}, styles.textBold] }>${totalExpense}</Text>
            </View>
            <View style={styles.dayofmonthLeft}>
              <Text style={styles.textBold}>End of Month</Text>
              <Text style={ [{color: Colors.green}, styles.textBold] }>{0} days</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardText}>Transaction History</Text>
          <ScrollView nestedScrollEnabled contentContainerStyle={{ paddingTop: 20 }}>
            <View style={styles.transactionList}>
              <TransactionList />
            </View>
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardText}>Report This Month</Text>
          <LineGraph data={{ incomeTransactions, expenseTransactions }} />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

export default ReportPrevMonthComponent;
const styles = StyleSheet.create({
  amountYouCanSpend: {
    marginTop: 20,
    alignItems: "center",
  },

  bottomSpacer: {
    height: 65,
  },
  container: {
    paddingHorizontal: 10,
  },
  card: {
    flex: 1,
    width: screenWidth - 20,
    height: 300,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    backgroundColor: "#fff",
    shadowColor: Colors.lightGrey,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardText: {
    color: Colors.primaryBlue,
    fontSize: 16,
    fontWeight: "bold",
    padding: 15,
    position: "absolute",
    top: 10,
    left: 10,
  },
  dayofmonthLeft: {
    alignItems: "center",
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horizontalBox: {
    marginTop: 20,
    width: "90%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noteBox: {
    width: "25%",
    position: "absolute",
    top: 20,
    right: 20,
  },
  totalBudget: {
    alignItems: "center",
  },
  totalSpent: {
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  textBold:{
    fontWeight:'bold'
  },
  transactionList: {
    width: "95%",
    height: 200,
    marginTop: 30,
  },
  spacer: {
    height: 50,
  },
});
