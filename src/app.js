import React from 'react'
import ReactDOM from 'react-dom'
import TweetViewer from 'tweet-viewer'
import Metadata from './components/Metadata'
import './app.css'

ReactDOM.render(
  <div id="App">
    <Metadata metadata={__TWEET_ARCHIVE_DATA.metadata} />
    <TweetViewer tweetIds={__TWEET_ARCHIVE_DATA.ids} />
  </div>,
  document.getElementById('root'))