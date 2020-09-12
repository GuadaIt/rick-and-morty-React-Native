import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showItemDetailsAction } from '../../redux/itemDetailsDuck';
import PropTypes from 'prop-types';
import styles from './cardStyle';

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
          <TouchableOpacity style={styles.card} onPress={() => onPress(info.id)} key={info.name}>
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
          <TouchableOpacity style={styles.card} onPress={() => onPress(info.id)} key={info.name}>
            <View style={styles.nameContainer}>
              <Text style={styles.episodeName}>{info.name}</Text>
            </View>
            <Text style={styles.epNumber} >{info.episode}</Text>
          </TouchableOpacity>
        )
      case 'Location':
        return (
          <TouchableOpacity style={styles.card} onPress={() => onPress(info.id)} key={info.name}>
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
          <TouchableOpacity style={styles.card} onPress={() => onPress(info.id)} key={info.name}>
            <Text>{info.name}</Text>
          </TouchableOpacity>
        )
    };
  };

  return renderCard()
};

const mapState = state => ({ itemDetailsIsOpen: state.itemDetails.isOpen });

Card.propTypes = {
  info: PropTypes.object.isRequired,
  itemDetailsIsOpen: PropTypes.bool.isRequired,
  showItemDetailsAction: PropTypes.func
};

export default connect(mapState, { showItemDetailsAction })(Card);