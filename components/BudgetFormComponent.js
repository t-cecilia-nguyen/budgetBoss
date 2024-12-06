import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { UserContext } from '../context/userContext';

const BudgetFormTab = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');

    const { user } = useContext(UserContext);

    const handleSubmission = async () => {
        if (!user) {
            Alert.alert('Error', 'User not logged in');
            return;
        }

        const newBudget = {
            userId: user.id,
            startDate,
            endDate,
            amount: parseFloat(amount),
            category,
            notes,
        };
        
        console.log('Submitting budget:', newBudget);

        try {
            const response = await fetch('http://10.0.2.2:3000/api/budgets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBudget),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to save budget:', errorText);
                throw new Error(`Failed to save budget: ${errorText}`);
            }

            const result = await response.json();
            console.log('Budget saved successfully:', result);

            setStartDate('');
            setEndDate('');
            setAmount('');
            setCategory('');
            setNotes('');

            Alert.alert('Success', 'Budget saved successfully');
        } catch (error) {
            console.error('Error saving budget:', error);
            Alert.alert('Error', 'Failed to save budget');
        }
    };

    return (
        <View>
            <View style={styles.form}>
                <Text style={styles.title}>Budget Form</Text>

                {/* Text Input for Start Date */}
                <TextInput
                    style={styles.input}
                    placeholder="Start Date (yyyy-mm-dd)"
                    value={startDate}
                    onChangeText={setStartDate}
                />

                {/* Text Input for End Date */}
                <TextInput
                    style={styles.input}
                    placeholder="End Date (yyyy-mm-dd)"
                    value={endDate}
                    onChangeText={setEndDate}
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

export default BudgetFormTab;
