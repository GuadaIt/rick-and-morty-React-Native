import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator, BackHandler } from 'react-native';
import { hideItemDetailsAction } from '../../redux/itemDetailsDuck';
import { ItemDetails } from '../../components';
import PropTypes from 'prop-types';
import styles from './detailsScreenStyle';

const DetailsScreen = ({ itemDetails, navigation, hideItemDetailsAction }) => {

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      hideItemDetailsAction();
      navigation.pop();
      return true;
    })
  }, []);

  const { info } = itemDetails; 

  if (itemDetails.fetching) return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator animating={true} color='#02b1c8' size='large' />
    </View>
  );

  return <ItemDetails itemInfo={info} navigation={navigation} hideItemDetails={hideItemDetailsAction} />
};

const mapState = state => ({ itemDetails: state.itemDetails });

DetailsScreen.propTypes = {
  itemDetails: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  hideItemDetailsAction: PropTypes.func
};

export default connect(mapState, { hideItemDetailsAction } )(DetailsScreen);