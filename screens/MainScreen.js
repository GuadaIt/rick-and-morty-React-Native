import React, { useState } from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Text, SafeAreaView, View } from 'react-native';
import { Header, SearchInput, Results } from '../components';

const MainScreen = () => {

  const filters = ['Characters', 'Episodes', 'Locations'];

  const [currentFilter, setCurrentFilter] = useState('Characters');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>      
        <Header />
        <SearchInput filter={currentFilter} />     
        <Results filter={currentFilter} />
      </View>


      <View style={styles.tabsContainer}>
        {filters.map(filter => {
          return (
            <TouchableOpacity style={{
              ...styles.tabBtn, backgroundColor: filter === currentFilter ? '#02b1c8' : '#242424'}}
              key={filter}
              onPress={item => setCurrentFilter(filter)}>

              <Text style={styles.btnTxt}>{filter}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
    backgroundColor: '#fafafa'
  },
  top: {
    flex: 1
  },
  tabsContainer: {
    flexDirection: 'row'
  },
  tabBtn: {
    height: 60,
    width: Dimensions.get('window').width / 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end'
  },
  btnTxt: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  }
});

export default MainScreen;