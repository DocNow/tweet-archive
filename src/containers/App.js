import React from 'react'
import PropTypes from 'prop-types'

import TweetViewer from '../components/TweetViewer'
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
      lastStep: steps,
      displayRetweets: false
    }
    this.steps = steps
  }

  componentDidMount() {
    this.setState({
      tweets: this.props.tweets
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
    const firstStep = this.state.firstStep
    return this.state.tweets.reduce((acc, id, idx) => {
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
    const tis = Array.from(this.state.tweets)
    for (let i = tis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tis[i], tis[j]] = [tis[j], tis[i]];
    }
    this.setState({
      tweets: tis
    })
    this.resetIds()
  }

  displayRetweets(display) {
    this.setState({displayRetweets: display})
  }

  render() {
    if (!this.state.tweets) {
      return null
    }
    // Bring range of tweets to a more manageable number
    let maxRange = this.state.tweets.length
    let tweets = this.state.tweets
    let slider = null
    if (maxRange > this.steps) {
      maxRange = Math.ceil(this.state.tweets.length / this.steps)
      tweets = this.reduceIds(maxRange)
      const marks = {}
      const firstStepTweets = this.state.firstStep === 0 ? 0 : maxRange * this.state.firstStep
      marks[this.state.firstStep] = firstStepTweets
      const lastStepTweets = this.state.lastStep === Infinity ? this.state.tweets.length : maxRange * this.state.lastStep
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
          <div>
            <span className="OpsLabel">Display retweets </span>
            <input type="checkbox" onClick={(e) => {this.displayRetweets(e.target.checked)}} />
          </div>
          {slider}
          </div>
        <TweetViewer tweets={tweets} displayRetweets={this.state.displayRetweets} />
      </div>
    )
  }
}

App.propTypes = {
  metadata: PropTypes.object.isRequired,
  tweets: PropTypes.array.isRequired
}

export default App