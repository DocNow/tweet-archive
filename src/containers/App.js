import React from 'react'
import PropTypes from 'prop-types'

import TweetViewer from 'tweet-viewer'
import Metadata from '../components/Metadata'
import './App.css'

class App extends React.Component {
  render() {
    const metadata = Object.assign({}, this.props.metadata, {total: this.props.tweetIds.length})
    return(
      <div id="App">
        <Metadata metadata={metadata} />
        <TweetViewer tweetIds={this.props.tweetIds} />
      </div>
    )
  }
}

App.propTypes = {
  metadata: PropTypes.object.isRequired,
  tweetIds: PropTypes.array.isRequired
}

export default App