import React , {useState} from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import HorizontalLine from './HorizontalLine';
import CustomButtonTab from './CustomButtonTab';



const { width: screenWidth } = Dimensions.get("window");

const titles = ['Running Budget', 'Transaction History', 'Report This Month'];


const ReportPrevMonthComponent = () => {

	const [selectedButton, setSelectedButton] = useState('Prev Month'); 

	return (
		<View style={styles.pageContainer}>

			<Text> Prev Month</Text>
			<FlatList
				data={titles}
				keyExtractor={(item) => item} 
				renderItem={({ item }) => (
					<View style={styles.card}>
						<Text style={styles.cardText}>{item}</Text>
					</View>
				)}
				contentContainerStyle={{ paddingBottom: 50 }}			/>
		</View>
	);
};

export default ReportPrevMonthComponent;

const styles = StyleSheet.create({
	pageContainer: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    card: {
        width: screenWidth - 20,
        height: 300,
        backgroundColor: "dodgerblue",
        marginVertical: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 10,
    },
    cardText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
		padding: 15,
    },
	
});
