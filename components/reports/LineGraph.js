import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React , {useState} from 'react'
import { FontAwesome } from 'react-native-vector-icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import { Colors } from '../../assets/colors';
import HorizontalLine from './HorizontalLine';


// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ incomeTransactions,
    expenseTransactions, totalIncome, totalExpense }) => {
  

    if (!Array.isArray(incomeTransactions) || !Array.isArray(expenseTransactions)) {
        return (
            <View style={{ padding: 10 }}>
            <Text>Error: Invalid data provided for transactions.</Text>
            </View>
        );
    }

    // Example labels: Generate labels dynamically based on transactions (e.g., days of the month)
    const labels = incomeTransactions.map((_, index) => `Day ${index + 1}`);
  
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Income',
          data: incomeTransactions,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4, // Smooth curves
          borderWidth: 2,
        },
        {
          label: 'Expense',
          data: expenseTransactions,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
          borderWidth: 2,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Days of the Month',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Amount ($)',
          },
          beginAtZero: true,
        },
      },
    };
  
   
  return (
    <View style={styles.container}>
        <View style={styles.headerBox}>
            <View style={styles.flexColumnBox}>
                <Text style={styles.textBold}>Total Spent</Text>
                <Text style={[styles.textBold, {color: 'red'}]}>{totalExpense}</Text>
            </View>
            <View style={styles.flexColumnBox}>
                <Text style={styles.textBold}>Total Income</Text>
                <Text style={[styles.textBold, {color: 'green'}]}>{totalIncome}</Text>
            </View>
        </View>
        <HorizontalLine width='100%' style={styles.customLine}/>
        
        <View style={styles.lineGraphContainer}>
            <View style={{ height: 300, padding: 10 }}>
                <Line data={chartData} options={options} />
             </View>
        </View>

        <View style={styles.noteBox}>
            <View style={styles.flexRowBox}>
                <FontAwesome name="circle" size={15} color={Colors.green}  />
                <Text style={styles.textSmall}>This Month</Text>
            </View>
            <View style={styles.flexRowBox}>
                <FontAwesome name="circle" size={15} color={Colors.lightGrey}  />
                <Text style={styles.textSmall}>Year Average</Text>
            </View>
        </View>
    </View>
  )
}

export default LineGraph

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        width: '90%',
        height: 230,
        marginTop: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems:'center'
    },
    flexColumnBox:{
        justifyContent: 'space-between',
        alignItems:'center'
    },
    flexRowBox:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center', 

    },
    headerBox: {
        alignContent:'space-between',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: '90%',
        position: 'absolute',
        top: 10,
       
    },
    customLine: {
        height: 2, 
        position: 'absolute',
        top: 60,
      },
    lineGraphContainer:{
        position: 'absolute',
        top: 70,
        height: 130,
        width: '90%',
        borderRadius: 10,
        justifyContent: 'flex-start',
        alignItems:'center'
    
    },
    noteBox: {
        alignContent:'space-between',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width: '90%',
        position: 'absolute',
        bottom: 5,

       
    },
    
    textBold:{
        fontSize: 12,
        fontWeight: 'bold'
    },
    textSmall:{
        fontSize: 10,
    }

})