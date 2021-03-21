// eslint-disable-next-line spaced-comment
import { /*call,*/ put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';

// import request from 'utils/request';
import { FETCH_TWEETS } from './constants';
import { tweetsLoaded } from './action';
// import { bearerToken } from './token';
// import { ViewName } from './types';
import { movieStarTweets } from './mocks/movieStar';
import { musicStarTweets } from './mocks/musicStar';

// axios.interceptors.request.use(
//   config => {
//     const configSetup = config;
//     configSetup.headers.authorization = `Bearer ${bearerToken}`;
//     configSetup.headers.mode = 'no-cors';
//     return configSetup;
//   },
//   error => Promise.reject(error),
// );

// function getTweets(requestURL) {
//   return axios.get(requestURL);
// }

/**
 * Github repos request/response handler
 */
export function* fetchTweets() {
  // TODO Bang: Twitter API does not support CORS. Find another way to call API
  // const viewName = yield select(makeSelectViewName());
  //   const id = viewName === ViewName.movie ? '75974281' : '106854950';
  //   const requestURL = `https://api.twitter.com/2/users/${id}/tweets`;
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       Authorization: `Bearer ${bearerToken}`,
  //       'Content-Type': 'application/json',
  //     },
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Credentials': true,
  //   };

  try {
    // const tweets = yield call(request, requestURL, options);
    // const tweets = yield call(getTweets, requestURL);
    const movieStarTweetsMock = movieStarTweets.data;
    const musicStarTweetsMock = musicStarTweets.data;
    yield put(tweetsLoaded(movieStarTweetsMock, musicStarTweetsMock));
  } catch (err) {
    // TODO Bang: Error management - Add: yield put(tweetsLoadingError(err));
  }
}

export default function* twitterData() {
  yield takeLatest(FETCH_TWEETS, fetchTweets);
}
