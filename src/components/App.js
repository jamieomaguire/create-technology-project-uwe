// indexjs
import React, { Component } from 'react';
import EntryBox from './EntryBox';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <EntryBox
        url='http://localhost:3001/api/entries'
        pollInterval={2000} />
    )
  }
}

export default App;