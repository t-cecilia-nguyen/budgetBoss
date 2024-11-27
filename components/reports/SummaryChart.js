import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-gifted-charts';

import HorizontalLine from "./HorizontalLine";

const thisMonth = new Date().getMonth();


const SummaryChart = ({
  incomeTransactions,
  expenseTransactions,
  totalIncome,
  totalExpense,
}) => {

      

      const expenseData = (expenseTransactions || []).map(item => {
        const date = new Date(item.Date); 
        if(date.getMonth() === thisMonth){
          const formattedDate = date.toLocaleDateString('en-GB', {
              month: '2-digit', 
              day: '2-digit',   
            });
          
            return { 
              value: Number(item.Amount), 
              label: formattedDate
            }
        };
        return undefined;
      }).filter(item => item !== undefined); // Filter out undefined values
     
   


  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
            <View style={styles.flexColumnBox}>
                <Text style={styles.textBold}>Total Spent</Text>
                <Text style={[styles.textBold, {color: 'red'}]}>{totalExpense}</Text>
            </View>
            <View style={styles.flexColumnBox}>
                <Text style={styles.textBold}>Total Income</Text>
                <Text style={[styles.textBold, {color: 'grey'}]}>{totalIncome}</Text>
            </View>
        </View>
        <HorizontalLine width='100%' style={styles.customLine}/>

      <View style={styles.lineGraphContainer}>
        <LineChart
          data={expenseData}
          noOfSections={4}
          spacing={110}
          curved={true}
          color='red'
          yAxisColor={'grey'}
          dataPointsColor='red'
          yAxisIndicesColor={'grey'}
          yAxisIndicesWidth={10}
          xAxisIndicesHeight={10}
        xAxisIndicesWidth={2}
        width={270}
          height={135}
          style={styles.chart}

        />
      </View>
     
    </View>
  );
};

export default SummaryChart;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    width: '90%',
    height: '80%',
    marginTop: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  
  chart: {
    borderRadius: 16,
  },
  flexColumnBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRowBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerBox: {

    alignContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 10,
  },
  customLine: {
    height: 2,
    position: 'absolute',
    top: 60,
  },
  lineGraphContainer: {
    position: 'absolute',
    top: 70,
    height: 130,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  noteBox: {
    alignContent: 'space-between',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    bottom: 5,
  },
  textBold: {
    fontSize: 12,
    fontWeight: 'bold',
  
  },
});