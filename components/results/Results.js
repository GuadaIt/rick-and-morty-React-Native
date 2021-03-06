import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import { getCharactersAction } from '../../redux/charactersDuck';
import { getLocationsAction } from '../../redux/locationsDuck';
import { getEpisodesAction } from '../../redux/episodesDuck';
import Card from '../card/Card';
import ErrorMsg from '../errorMsg/ErrorMsg';
import PropTypes from 'prop-types';
import styles from './resultsStyle';

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

  const handleEndReach = () => currentTab.loadMore(currentTab.next);

  const renderItem = ({ item }) => <Card info={item} />;

  return (
    <View>
      {currentTab.err ?
        <ErrorMsg err={currentTab.err} />
        : <FlatList data={currentTab.array}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          onEndReachedThreshold={1}
          onEndReached={currentTab.next ? handleEndReach : ''}
          style={styles.list} />
      }
    </View>
  )
};

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