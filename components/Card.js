import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showItemDetailsAction } from '../redux/itemDetailsDuck';
import PropTypes from 'prop-types';

const Card = ({ info, itemDetailsIsOpen, showItemDetailsAction }) => {

  const navigation = useNavigation();

  const onPress = id => {
    if(itemDetailsIsOpen) return
    showItemDetailsAction(id, info.__typename);
    navigation.navigate('Details');
  };

  const renderCard = () => {
    switch (info.__typename) {
      case 'Character':
        return (
          <TouchableOpacity style={styles.card} onPress={() => onPress(info.id)} key={info.id}>
            <View style={styles.imgContainer}>
              <Image style={styles.img} source={{ uri: info.image }} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{info.name}</Text>
            </View>
          </TouchableOpacity>
        )
      case 'Episode':
        return (
          <TouchableOpacity style={styles.card} onPress={() => onPress(info.id)} key={info.id}>
            <View style={styles.nameContainer}>
              <Text style={styles.episodeName}>{info.name}</Text>
            </View>
            <Text style={styles.epNumber} >{info.episode}</Text>
          </TouchableOpacity>
        )
      case 'Location':
        return (
          <TouchableOpacity style={styles.card} onPress={() => onPress(info.id)} key={info.id}>
            <View style={styles.nameContainer}>
              <Text style={styles.episodeName}>{info.name}</Text>
            </View>
            <View style={styles.typeContainer}>
              <View>
                <Text style={styles.typeTitle}>Type</Text>
              </View>
              <Text style={styles.type}>{info.type}</Text>
            </View>
          </TouchableOpacity>
        )
      default:
        return (
          <TouchableOpacity style={styles.card} onPress={() => onPress(info.id)} key={info.id}>
            <Text>{info.name}</Text>
          </TouchableOpacity>
        )
    };
  };

  return renderCard()
};

const styles = StyleSheet.create({
  card: {
    minHeight: 100,
    width: 300,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 5,
    backgroundColor: '#313131',
    borderRadius: 5
  },
  imgContainer: {
    flex: 1
  },
  img: {
    width: 80,
    height: 80
  },
  nameContainer: {
    width: 0,
    flexGrow: 1,
    flex: 1
  },
  name: {
    fontSize: 18,
    color: 'white'
  },
  episodeName: {
    flexShrink: 1,
    fontSize: 20,
    color: 'white'
  },
  epNumber: {
    fontSize: 20,
    marginLeft: 10,
    color: '#02b1c8',
    fontWeight: 'bold'
  },
  typeTitle: {
    color: '#02b1c8',
    fontSize: 15
  },
  type: {
    fontSize: 15
  },
  typeContainer: {
    alignItems: 'flex-end'
  }
});

const mapState = state => ({ itemDetailsIsOpen: state.itemDetails.isOpen });

Card.propTypes = {
  info: PropTypes.object.isRequired,
  itemDetailsIsOpen: PropTypes.bool.isRequired,
  showItemDetailsAction: PropTypes.func
};

export default connect(mapState, { showItemDetailsAction })(Card);