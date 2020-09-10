import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Header } from '../components';
import PropTypes from 'prop-types';

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

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#343434',
    flex: 1,
    paddingVertical: 100,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  titleContainer: {
    alignItems: 'center'
  },
  title: {
    textTransform: 'uppercase',
    fontSize: 18,
    color: 'white',
    marginVertical: 10,
    color: '#02b1c8'
  },
  name: {
    fontSize: 15,
    color: 'white'
  },
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    height: '100%',
    width: 150,
    height: 50,
    backgroundColor: '#02b1c8',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  txtBtn: {
    color: 'white',
    fontSize: 18
  },
  date: {
    marginTop: 20,
    color: 'white',
    fontSize: 12
  }
});

StartScreen.propTypes = { navigation: PropTypes.object };

export default StartScreen;