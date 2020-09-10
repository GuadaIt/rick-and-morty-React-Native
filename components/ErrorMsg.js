import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ErrorMsg = ({ err }) => {

  if (err.networkError) {
    return (
      <View style={styles.err}>
        <Text style={styles.errTxt}>Server error.</Text>
      </View>  
    )
  } else {
    return (
      <View style={styles.err}>
        <Text style={styles.errTxt}>Not found.</Text>
      </View>  
    )
  };  
};

const styles = StyleSheet.create({
  err: {
    alignItems: 'center'
  },
  errTxt: {
    fontSize: 20,
    color: 'red'
  }
})

ErrorMsg.propTypes = { err: PropTypes.object.isRequired };

export default ErrorMsg;