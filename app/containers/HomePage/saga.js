import { put, takeLatest } from 'redux-saga/effects';

import { FETCH_TWEETS } from './constants';
import { tweetsLoaded } from './action';
import { movieStarTweets } from './mocks/movieStar';
import { musicStarTweets } from './mocks/musicStar';

export function* fetchTweets() {
  try {
    /* I used mock data here because the Twitter API does not support CORS.
     * My mock data is from Twitter API v2 by calling the endpoints with Postman and passing my bearer token in the authorization.
     * https://api.twitter.com/2/users/106854950/tweets?tweet.fields=created_at
     * https://api.twitter.com/2/users/75974281/tweets?tweet.fields=created_at
     * I didn't want to set up the authentication to be able to make requests to the Twitter API
     * because it will take more time and I don't know well this part and I'm not sure if it was in the scope of this test.
     * https://developer.twitter.com/en/docs/authentication/overview
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
