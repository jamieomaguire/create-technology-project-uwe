// indexjs
import React, { Component } from 'react';
import EntryBox from './EntryBox';
import Overview from './Overview';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
      {(this.props.location.pathname === "/") ?
        <EntryBox
          url='http://localhost:3001/api/entries'
          pollInterval={2000} /> :
      (this.props.location.pathname === "/overview") ?
        <Overview /> :  null }
      </div>
    )
  }
}

export default App;