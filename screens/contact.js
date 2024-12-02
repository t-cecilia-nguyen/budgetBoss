// ContactScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../assets/colors';

export default function ContactScreen() {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>CONTACT US</Text>
        <Text style={styles.text}>Members: 1, 2, 3, 4</Text>
        <Text style={styles.text}>Phone: (416) 415 - 2000</Text>
        <Text style={styles.text}>Email: budgetboss@example.ca</Text>
        <Text style={styles.text}>Address: 160 Kendal Ave, Toronto, ON, M5R 1M3</Text>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.primaryBlue,
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
});
