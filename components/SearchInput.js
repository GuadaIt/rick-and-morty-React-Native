import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { searchCharAction } from '../redux/charactersDuck';
import { searchLocAction } from '../redux/locationsDuck';
import { searchEpAction } from '../redux/episodesDuck';

const SearchInput = ({ filter, searchCharAction, searchEpAction, searchLocAction }) => {

  const searchAction = {
    characters: searchCharAction,
    locations: searchLocAction,
    episodes: searchEpAction
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleChangeText = text => {
    setSearchTerm(text);
    if (searchTerm.length >= 3) {
      searchAction[filter.toLowerCase()]( searchTerm, 'name');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.container} >
        <Image style={styles.icon} source={require('../assets/search.png')} />
        <View style={styles.input}>
          <TextInput placeholder='Search...'
            onChangeText={handleChangeText}

          />
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 40,
    borderRadius: 5,
    margin: 10,
    borderWidth: 1,
    borderColor: '#02b1c8'
  },
  icon: {
    padding: 10,
    marginHorizontal: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  input: {
    color: 'white'
  }
});

export default connect(null, { searchCharAction, searchEpAction, searchLocAction })(SearchInput);