import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Expenses, Income } from '../data/transactions';
import { useState, useEffect } from 'react';


const combineAndSortTransactions = () => {
  const allTransactions = [
    ...Object.values(Expenses),
    ...Object.values(Income)
  ];

  return allTransactions.sort((a, b) => new Date(b.Date) - new Date(a.Date));
};

const TransactionList = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  
  const transactions = combineAndSortTransactions();

  useEffect(() => {
    let income = 0;
    let expenses = 0;

    transactions.forEach(transaction => {
      if (transaction.Type === 'Income') {
        income += transaction.Amount;
      } else if (transaction.Type === 'Expense') {
        expenses += transaction.Amount;
      }
    });

    setTotalIncome(income);
    setTotalExpenses(expenses);
  }, [transactions]);

  const netAmount = totalIncome - totalExpenses;

  return (
    <View style={styles.container}>
      <View style={styles.totalsContainer}>
        <Text style={styles.totalText}>Total Income: <Text style={styles.income}>+${totalIncome}</Text></Text>
        <Text style={styles.totalText}>Total Expenses: <Text style={styles.expense}>-${totalExpenses}</Text></Text>
        <Text style={styles.totalText}>Net: <Text style={netAmount >= 0 ? styles.income : styles.expense}>{netAmount >= 0 ? '+' : '-'}${netAmount}</Text></Text>
      </View>
      {transactions.map((transaction, index) => (
        <View key={index} style={styles.transaction}>
          <Text style={styles.text}>Date: {transaction.Date}</Text>
          <View style={styles.row}>
            <Text style={styles.text}>{transaction.Category}</Text>
            <Text style={[styles.text, transaction.Type === 'Expense' ? styles.expense : styles.income]}>
              {transaction.Type === 'Expense' ? '-' : '+'}${transaction.Amount}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    totalsContainer: {
      backgroundColor: '#f0f0f0',
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 3,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    transaction: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    },
    text: {
        textAlign: 'left',
        fontSize: 16,
        marginBottom: 5,
    },
    expense: {
      color: 'red',
    },
    income: {
      color: 'green',
    }
});

export default TransactionList;