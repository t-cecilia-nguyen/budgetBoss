import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useTransactions } from '../navigations/bottomTabs';


const combineAndSortTransactions = (incomeTransactions = [], expenseTransactions = []) => {
  const allTransactions = [...incomeTransactions, ...expenseTransactions];
  return allTransactions.sort((a, b) => new Date(b.Date) - new Date(a.Date));
};

const groupTransactionsByDate = (transactions) => {
  return transactions.reduce((groups, transaction) => {
    const date = transaction.Date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
};

const TransactionList = () => {

  const { incomeTransactions, expenseTransactions } = useTransactions();


  const transactions = combineAndSortTransactions(incomeTransactions, expenseTransactions);

  const groupedTransactions = groupTransactionsByDate(transactions);

  const totalIncome = transactions.filter(t => t.Type === 'Income').reduce((sum, t) => sum + t.Amount, 0);
  const totalExpenses = transactions.filter(t => t.Type === 'Expense').reduce((sum, t) => sum + t.Amount, 0);

  const netAmount = totalIncome - totalExpenses;


  useEffect(() => {
      console.log('Updated Income Transactions:', incomeTransactions);
      console.log('Updated Expense Transactions:', expenseTransactions);
  }, [incomeTransactions, expenseTransactions]);

  return (
    <View style={styles.container}>
      <View style={styles.totalsContainer}>
        <Text style={styles.totalText}>Total Income: <Text style={styles.income}>+${totalIncome}</Text></Text>
        <Text style={styles.totalText}>Total Expenses: <Text style={styles.expense}>-${totalExpenses}</Text></Text>
        <Text style={styles.totalText}>Net: <Text style={netAmount >= 0 ? styles.income : styles.expense}>{netAmount >= 0 ? '+' : '-'}${Math.abs(netAmount)}</Text></Text>
      </View>

      {/* Display grouped transactions */}
      {Object.keys(groupedTransactions).map((date, index) => (
        <View key={index} style={styles.transactionGroup}>
          <Text style={styles.dateText}>{date}</Text>
          {groupedTransactions[date].map((transaction, idx) => (
            <View key={idx} style={styles.transaction}>
              <View style={styles.row}>
                <Text style={styles.text}>{transaction.Category}</Text>
                <Text style={[styles.text, transaction.Type === 'Expense' ? styles.expense : styles.income]}>
                  {transaction.Type === 'Expense' ? '-' : '+'}${transaction.Amount}
                </Text>
              </View>
            </View>
          ))}
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
  transactionGroup: {
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
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
  },
});

export default TransactionList;
