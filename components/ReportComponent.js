import React from 'react';
import { View, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native'; 

const reportImages = [
  require('../assets/reports/RunningBudget.png'),
  require('../assets/reports/TransactionHistory.png'),
  require('../assets/reports/MonthlyReport.png'),

];

const ReportComponent = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.container}>

        <FlatList
        data={reportImages}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => (
            <View style={styles.card}>
            <Image source={item} style={styles.image} />
            </View>
        )}
        contentContainerStyle={styles.scrollContainer}
        />

        <TouchableOpacity
             style={styles.plusIcon}   
            onPress={() => navigation.navigate('Expenses/Incomes')} 
        >
            <MaterialIcons name="add" size={30} color="black" />
        </TouchableOpacity>  
    </View>
  );
};

export default ReportComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: 22,
    alignItems: 'center', 
    paddingTop: 10
  },
  image: {
    width: 395, 
    height: 256, 
  },
  scrollContainer: {
    alignItems: 'center', 
   },
   plusIcon: {
    position: 'absolute', 
    bottom: 10, 
    right: 20, 
    backgroundColor: '#FFBD2E', 
    borderRadius: 50, 
    padding: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});



