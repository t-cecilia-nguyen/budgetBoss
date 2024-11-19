import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const OverviewsTab = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Overviews</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  }
});


export default OverviewsTab;
