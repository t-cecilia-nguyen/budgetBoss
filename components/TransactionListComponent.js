import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { UserContext } from '../context/userContext';
import { useTransactions } from '../navigations/bottomTabs';

const combineAndSortTransactions = (incomeTransactions = [], expenseTransactions = []) => {
  const allTransactions = [...incomeTransactions, ...expenseTransactions];
  return allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const groupTransactionsByDate = (transactions) => {
  return transactions.reduce((groups, transaction) => {
    const date = transaction.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});
};

const TransactionList = () => {
  const { user } = useContext(UserContext); // Access user context
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null); 
  const { transactionsChanged, setTransactionsChanged } = useTransactions();


  useEffect(() => {
    console.log("transactionsChanged on translist:", transactionsChanged);
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

  const transactions = combineAndSortTransactions(incomeTransactions, expenseTransactions);
  const groupedTransactions = groupTransactionsByDate(transactions);

  const totalIncome = transactions.filter((t) => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter((t) => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);

  const netAmount = totalIncome - totalExpenses;

  const deleteTransaction = async (transactionId) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/transactions/${transactionId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        Alert.alert('Success', 'Transaction deleted successfully');
        setTransactionsChanged((prev) => !prev); 
        setSelectedTransactionId(null); 
      } else {
        Alert.alert('Error', 'Failed to delete transaction');
      }
    } catch (error) {
      Alert.alert('Error', 'Error deleting transaction');
    }
  };

  const toggleDeleteButton = (transactionId) => {
    setSelectedTransactionId((prevId) => (prevId === transactionId ? null : transactionId)); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.totalsContainer}>
        <Text style={styles.totalText}>Total Income: <Text style={styles.income}>+${totalIncome}</Text></Text>
        <Text style={styles.totalText}>Total Expenses: <Text style={styles.expense}>-${totalExpenses}</Text></Text>
        <Text style={styles.totalText}>Net: <Text style={netAmount >= 0 ? styles.income : styles.expense}>{netAmount >= 0 ? '+' : '-'}${Math.abs(netAmount)}</Text></Text>
      </View>

      {/* Scrollable list of transactions */}
      {Object.keys(groupedTransactions).map((date, index) => (
        <View key={index} style={styles.transactionGroup}>
          <Text style={styles.dateText}>{date}</Text>
          {groupedTransactions[date].map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.row} onTouchEnd={() => toggleDeleteButton(transaction.id)}>
                <Text style={styles.text}>{transaction.category}</Text>
                <Text style={[styles.text, transaction.type === 'Expense' ? styles.expense : styles.income]}>
                  {transaction.type === 'Expense' ? '-' : '+'}${transaction.amount}
                </Text>
              </View>

              {selectedTransactionId === transaction.id && (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={() => deleteTransaction(transaction.id)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  totalsContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
    marginHorizontal: 20,
    width: '90%',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionGroup: {
    marginBottom: 10,
    marginHorizontal: 20,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionCard: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  expense: {
    color: 'red',
  },
  income: {
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TransactionList;
