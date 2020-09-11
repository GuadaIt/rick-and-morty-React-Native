import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './errorMsgStyle';

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

ErrorMsg.propTypes = { err: PropTypes.object.isRequired };

export default ErrorMsg;