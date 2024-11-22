import React from 'react';
import { View, StyleSheet , Dimensions, Text} from 'react-native';
import CustomButtonTab from './CustomButtonTab';





const { width: screenWidth } = Dimensions.get("window");



const HorizontalLine = () => {
    return (
        <View style={styles.horizontalLine}/>
    );
};

export default HorizontalLine;

const styles = StyleSheet.create({
    horizontalLine: {
        height: 1, 
        backgroundColor: 'grey', 
        width: screenWidth, 
        
    },
});
