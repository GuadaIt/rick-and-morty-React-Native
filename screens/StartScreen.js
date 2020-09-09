import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const StartScreen = ({ navigation }) => {

  const enterApp = () => navigation.navigate('Home');

  return (
    <View style={styles.screen}>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>React Native Challenge</Text>
        <Text style={styles.name}>Guada Iturralde</Text>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={enterApp}>
          <Text style={styles.txtBtn}>Enter</Text>
        </TouchableOpacity>
        
        <Text style={styles.date}>Date</Text>
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
    fontSize: 25,
    color: 'white'
  },
  name: {
    paddingTop: 20,
    fontSize: 20,
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
    marginVertical: 20,
    color: 'white',
    fontSize: 18
  }
});

export default StartScreen;