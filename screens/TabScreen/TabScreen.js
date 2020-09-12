import React from 'react';
import { View } from 'react-native';
import { SearchBar, Results } from '../../components';

const TabScreen = () => (
  <View>
    <SearchBar />
    <Results />
  </View>
);

export default TabScreen;