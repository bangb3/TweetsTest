import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import styled from 'styled-components';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { fetchTweets } from './action';
import { ViewName } from './types';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectMovieStarTweets,
  makeSelectMusicStarTweets,
} from './selectors';

const key = 'home';

export function HomePage({ getTweets, movieStarTweets, musicStarTweets }) {
  const history = useHistory();
  const { viewName } = useParams();
  /* There's a little bug with useInjectReducer. The redux store (Redux tab in chrome) is not updated at first render with this react-boilerplate custom hook.
   * After a click to switch the view, the old actions + the new actions will appear and the store data will be correct.
   * Visually, everything is functional.
   */
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getTweets();
  }, []);

  const handleOnClick = () => {
    if (viewName === ViewName.movie) {
      history.push(`/${ViewName.music}`);
    } else {
      history.push(`/${ViewName.movie}`);
    }
  };

  const Tweet = styled.li`
    list-style-type: none;
    margin-bottom: 30px;
    p {
      line-height: 2em;
    }
  `;

  const getTweetsView = () => {
    if (movieStarTweets && musicStarTweets) {
      const tweets =
        viewName === ViewName.movie ? movieStarTweets : musicStarTweets;
      return (
        <>
          <h1>Lastest tweet of a {viewName} star</h1>
          <ul>
            {tweets.map(tweet => (
              <Tweet key={tweet.id}>
                <p>
                  {moment(tweet.created_at).format('LLLL')}: <br /> {tweet.text}
                </p>
              </Tweet>
            ))}
          </ul>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <Button onClick={handleOnClick} variant="contained">
        Switch View
      </Button>
      {getTweetsView()}
    </>
  );
}

HomePage.propTypes = {
  getTweets: PropTypes.func,
  movieStarTweets: PropTypes.array,
  musicStarTweets: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  movieStarTweets: makeSelectMovieStarTweets(),
  musicStarTweets: makeSelectMusicStarTweets(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getTweets: () => dispatch(fetchTweets()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
