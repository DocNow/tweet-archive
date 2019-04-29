import React from 'react'
import PropTypes from 'prop-types'

import TweetViewer from 'tweet-viewer'
import Metadata from '../components/Metadata'
import Range from 'rc-slider/lib/Range';
import Shake from 'shake.js'
import 'rc-slider/assets/index.css';
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    const steps = 30
    this.state = {
      firstStep: 0,
      lastStep: steps
    }
    this.steps = steps
  }

  componentDidMount() {
    this.setState({
      tweetIds: this.props.tweetIds
    })
    this.shakeEvent = new Shake({
      threshold: 15,
      timeout: 1000
    })
    this.shakeEvent.start()
    window.addEventListener('shake', () => {
      this.shuffle()
    }, false)
  }

  reduceIds(tweetsPerStep) {
    // const tot = this.state.tweetIds.length
    const firstStep = this.state.firstStep
    return this.state.tweetIds.reduce((acc, id, idx) => {
      if (idx >= tweetsPerStep * firstStep && idx < tweetsPerStep * this.state.lastStep) {
        acc.push(id)
      }
      return acc
    }, [])
  }

  resetIds() {
    this.setState({
      firstStep: 0,
      lastStep: this.steps
    })
  }

  onSlide(values) {
    if (values[0] === values[1]) {
      // no-op
    } else {
      this.setState({
        firstStep: values[0],
        lastStep: values[1]
      })
    }
  }

  shuffle() {
    const tis = Array.from(this.state.tweetIds)
    for (let i = tis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tis[i], tis[j]] = [tis[j], tis[i]];
    }
    this.setState({
      tweetIds: tis
    })
    this.resetIds()
  }

  render() {
    if (!this.state.tweetIds) {
      return null
    }
    // Bring range of tweets to a more manageable number
    let maxRange = this.state.tweetIds.length
    let tweetIds = this.state.tweetIds
    let slider = null
    if (maxRange > this.steps) {
      maxRange = Math.ceil(this.state.tweetIds.length / this.steps)
      tweetIds = this.reduceIds(maxRange)
      const marks = {}
      const firstStepTweets = this.state.firstStep === 0 ? 0 : maxRange * this.state.firstStep
      marks[this.state.firstStep] = firstStepTweets
      const lastStepTweets = this.state.lastStep === Infinity ? this.state.tweetIds.length : maxRange * this.state.lastStep
      marks[this.state.lastStep] = lastStepTweets
      slider = (
        <div style={{marginBottom: '3em'}}>
          <span className="OpsLabel">Limit number of tweets</span>
          <Range allowCross={false} min={0} max={this.steps} value={[this.state.firstStep, this.state.lastStep]} onChange={(r) => this.onSlide(r)}
            marks={marks}/>
        </div>
      )
    }
    return(
      <div id="App">  
        <Metadata metadata={this.props.metadata} />
        <div className="Operations">
          <div>
            <span className="OpsLabel">Shuffle (click or shake!) </span>
            <button onClick={() => {this.shuffle()}}>🔀</button>
          </div>
          {slider}
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