import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header } from '../../components';
import PropTypes from 'prop-types';
import styles from './startScreenStyle';

const StartScreen = ({ navigation }) => {

  const enterApp = () => navigation.navigate('Home');

  return (
    <View style={styles.screen}>

      <View>
        <Header />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>React Native Challenge</Text>
          <Text>By</Text>
          <Text style={styles.name}>Guada Iturralde</Text>
        </View>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={enterApp}>
          <Text style={styles.txtBtn}>Enter</Text>
        </TouchableOpacity>

        <Text style={styles.date}>September 10, 2020</Text>
      </View>

    </View>
  )
};

StartScreen.propTypes = { navigation: PropTypes.object };

export default StartScreen;