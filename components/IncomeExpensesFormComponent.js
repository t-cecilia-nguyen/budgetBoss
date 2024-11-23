import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
//import { Expenses, Income } from '../data/transactions';

const FormTab = () => {
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [formType, setFormType] = useState('Income');


    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [expenseTransactions, setExpenseTransactions] = useState([]);

    const handleSubmission = async () => {

        const newTransaction = {
            Date: date,
            Amount: parseFloat(amount),
            Category: category,
            Type: formType === 'Income' ? 'Income' : 'Expense',
        };

        if (formType === 'Income') {

            // Add new income transaction to array of income transactions
            setIncomeTransactions((prevTransactions) => {
                const updatedIncome = [...prevTransactions, newTransaction];
                console.log('Updated Income Transactions:', updatedIncome);
                return updatedIncome;
            });

            console.log('Added entry to Income:', newTransaction);
        } else {

            // Add new expense transaction to array of expense transactions
            setExpenseTransactions((prevTransactions) => {
                const updatedExpenses = [...prevTransactions, newTransaction];
                console.log('Updated Expenses Transactions:', updatedExpenses);
                return updatedExpenses;
            });

            console.log('Added entry to Expenses:', newTransaction);
        }
        
        // Reset form data
        setDate('');
        setAmount('');
        setCategory('');
        setNotes('');
    };

    return (
        <View style={styles.container}>
           <View style={styles.form}>
                <Text style={styles.title}>{formType} Form</Text>

                {/* Picker to select between income and expenses forms */}
                <Picker selectedValue={formType} style={styles.picker} onValueChange={(itemValue) => setFormType(itemValue)}>
                    <Picker.Item label="income" value="Income"></Picker.Item>
                    <Picker.Item label="Expense" value="Expense"></Picker.Item>
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
    },
    
    form: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 5,
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