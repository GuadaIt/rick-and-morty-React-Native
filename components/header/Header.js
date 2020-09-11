import React from 'react';
import { View, Image } from 'react-native';
import headerImg from '../../assets/rick-and-morty-logo.png';
import styles from './headerStyle';

const Header = () => (
  <View style={styles.header}>
    <Image style={styles.image} source={headerImg}/>
  </View>
);

export default Header;