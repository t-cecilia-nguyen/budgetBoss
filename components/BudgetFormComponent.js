import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';
import { useBudgets, useTransactions } from '../navigations/bottomTabs';
import { BudgetContext } from '../navigations/bottomTabs';


const BudgetFormTab = ({userId}) => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');
    const [budgets, setBudgets] = useState([]);

    const [viewMode, setViewMode] = useState('Form');

    useEffect(() => {

        // Check if any budgets exist for user ID
        const getBudgets = async () => {
            try {
                const response = await fetch(`http://10.0.2.2:3000/api/budgets/${userId}`);
                
                if (!response.ok) throw new Error('Failed to fetch budgets');

                const data = await response.json();

                if (data.length > 0) {
                    setBudgets(data);
                    
                    setViewMode('Summary');
                } else {
                    setViewMode('Form');
                }
            } catch (err) {
                console.error('Error while fetching budgets:', err);
                setViewMode('Form');
            }
        };

        getBudgets();
    }, [userId]);

    const handleSubmission = async () => {
        
        try {
            const newBudget = {userId, amount: parseFloat(amount), startDate, endDate, category, notes};

            const response = await fetch('http://10.0.2.2:3000/api/budgets/', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newBudget),
            });

            if (!response.ok) throw new Error('Failed to add budget');

            const result = await response.json();
            console.log('Budget has been added:', result);

            setBudgets((prev) => [...prev, {...newBudget, id: result.Id}]);
            resetForm();

            setViewMode('Summary');
        } catch (err) {
            console.error('Error while adding budget:', err);
        }
    };

    const handleDelete = async (id) => {

        try {
            const response = await fetch(`http://10.0.2.2:3000/api/budgets/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete budget');
            
            setBudgets(budgets.filter(budget => budget.id !== id));
        } catch (err) {
            console.error('Error deleting budget:', err);
        }
    };

    const resetForm = () => {
        setStartDate('');
        setEndDate('');
        setAmount('');
        setCategory('');
        setNotes('');
    }

    // Render the budget summaries
    const renderBudgetSummary = () => (

        <View style={styles.container}>
            <Text style={styles.title}>Budgets Summary</Text>
            <FlatList
                data={budgets}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{item.category}</Text>
                        <Text style={styles.cell}>{item.amount}</Text>
                        <Text style={styles.cell}>{item.startDate} - {item.endDate}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => setViewMode('Form')}
            >
                <Text style={styles.addButtonText}>Add New Budget</Text>
            </TouchableOpacity>
        </View>
    );

    const renderBudgetForm = () => (
        <View style={styles.container}>
            <Text style={styles.title}>Add New Budget</Text>
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
                {/* Button to save Budget Entry */}
                <TouchableOpacity style={styles.button} onPress={handleSubmission}>
                    <Text style={styles.buttonText}>Save Budget</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setViewMode('Summary')}
                >
                    <Text style={styles.buttonText}>Back to Summary</Text>
                </TouchableOpacity>
        </View>
    );

    return viewMode === 'Summary' ? renderBudgetSummary() : renderBudgetForm();
};

// Styles
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F0F0F5',
        padding: 20,
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
    addButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    cell: {
        fontSize: 16,
        color: '#333',
        width: '30%',
        textAlign: 'center',
    },
});

export default BudgetFormTab;