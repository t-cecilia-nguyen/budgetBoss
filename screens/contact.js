import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../assets/colors';
import { FontAwesome } from 'react-native-vector-icons';

export default function ContactScreen() {
    const members = ['Adam Simcoe', 'Nhan Tran', 'Nhu Ly', 'Trang Nguyen'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>CONTACT US</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Members</Text>
                {members.map((member, index) => (
                    <View key={index} style={styles.itemRow}>
                        <FontAwesome name="user" size={24} color={Colors.primaryBlue} />
                        <Text style={styles.text}>{member}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Information</Text>

                <View style={styles.itemRow}>
                    <FontAwesome name="phone" size={24} color={Colors.primaryBlue} />
                    <Text style={styles.text}>Phone: (416) 415 - 2000</Text>
                </View>

                <View style={styles.itemRow}>
                    <FontAwesome name="envelope" size={24} color={Colors.primaryBlue} />
                    <Text style={styles.text}>Email: info@budgetboss.ca</Text>
                </View>

                <View style={[styles.itemRow, {marginLeft: 5}]}>
                    <FontAwesome name="map-pin" size={24} color={Colors.primaryBlue} />
                    <Text style={[styles.text, {marginLeft: 15}]}>Address: 160 Kendal Ave, Toronto, ON, M5R 1M3</Text>
                </View>
            </View>
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
    section: {
        width: '100%',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.lightGrey,
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D3D3D3',
        paddingVertical: 10,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginLeft: 10,
        color: Colors.primaryBlue
    },
});