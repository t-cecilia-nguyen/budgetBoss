import React , {useState} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

import {Colors} from '../../assets/colors'

const { width: screenWidth } = Dimensions.get("window");

const titles = ['Running Budget', 'Transaction History', 'Report This Month'];


const ReportThisMonthComponent = () => {

	return (
		<View style={styles.container}>

			<Text>This Month</Text>
			<ScrollView style={styles.scrollView}>
                <View style={styles.card}>
                    <Text style={styles.cardText}>{titles[0]}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardText}>{titles[1]}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardText}>{titles[2]}</Text>
                </View>
            </ScrollView>
		</View>
	);
};

export default ReportThisMonthComponent;

const styles = StyleSheet.create({
    card: {
        width: screenWidth - 20,
        height: 300,
        marginVertical: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        backgroundColor: '#fff',
        shadowColor: Colors.lightGrey,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    cardText: {
        color: Colors.primaryBlue,
        fontSize: 16,
        fontWeight: "bold",
		padding: 15,
    },
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
    },
    
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    
});