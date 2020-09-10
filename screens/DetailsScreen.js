import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, BackHandler } from 'react-native';
import { hideItemDetailsAction } from '../redux/itemDetailsDuck';
import { Card } from '../components';
import PropTypes from 'prop-types';

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

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    paddingTop: 70,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  underlined: {
    borderBottomColor: '#02b1c8',
    borderBottomWidth: 3,
    marginRight: 10
  },
  txt: {
    fontSize: 20,
  },
  notUnderlined: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 3,
  },
  name: {
    textAlign: 'center',
    maxWidth: '60%',
    fontSize: 25,
    color: '#02b1c8'
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    marginVertical: 8,
    color: 'white'
  },
  btn: {
    color: 'white',
    width: 40,
    height: 40,
    backgroundColor: '#02b1c8',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 15,
    left: 15,
    borderRadius: 10
  },
  btnTxt: {
    fontSize: 20
  },
  imgContainer: {
    marginVertical: 30
  },
  img: {
    width: 300,
    height: 300
  }
});

const mapState = state => ({ itemDetails: state.itemDetails });

DetailsScreen.propTypes = {
  itemDetails: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  hideItemDetailsAction: PropTypes.func
};

export default connect(mapState, { hideItemDetailsAction } )(DetailsScreen);