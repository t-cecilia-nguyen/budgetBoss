import React, { useState, useEffect, useContext } from 'react'; 
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native'; 
import { UserContext } from '../context/userContext';
import { Colors } from '../assets/colors';

const BudgetSummary = () => { 
    const { user } = useContext(UserContext); 
    const [budgets, setBudgets] = useState([]);

    useEffect(() => { 
        if (user) { 
        fetch(`http://10.0.2.2:3000/api/budgets/${user.id}`)
            .then(response => response.json())
            .then(data => {
                setBudgets(data);
            })
            .catch(error => {
            console.error('Error fetching budget summaries:', error);
            Alert.alert('Error', 'Failed to fetch budget summaries');
            });
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Budget Summary</Text>
            <FlatList
                data={budgets}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.budgetItem}>
                        <Text style={styles.budgetText}>
                            <Text style={styles.boldText}>Date:</Text> {item.start_date} to {item.end_date}
                        </Text>
                        <Text style={styles.budgetText}>
                            <Text style={styles.boldText}>Amount:</Text> ${item.amount}
                        </Text>
                        <Text style={styles.budgetText}>
                            <Text style={styles.boldText}>Category:</Text> {item.category}
                        </Text>
                        <Text style={styles.budgetText}>
                            <Text style={styles.boldText}>Notes:</Text> {item.notes}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F0F0F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: Colors.lightBlue
    },
    budgetItem: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    budgetText: {
        fontSize: 16,
        marginBottom: 5,
    },
    boldText: {
        fontWeight: 'bold',
    },
});

export default BudgetSummary;