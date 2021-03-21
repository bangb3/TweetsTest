import { TWEETS_LOADED } from './constants';

export const initialState = {
  movieStarTweets: [],
  musicStarTweets: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TWEETS_LOADED: {
      return {
        ...state,
        movieStarTweets: action.movieStarTweets,
        musicStarTweets: action.musicStarTweets,
      };
    }
    default:
      return state;
  }
};

export default homeReducer;
