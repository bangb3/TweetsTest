import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectMovieStarTweets = () =>
  createSelector(
    selectHome,
    homeState => homeState.movieStarTweets,
  );

const makeSelectMusicStarTweets = () =>
  createSelector(
    selectHome,
    homeState => homeState.musicStarTweets,
  );
export { selectHome, makeSelectMovieStarTweets, makeSelectMusicStarTweets };
