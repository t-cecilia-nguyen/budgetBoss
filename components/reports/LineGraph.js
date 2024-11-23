import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React , {useState} from 'react'
import { FontAwesome } from 'react-native-vector-icons';
import Svg, {G, Rect, Circle, Line, Defs, LinearGradient, Stop} from 'react-native-svg';

import { Colors } from '../../assets/colors';
import HorizontalLine from './HorizontalLine';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const LineGraph = () => {

    const [totalSpent, setTotalSpent] = useState(200);
    const [totalIncome, setTotalIncome] = useState(2000);

    const svgContainer ={
        backgroundColor: 'transparent',
        borderRadius: 10,

    };
    const containerHeight = 230;
    const containerWidth = 320;
    const x_margin = 10;
    const y_margin = 10;
    const padding_from_screen_border =20;


    const renderBackground = () => {
        return (
            <G>
                <Rect
                    x={0}
                    y={0}
                    height={containerHeight}
                    width={containerWidth}
                    fill={'url(#gradientBack)'}
                />
            </G>
        )
    }

    const renderXaxis = () =>{
        return(
            <G key='x_axis'>
                <Circle
                    cx={x_margin}
                    cy={containerHeight - y_margin}
                    r={5}
                    fill={'#000'}
                    stroke={'#000'}
                    strokeWidth={1}
                />

            </G>
        );
    }


  return (
    <View style={styles.container}>
        <View style={styles.headerBox}>
            <View style={styles.flexColumnBox}>
                <Text style={styles.textBold}>Total Spent</Text>
                <Text style={[styles.textBold, {color: 'red'}]}>{totalSpent}</Text>
            </View>
            <View style={styles.flexColumnBox}>
                <Text style={styles.textBold}>Total Income</Text>
                <Text style={[styles.textBold, {color: 'green'}]}>{totalIncome}</Text>
            </View>
        </View>
        <HorizontalLine width='100%' style={styles.customLine}/>
        
        <View style={styles.lineGraphContainer}>
            <Svg height='100%' width='100%' style={svgContainer}>
                <Defs>
                    <LinearGradient id="gradientBack" gradientUnits='userSpaceOnUse'
                        x1={0}
                        y1={0}
                        x2={0}
                        y2={230}
                    >
                        <Stop offset={0} stopColor={'blue'} stopOpacity={0.3}/>
                        <Stop offset={1} stopColor={'white'} stopOpacity={0.3}/>

                    </LinearGradient>
                </Defs>
                {renderBackground()}
                {renderXaxis()}
                </Svg>
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