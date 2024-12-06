import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import HorizontalLine from "./reports/HorizontalLine";
import CustomButtonTab from "./reports/CustomButtonTab";
import ReportPrevMonthComponent from "./reports/ReportPrevMonthComponent ";
import ReportThisMonthComponent from "./reports/ReportThisMonthComponent";
import { UserContext } from "../context/userContext";
import { useContext, useEffect } from "react";
import {  useTransactions } from "../navigations/bottomTabs";
import { BudgetContext } from "../context/budgetContext";

const ReportComponent = ({ budgets, setBudgetChanged }) => {

  const { user } = useContext(UserContext); // Access user context
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const { transactionsChanged, setTransactionsChanged } = useTransactions();
  
  useEffect(() => {
    // Re-fetch budgets 
    setBudgetChanged((prev) => !prev);
}, []);

  // FETCH USER TRANSACTIONS

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) {
        console.log('No user logged in.');
        return;
      }

      try {
        const response = await fetch(`http://10.0.2.2:3000/api/transactions/${user.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }

        const transactions = await response.json();
        console.log('Fetched Transactions:', transactions);


        const income = transactions.filter((t) => t.type === 'Income');
        const expenses = transactions.filter((t) => t.type === 'Expense');

        setIncomeTransactions(income);
        setExpenseTransactions(expenses);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, [user, transactionsChanged]);


  


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
          budgets={budgets}
          setBudgetChanged={setBudgetChanged}
        />}
      {selectedButton === "This Month" &&
       <ReportThisMonthComponent 
          incomeTransactions={incomeTransactions}
          expenseTransactions={expenseTransactions}
          budgets={budgets}
          setBudgetChanged={setBudgetChanged}

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
