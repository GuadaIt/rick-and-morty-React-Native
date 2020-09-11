import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CharsScreen from '../CharsScreen';
import EpsScreen from '../EpsScreen';
import LocationsScreen from '../LocationsScreen';
import { filterAction } from '../../redux/filterDuck';
import PropTypes from 'prop-types';

const Tab = createBottomTabNavigator();

const MainScreen = ({ filterAction }) => {  
  
  const tabBarOptions = {
    activeTintColor: 'white',
    activeBackgroundColor: '#02b1c8',
    tabStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    labelStyle: {
      color: 'white',
      fontSize: 15,
      fontWeight: 'bold'
    }
  };

  return (
    <Tab.Navigator initialRouteName="Characters" tabBarOptions={tabBarOptions}>
      <Tab.Screen name="Characters" component={CharsScreen} listeners={{ tabPress: () => filterAction('characters')}} />
      <Tab.Screen name="Episodes" component={EpsScreen} listeners={{ tabPress: () => filterAction('episodes')}} />
      <Tab.Screen name="Locations" component={LocationsScreen} listeners={{ tabPress: () => filterAction('locations')}} />
    </Tab.Navigator>
  )
};

MainScreen.propTypes = { filterAction: PropTypes.func };

export default connect(null, { filterAction })(MainScreen);