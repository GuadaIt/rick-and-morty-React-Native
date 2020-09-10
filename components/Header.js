import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import headerImg from '../assets/rick-and-morty-logo.png';

const Header = () => (
  <View style={styles.header}>
    <Image style={styles.image} source={headerImg}/>
  </View>
);

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    height: 140,
    resizeMode: 'contain'
  }
});

export default Header;