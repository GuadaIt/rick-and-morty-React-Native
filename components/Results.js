import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import { getCharactersAction } from '../redux/charactersDuck';
import { getLocationsAction } from '../redux/locationsDuck';
import { getEpisodesAction } from '../redux/episodesDuck';
import { Card, ErrorMsg, ErroMsg } from './';
import PropTypes from 'prop-types';

const Results = ({ filter, characters, episodes, locations, getCharactersAction, getEpisodesAction, getLocationsAction }) => {

  const tabsActionsInfo = {
    characters: {
      loadMore: getCharactersAction,
      array: characters.array,
      next: characters.next,
      err: characters.err
    },
    episodes: {
      loadMore: getEpisodesAction,
      array: episodes.array,
      next: episodes.next,
      err: episodes.err
    },
    locations: {
      loadMore: getLocationsAction,
      array: locations.array,
      next: locations.next,
      err: locations.err
    }
  };

  const currentTab = tabsActionsInfo[filter.toLowerCase()];

  const onPress = id => navigation.navigate('Details', { id });
  const handleEndReach = () => currentTab.loadMore(currentTab.next);
  
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={item => onPress(item.id)}>
      <Card info={item} />
    </TouchableOpacity>
  );

  return (
    <View>
      {!currentTab.err ?
      <FlatList data={currentTab.array}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        onEndReachedThreshold={1}
        onEndReached={currentTab.next ? handleEndReach : ''} 
        style={styles.list}/>
        : <ErroMsg err={currentTab.err} />
      }
    </View>
  )
};

const styles = StyleSheet.create({
  spinnerContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentContainer: {
    alignItems: 'center'
  },
  list: {
    marginBottom: 100
  }
});

const mapState = state => ({
  filter: state.filter.searcher,
  characters: state.characters,
  episodes: state.episodes,
  locations: state.locations
});

Results.propTypes = {
  filter: PropTypes.string.isRequired,
  characters: PropTypes.object.isRequired, 
  episodes: PropTypes.object.isRequired, 
  locations: PropTypes.object.isRequired, 
  getCharactersAction: PropTypes.func, 
  getEpisodesAction: PropTypes.func, 
  getLocationsAction: PropTypes.func
};

export default connect(mapState, { getCharactersAction, getEpisodesAction, getLocationsAction })(Results);