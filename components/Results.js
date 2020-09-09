import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, FlatList, View } from 'react-native';
import { getCharactersAction } from '../redux/charactersDuck';
import { getLocationsAction } from '../redux/locationsDuck';
import { getEpisodesAction } from '../redux/episodesDuck';
import Card from './Card';

const Results = ({ filter, characters, episodes, locations, getCharactersAction, getEpisodesAction, getLocationsAction }) => {

  const tabsActionsInfo = {
    characters: {
      loadMore: getCharactersAction,
      array: characters.array,
      next: characters.next
    },
    episodes: {
      loadMore: getEpisodesAction,
      array: episodes.array,
      next: episodes.next
    },
    locations: {
      loadMore: getLocationsAction,
      array: locations.array,
      next: locations.next
    }
  };

  const currentTab = tabsActionsInfo[filter.toLowerCase()];

  const renderItem = item => <Card info={item} />;
  const handleEndReach = () => currentTab.loadMore(currentTab.next);

  return (
    <View style={styles.container}>
      <FlatList data={currentTab.array}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
        onEndReachedThreshold={0.5}
        onEndReached={currentTab.next ? handleEndReach : ''} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  contentContainer: {
    alignItems: 'center'
  },
  list: {
    width: '90%',
    alignItems: 'center'
  }
});

const mapState = state => ({
  characters: state.characters,
  episodes: state.episodes,
  locations: state.locations
});

export default connect(mapState, { getCharactersAction, getEpisodesAction, getLocationsAction })(Results);