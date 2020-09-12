import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Card } from '../';
import PropTypes from 'prop-types';
import styles from './itemDetailsStyle';

const ItemDetails = ({ itemInfo, navigation, hideItemDetails }) => {

  const { __typename: type } = itemInfo;

  const handlePress = () => {
    hideItemDetails();
    navigation.goBack()
  };

  const renderItem = ({ item }) => <Card info={item} />;


  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnTxt}>X</Text>
      </TouchableOpacity>

      {type === 'Character' &&
        <View style={styles.imgContainer}>
          <Image style={styles.img} source={{ uri: itemInfo.image }} />
        </View>
      }

      <Text style={styles.name}>{itemInfo.name}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.underlined}>
          <Text style={styles.txt}>
            {type === 'Character' && 'Species:'}
            {type === 'Episode' && 'Episode:'}
            {type === 'Location' && 'Type:'}
          </Text>
        </View>
        <View style={styles.notUnderlined}>
          <Text style={styles.txt}>
            {itemInfo.species || itemInfo.episode || type}
          </Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.underlined}>
          <Text style={styles.txt}>
            {type === 'Character' && 'Gender:'}
            {type === 'Episode' && 'Release date:'}
            {type === 'Location' && 'Dimension:'}
          </Text>
        </View>
        <View style={styles.notUnderlined}>
          <Text style={styles.txt}>
            {itemInfo.gender || itemInfo.air_date || itemInfo.dimension}
          </Text>
        </View>
      </View>

      {type !== 'Character' &&
        <View>
          <Text style={styles.title}>
            {type === 'Episode' ? 'Characters:' : 'Residents:'}
          </Text>
          <FlatList data={itemInfo.characters || itemInfo.residents} renderItem={renderItem} />
        </View>
      }

    </View>
  )
};

ItemDetails.propTypes = {
  itemInfo: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  hideItemDetails: PropTypes.func
};

export default ItemDetails;