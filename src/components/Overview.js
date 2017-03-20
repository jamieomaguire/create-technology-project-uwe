import React, { Component } from 'react';
import axios from 'axios';

import PastEntryList from './PastEntryList';
import Style from 'style-it';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.loadPastEntriesFromServer = this.loadPastEntriesFromServer.bind(this);
  }
  loadPastEntriesFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
    console.log('loaded past entries');
  }
  componentDidMount() {
    this.loadPastEntriesFromServer();
  }
  render() {
    return (
      <Style>
        {`
          .overviewContainer {
            border: 1px solid #ccc;
            border-radius: .5em;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            background-color: #ffffff;
          }
          .overviewHeading {
            text-align: center;
            font-family: sans-serif;
            font-weight: 100;
            color: #4a4a4a;
          }
        `}
        <div>
          <div className="overviewContainer">
            <h1 className="overviewHeading">Daily Averages</h1>
            <PastEntryList entries={ this.state.data }/>
          </div>
        </div>
      </Style>
    )
  }
}

export default Overview;