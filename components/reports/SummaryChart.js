import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-gifted-charts';

const SummaryChart = ({
  incomeTransactions,
  expenseTransactions,
  totalIncome,
  totalExpense,
}) => {

    console.log('Income Transactions:', incomeTransactions);
    console.log('Expense Transactions:', expenseTransactions);
    const incomeData = (incomeTransactions || []).map(item => {
          return { 
          value: Number(item.Amount), 
        };
      });

      const expenseData = (expenseTransactions || []).map(item => {
        const date = new Date(item.Date); // Convert the date string to a Date object
        const formattedDate = date.toLocaleDateString('en-GB', {
            month: '2-digit', 
            day: '2-digit',   
            year: '2-digit' 
          });
          
          return { 
          value: Number(item.Amount), 
          label: formattedDate
        };
      });
   


  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <LineChart
          data={expenseData}
          noOfSections={8}
          spacing={150}
          color='red'
          yAxisColor={'red'}
          showYAxisIndices
          hideDataPoints
          yAxisIndicesColor={'red'}
          yAxisIndicesWidth={10}
            secondaryData={incomeData}
            secondaryLineConfig={{ color: 'green', strokeWidth: 2 }} // Configure secondary line
            xAxisLabelTextStyle={{width: 80, marginLeft: -26}}
        xAxisIndicesHeight={10}
        xAxisIndicesWidth={2}
        width={270}
          height={180}
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
  chartContainer: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
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