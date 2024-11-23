import React  from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

import { Colors } from '../../assets/colors';
import ProgressBar from './ProgressBar';

const { width: screenWidth } = Dimensions.get("window");



const ReportPrevMonthComponent = () => {


	return (
		<View style={styles.container}>

			<Text> Prev Month</Text>
			<ScrollView style={styles.scrollView}>

                <View style={styles.card}>
                    <Text style={styles.cardText}>Running Budget</Text>
                    <View style={styles.noteBox}>
                        <View style={styles.flexBox}>
                            <FontAwesome name="circle" size={15} color={Colors.lightGrey}  />
                            <Text>Budget</Text>
                        </View>
                        <View style={styles.flexBox}>
                            <FontAwesome name="circle" size={15} color={Colors.green}  />
                            <Text>Expense</Text>
                        </View>
                    </View>
                    <ProgressBar newValue={0.5}/>

                
                   
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardText}>Transaction History</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardText}>Report This Month</Text>
                </View>
            </ScrollView>
            
				
		</View>
	);
};

export default ReportPrevMonthComponent;

const styles = StyleSheet.create({
	container: {
        backgroundColor: "lightpink",
        paddingHorizontal: 10,   
    },
    card: {
        flex: 1,
        width: screenWidth - 20,
        height: 300,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        position: 'absolute',
        top: 10,
        left: 10
    },
    flexBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    noteBox: {
        width: '25%',
        position: 'absolute',
        top: 20,
        right: 20
    },
    
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    
	
});
