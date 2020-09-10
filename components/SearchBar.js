import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, TextInput, Image } from 'react-native';
import { searchCharAction } from '../redux/charactersDuck';
import { searchLocAction } from '../redux/locationsDuck';
import { searchEpAction } from '../redux/episodesDuck';
import PropTypes from 'prop-types';
import icon from '../assets/search.png';

const SearchBar = ({ filter, searchCharAction, searchEpAction, searchLocAction }) => {

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
    };
  };

  return (
    <View style={styles.inputContainer}>
      <View style={styles.container} >
        <Image style={styles.icon} source={icon} />
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
    alignItems: 'center',
    marginVertical: 30
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 40,
    borderRadius: 5,
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

const mapState = state => ({ filter: state.filter.searcher });

SearchBar.propTypes = {
  filter: PropTypes.string.isRequired,
  searchCharAction: PropTypes.func,
  searchEpAction: PropTypes.func,
  searchLocAction: PropTypes.func
};

export default connect(mapState, { searchCharAction, searchEpAction, searchLocAction })(SearchBar);