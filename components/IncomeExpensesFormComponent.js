import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTransactions } from '../navigations/bottomTabs';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

const FormTab = () => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [formType, setFormType] = useState('Income');

    const { user } = useContext(UserContext);
    const { incomeTransactions, expenseTransactions, setExpenseTransactions, setIncomeTransactions, transactionsChanged,setTransactionsChanged } = useTransactions();

    useEffect(() => {
        console.log('Income Transactions:', incomeTransactions);
        console.log('Expense Transactions:', expenseTransactions);
    }, [incomeTransactions, expenseTransactions]);

    const handleSubmission = async () => {
      if (!user) {
        Alert.alert('Error', 'User not logged in');
        return;
      }
    
      const newTransaction = {
        userId: user.id,
        date,
        amount: parseFloat(amount),
        category,
        type: formType === 'Income' ? 'Income' : 'Expense',
      };
    
      try {
        const response = await fetch('http://10.0.2.2:3000/api/transactions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTransaction),
        });
    
        if (!response.ok) {
          throw new Error('Failed to save transaction');
        }
    
        const result = await response.json();
        console.log('Transaction saved successfully:', result);
    

        setTransactionsChanged((prev) => !prev);  // signal transaction list to refresh
        console.log('Transactions Changed:', transactionsChanged);
    

        setDate('');
        setAmount('');
        setCategory('');
        setNotes('');
    
        Alert.alert('Success', 'Transaction saved successfully');
      } catch (error) {
        console.error('Error saving transaction:', error);
        Alert.alert('Error', 'Failed to save transaction');
      }
    };
    

    return (
        <View>
            <View style={styles.form}>
                <Text style={styles.title}>{formType} Form</Text>
                {/* Picker to select between income and expenses forms */}
                <Picker selectedValue={formType} style={styles.picker} onValueChange={(itemValue) => setFormType(itemValue)}>
                    <Picker.Item label="Income" value="Income" />
                    <Picker.Item label="Expense" value="Expense" />
                </Picker>

                {/* Text Input for Date */}
                <TextInput
                    style={styles.input}
                    placeholder="Date (yyyy-mm-dd)"
                    value={date}
                    onChangeText={setDate}
                />

                {/* Text Input for Amount */}
                <TextInput
                    style={styles.input}
                    placeholder="Amount"
                    keyboardType="numeric"
                    value={amount}
                    onChangeText={setAmount}
                />

                {/* Text Input for Category */}
                <TextInput
                    style={styles.input}
                    placeholder="Category"
                    value={category}
                    onChangeText={setCategory}
                />

                {/* Text Input for Notes */}
                <TextInput
                    style={styles.input}
                    placeholder="Notes"
                    value={notes}
                    onChangeText={setNotes}
                />

                {/* Button to submit form */}
                <TouchableOpacity style={styles.button} onPress={handleSubmission}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F5',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 5,
        width: '90%',
        marginHorizontal: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#007AFF',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingLeft: 10,
    },
    picker: {
        height: 50,
        marginBottom: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#007AFF',
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default FormTab;
