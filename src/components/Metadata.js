import React from 'react';
import PropTypes from 'prop-types';
import './Metadata.css';

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
        </div>
      </div>
    )
  }
}

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired
}

export default Metadata;
