import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image, FlatList } from 'react-native';
import Card from '../components';

const DetailsScreen = ({ modal }) => {

  const { info } = modal;

  const characters = info.characters || info.residents;

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image />
      <Text style={styles.name}>{info.name}</Text>

      <View style={styles.subTitlesContainer}>
        <View  style={styles.subTitle}>
          <Text style={styles.text}>Episode:</Text>
        </View>
        <Text style={styles.text}>{info.episode}</Text>
      </View>

      <View style={styles.subTitlesContainer}>
        <View style={styles.subTitle}>
          <Text style={styles.text}>Release date:</Text>
        </View>
        <Text style={styles.text}>{info.air_date}</Text>
      </View>

      <Text style={styles.characters}>{info.characters ? 'Characters' : 'Residents'}</Text>

      <FlatList data={characters} renderItem={renderItem} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    fontSize: 25,
    marginBottom: 15,
    color: '#02b1c8'
  },
  subTitlesContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 5
  },
  subTitle: {
    borderBottomColor: '#02b1c8',
    borderBottomWidth: 3,
    marginRight: 10
  },
  text: {
    fontSize: 18
  },
  characters: {
    fontSize: 25,
    marginVertical: 20
  }
});

const mapState = state => ({ modal: state.modal });

export default connect(mapState)(DetailsScreen);