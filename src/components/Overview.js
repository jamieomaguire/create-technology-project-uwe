import React, { Component } from 'react';
import axios from 'axios';

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
    let intervalId = setInterval(this.LoadPastEntriesFromServer, this.props.pollInterval);
    this.setState({
      intervalId: intervalId
    })
  }
    // interval needs to be cleared to prevent setting state in the unmounted component
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    this.setState({
      intervalId: 0
    })
  }
  render() {
    return (
      <h1>HOLLA!</h1>
    )
  }
}

export default Overview;