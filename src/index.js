/* global __TWEET_ARCHIVE_DATA */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'

ReactDOM.render(
  <App
    metadata={__TWEET_ARCHIVE_DATA.metadata}
    tweets={__TWEET_ARCHIVE_DATA.tweets} />,
  document.getElementById('root'))
