import React from 'react';
import PropTypes from 'prop-types';
import Range from 'rc-slider/lib/Range';
import './Metadata.css';
import 'rc-slider/assets/index.css';

class Metadata extends React.Component {
  constructor() {
    super()
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  }
  
  get startDate() {
    return new Date(this.props.metadata.startDate)
  }

  get endDate() {
    return new Date(this.props.metadata.endDate)
  }

  formatDate(date) {
    return `${date.getDate()} ${this.months[date.getMonth()]}, ${date.getFullYear()}`
  }

  render() {
    // Bring range of tweets to a more manageable number
    let maxRange = this.props.metadata.total
    while (maxRange > 100) {
      maxRange = Math.floor(maxRange / 100)
    }
    return(
      <div>
        <h1 className="Title">{this.props.metadata.title}</h1>
        <div className="Description">{this.props.metadata.desc}</div>
        <div className="Metadata">
          <div><span className="Label">
            Created by:</span> {this.props.metadata.creator}
          </div>
          <div>
            <span className="Label">Twitter search query:</span>
            <span className="Query">{this.props.metadata.searchQuery}</span>
          </div>
          <div>
            <span className="Label">Tweets archived between:</span> 
            {this.formatDate(this.startDate)} - <br/>{this.formatDate(this.endDate)}
          </div>
          <div>
            <span className="Label">Only show tweets between dates:</span>
          </div>
        </div>
        <div>
          <span className="Label">Limit number of tweets</span>
          <Range allowCross={false} min={0} max={maxRange}/>
        </div>
      </div>
    )
  }
}

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired
}

export default Metadata;
