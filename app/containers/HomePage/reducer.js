import { CHANGE_VIEWNAME, TWEETS_LOADED } from './constants';

export const initialState = {
  viewName: '',
  movieStarTweets: [],
  musicStarTweets: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_VIEWNAME: {
      return {
        ...state,
        viewName: action.viewName,
      };
    }
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
