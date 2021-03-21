import { CHANGE_VIEWNAME, FETCH_TWEETS, TWEETS_LOADED } from './constants';

export function changeView(viewName) {
  return {
    type: CHANGE_VIEWNAME,
    viewName,
  };
}

export function fetchTweets() {
  return {
    type: FETCH_TWEETS,
  };
}

export function tweetsLoaded(movieStarTweets, musicStarTweets) {
  return {
    type: TWEETS_LOADED,
    movieStarTweets,
    musicStarTweets,
  };
}
