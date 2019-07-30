import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TweetEmbed from 'react-tweet-embed'

class TweetViewer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      postsToShow: this.props.chunkSize,
    }
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (distanceToBottom < 150) {
      this.setState({
        postsToShow: this.state.postsToShow + this.props.chunkSize
      })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  render() {
    const tweets = this.props.tweets
    return (<div className="App">
      <div>{
        tweets
          .filter(t => this.props.displayRetweets || t.retweet == false)
          .slice(0, this.state.postsToShow).map((t, i) => {
          return <TweetEmbed key={`t${i}`} id={t.id} />
        })
      }</div>
    </div>)
  }
}

TweetViewer.defaultProps = {
  tweets: [],
  chunkSize: 12 
}

TweetViewer.propTypes = {
  tweets: PropTypes.array.isRequired,
  displayRetweets: PropTypes.bool,
  chunkSize: PropTypes.number
}

export default TweetViewer
