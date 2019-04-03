import React from 'react'
import PropTypes from 'prop-types'

import TweetViewer from 'tweet-viewer'
import Metadata from '../components/Metadata'
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      firstStep: 0,
      lastStep: Infinity
    }
  }

  reduceIds(steps) {
    console.log(steps)
    const tot = this.props.tweetIds.length 
    const tweetsPerStep = Math.floor(tot / steps)
    const remainder = tot - (tweetsPerStep * steps)
    const firstStep = this.state.firstStep
    const lastStep = this.state.lastStep === Infinity ? steps : this.state.lastStep
    return this.props.tweetIds.reduce((acc, id, idx) => {
      if (idx >= tweetsPerStep * firstStep && idx < tweetsPerStep * lastStep) {
        acc.push(id)
      }
      // edge case for remainder when all ranges are selected
      if (remainder && lastStep === steps && idx >= tweetsPerStep * lastStep) {
        acc.push(id)
      }
      return acc
    }, [])
  }

  onSlide(values) {
    if (values[0] === values[1]) {
      // TODO: We need to find a way to prevent this from happening, but can't find anything on the API docs.
    } else {
      this.setState({
        firstStep: values[0],
        lastStep: values[1]
      })
    }
  }

  render() {
    // Bring range of tweets to a more manageable number
    let maxRange = this.props.tweetIds.length
    while (maxRange > 100) {
      maxRange = Math.floor(maxRange / 100)
    }
    // this.props.tweetIds.length / maxRange
    const tweetIds = this.reduceIds(maxRange)
    console.log(tweetIds.length, this.props.tweetIds.length)
    return(
      <div id="App">
        <Metadata metadata={this.props.metadata} />
        <div>
          <span className="Label">Limit number of tweets</span>
          <Range allowCross={false} min={0} max={maxRange} defaultValue={[0, maxRange]} onChange={(r) => this.onSlide(r)}/>
        </div>
        <TweetViewer tweetIds={tweetIds} />
      </div>
    )
  }
}

App.propTypes = {
  metadata: PropTypes.object.isRequired,
  tweetIds: PropTypes.array.isRequired
}

export default App