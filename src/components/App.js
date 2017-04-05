// Root Component
// Import all the other components to be rendered into this parent component
import React, { Component } from 'react';
import Menu from './Menu';
import EntryBox from './EntryBox';
import Overview from './Overview';
import Settings from './Settings';

import Style from 'style-it';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      // style-it allows for inline styles with the full expressive power of CSS
      <Style>
        {`
          .app {
            max-width: 500px;
            margin: 0;
            margin-left: auto;
            margin-right: auto;
          }
          .app-inner {
            padding: 1em;
          }
        `}
        <div className="app">
          {/* Here react router is rendering different components based on the pathname in the browser */}
          <Menu />
          <div className="app-inner">
            {(this.props.location.pathname === "/") ?
              <EntryBox
                url='http://localhost:3001/api/entries'
                url2='http://localhost:3001/api/past-entries'
                pollInterval={1000} /> :
            (this.props.location.pathname === "/overview") ?
              <Overview
                url='http://localhost:3001/api/past-entries'
                pollInterval={0} /> :  
            (this.props.location.pathname === "/settings") ?
              <Settings /> : null
              }
          </div>
        </div>
      </Style>
    )
  }
}

export default App;