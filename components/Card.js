import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { showModalAction } from '../redux/modalDuck';

const Card = ({ info, showModalAction } ) => {

  const { item } = info;

  const navigation = useNavigation();

  const onPress = id => {
    showModalAction(id, item.__typename);
    navigation.navigate('Details');
  }; 

  const renderCard = () => {
    switch (item.__typename) {
      case 'Character':
        return (
          <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)} key={item.id}>
            <View style={styles.imgContainer}>
              <Image style={styles.img} source={{ uri: item.image }} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{item.name}</Text>
            </View>  
          </TouchableOpacity>
        )
      case 'Episode':
        return (
          <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)} key={item.id}>
            <Text>{item.name}</Text>
            <Text>{item.episode}</Text>
          </TouchableOpacity>
        )
      case 'Location':
        return (
          <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)} key={item.id}>
            <Text className="underlined-text">{item.name}</Text>
            <Text>Type: {item.type}</Text>
          </TouchableOpacity>
        )
      default:
        return (
          <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)} key={item.id}>
            <Text className="underlined-text">{item.name}</Text>
          </TouchableOpacity>
        )
    };
  };

  return renderCard()
};

const styles = StyleSheet.create({
  card: {
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
  episode: {
    color: 'white'
  }
});

export default connect(null, { showModalAction })(Card);