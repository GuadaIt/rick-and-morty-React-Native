import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabScreen from '../TabScreen/TabScreen';
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
      <Tab.Screen name="Characters" component={TabScreen} listeners={{ tabPress: () => filterAction('characters')}} />
      <Tab.Screen name="Episodes" component={TabScreen} listeners={{ tabPress: () => filterAction('episodes')}} />
      <Tab.Screen name="Locations" component={TabScreen} listeners={{ tabPress: () => filterAction('locations')}} />
    </Tab.Navigator>
  )
};

MainScreen.propTypes = { filterAction: PropTypes.func };

export default connect(null, { filterAction })(MainScreen);