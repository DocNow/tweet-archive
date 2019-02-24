import React from 'react'
import ReactDOM from 'react-dom'
import TweetViewer from 'tweet-viewer'

ReactDOM.render(
  <TweetViewer
    tweetIds={__TWEET_ARCHIVE_DATA.ids}
    metadata={__TWEET_ARCHIVE_DATA.metadata}/>,
  document.getElementById('root'))