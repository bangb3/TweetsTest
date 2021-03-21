import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { changeView, fetchTweets } from './action';
import { ViewName } from './types';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectMovieStarTweets,
  makeSelectMusicStarTweets,
} from './selectors';

const key = 'home';

export function HomePage({
  onChangeView,
  getTweets,
  movieStarTweets,
  musicStarTweets,
}) {
  const history = useHistory();
  const { viewName } = useParams();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getTweets();
  }, []);

  useEffect(() => {
    onChangeView(viewName);
  }, [viewName]);

  const handleOnClick = () => {
    if (viewName === ViewName.movie) {
      history.push(`/${ViewName.music}`);
    } else {
      history.push(`/${ViewName.movie}`);
    }
  };

  return (
    <>
      <Button onClick={handleOnClick} variant="contained">
        Switch View
      </Button>
      {movieStarTweets && viewName === ViewName.movie && (
        <>
          <h1>Lastest tweet of the movie star Samuel L. Jackson</h1>
          <ul>
            {movieStarTweets.map(tweet => (
              <li key={tweet.id}>{tweet.text}</li>
            ))}
          </ul>
        </>
      )}
      {musicStarTweets && viewName === ViewName.music && (
        <>
          <h1>Lastest tweets of the music star Celine Dion</h1>
          <ul>
            {musicStarTweets.map(tweet => (
              <li key={tweet.id}>{tweet.text}</li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

HomePage.propTypes = {
  onChangeView: PropTypes.func,
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
    onChangeView: viewName => dispatch(changeView(viewName)),
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
