import { put, takeLatest } from 'redux-saga/effects';

import { FETCH_TWEETS } from './constants';
import { tweetsLoaded } from './action';
import { movieStarTweets } from './mocks/movieStar';
import { musicStarTweets } from './mocks/musicStar';

export function* fetchTweets() {
  try {
    /* I used mock data here because the Twitter API does not support CORS.
     * I didn't want to set up the authentication to be able to make requests to the Twitter API.
     */
    const movieStarTweetsMock = movieStarTweets.data;
    const musicStarTweetsMock = musicStarTweets.data;
    yield put(tweetsLoaded(movieStarTweetsMock, musicStarTweetsMock));
  } catch (err) {
    // Error management here
  }
}

export default function* twitterData() {
  yield takeLatest(FETCH_TWEETS, fetchTweets);
}
