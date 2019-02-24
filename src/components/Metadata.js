import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Metadata.css';

class Metadata extends Component {
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
  

  formatDate(date) {
    const d = new Date(date);
    return `${d.getDate()} ${this.months[d.getMonth()]}, ${d.getFullYear()}`
  }

  render() {
    return [
      <h1 className="Title">{this.props.metadata.title}</h1>,
      <div className="Description">{this.props.metadata.desc}</div>,
      <div className="Metadata">
        <div><span className="Label">Created by:</span> {this.props.metadata.creator}</div>
        <div>
          <span className="Label">Twitter search query:</span>
          <span className="Query">{this.props.metadata.searchQuery}</span>
        </div>
        <div><span className="Label">Tweets archived between:</span> 
          {this.formatDate(this.props.metadata.startDate)} - <br/>{this.formatDate(this.props.metadata.endDate)}</div>
      </div>
    ]
  }
}

Metadata.propTypes = {
  metadata: PropTypes.object.isRequired
}

export default Metadata;
