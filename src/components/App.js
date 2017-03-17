// indexjs
import React, { Component } from 'react';
import EntryBox from './EntryBox';
import Overview from './Overview';
import Settings from './Settings';


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
        <Overview /> :  
      (this.props.location.pathname === "/settings") ?
        <Settings /> : null
        }
      </div>
    )
  }
}

export default App;