import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native';
import { hideItemDetailsAction } from '../../redux/itemDetailsDuck';
import { Card } from '../../components';
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

  const handlePress = () => { 
    hideItemDetailsAction();
    navigation.goBack()
  };

  const renderItem = ({ item }) => <Card info={item} />;

  if (itemDetails.fetching) return (
    <View style={styles.spinnerContainer}>
      <ActivityIndicator animating={true} color='#02b1c8' size='large' />
    </View>
  );

  if (info.__typename === 'Character')
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.btn} onPress={handlePress}>
          <Text style={styles.btnTxt}>X</Text>
        </TouchableOpacity>
        
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: info.image }} />
        </View>
        
        <Text style={styles.name}>{info.name}</Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.underlined}>
            <Text style={styles.txt}>Species:</Text>
          </View>
          <View style={styles.notUnderlined}>
            <Text style={styles.txt}>{info.species}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.underlined}>
            <Text style={styles.txt}>Gender:</Text>
          </View>
          <View style={styles.notUnderlined}>
            <Text style={styles.txt}>{info.gender}</Text>
          </View>
        </View>

      </View>
    )
  else if (info.__typename === 'Episode') {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.btn} onPress={handlePress}>
          <Text style={styles.btnTxt}>X</Text>
        </TouchableOpacity>

        <Text style={styles.name}>{info.name}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.underlined}>
            <Text style={styles.txt}>Episode:</Text>
          </View>
          <View style={styles.notUnderlined}>
            <Text style={styles.txt}>{info.episode}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.underlined}>
            <Text style={styles.txt}>Release date:</Text>
          </View>
          <View style={styles.notUnderlined}>
            <Text style={styles.txt}>{info.air_date}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Characters:</Text>
          <FlatList data={info.characters} renderItem={renderItem} />
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={styles.btn} onPress={handlePress}>
          <Text style={styles.btnTxt}>X</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{info.name}</Text>

        <View style={styles.detailsContainer}>

          <View style={styles.underlined}>
            <Text style={styles.txt}>Type:</Text>
          </View>
          <View style={styles.notUnderlined}>
            <Text style={styles.txt}>{info.__typename}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.underlined}>
            <Text style={styles.txt}>Dimension:</Text>
          </View>
          <View style={styles.notUnderlined}>
            <Text style={styles.txt}>{info.dimension}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.title}>Residents:</Text>
          <FlatList data={info.residents} renderItem={renderItem} />
        </View>
      </View>
    )
  };
};

const mapState = state => ({ itemDetails: state.itemDetails });

DetailsScreen.propTypes = {
  itemDetails: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  hideItemDetailsAction: PropTypes.func
};

export default connect(mapState, { hideItemDetailsAction } )(DetailsScreen);