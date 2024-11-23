import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FlatList } from 'react-native-gesture-handler';

const BudgetFormTab = () => {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [notes, setNotes] = useState('');

    const [budgetEntries, setBudgetEntries] = useState('');
    const [viewMode, setViewMode] = useState('Form');

    const handleSubmission = () => {
        
        const newBudgetEntry = {
            StartDate: startDate,
            EndDate: endDate,
            Amount: parseFloat(amount),
            Category: category,
            Notes: notes,
        };

        // Add new budget entry to array with previous entries
        setBudgetEntries((prevEntries) => {
            const updatedBudget = [...prevEntries, newBudgetEntry];
            console.log('Updated Budget Entries:', updatedBudget);
            return updatedBudget;
        });

        console.log('Added entry to Budget:', newBudgetEntry);

        // Reset form data
        setStartDate('');
        setEndDate('');
        setAmount('')
        setCategory('');
        setNotes('');
    };

    // Render the budget summaries
    const renderBudgetSummary = () => {
        // Message if no budget entries currently exist
        if (budgetEntries.length === 0) {
            return <Text>No budgets have been added, please add a budget to view its summary.</Text>
        }

        // Use array of budget entries and render them in a list
        return (
            <FlatList
                data={budgetEntries}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.summaryItem}>
                        <Text>Start Date: {item.StartDate}</Text>
                        <Text>End Date: {item.EndDate}</Text>
                        <Text>Budget Amount: ${item.Amount}</Text>
                        <Text>Budget Category:{item.Category}</Text>
                        <Text>Notes: {item.Notes}</Text>
                    </View>
                )}
            />
        );
    };

    return (
        <View style={styles.container}>
            <Picker
                selectedValue={viewMode}
                style={styles.picker}
                onValueChange={(itemValue) => setViewMode(itemValue)}>
                
                {/* Picker to select between budget form and budget summary */}
                <Picker.Item label="Add New Budget" value="Form"></Picker.Item>

                {/* Hide budget summary option unless a budget exists */}
                {budgetEntries.length > 0 && (
                    <Picker.Item label="View Budget Summary" value="Summary"></Picker.Item>
                )}
            </Picker>

            {/* Form Views */}
            {viewMode === 'Form' && (
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

                {/* Button to save Budget Entry */}
                <TouchableOpacity style={styles.button} onPress={handleSubmission}>
                    <Text style={styles.buttonText}>Save Budget</Text>
                </TouchableOpacity>
            </View>
            )}

            {/* Budget Summary Views */}
            {viewMode === 'Summary' && (
                <View style={styles.summaryContainer}>
                    <Text style={styles.title}>Budget Summary</Text>
                    {renderBudgetSummary()}
                </View>
            )}
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

    // SUMMARY STYLING
    summaryContainer: {
        marginTop: 20,
    },

    summaryItem: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        elevation: 5,
    },
});

export default BudgetFormTab;