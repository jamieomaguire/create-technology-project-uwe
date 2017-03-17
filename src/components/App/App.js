// indexjs
import React, { Component } from 'react';
import EntryBox from '../EntryBox/EntryBox';

import Style from 'style-it';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Style>
        {`
          .container {
            border: 1px solid #ccc;
            padding: 1em;
            margin-bottom: 1.5em;
            border-radius: .5em;
            box-shadow: 0px 3px 8px rgba(0,0,0,.2);
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-betwee;
          }
        `}
        <EntryBox
          url='http://localhost:3001/api/entries'
          pollInterval={2000} />
      </Style>
    )
  }
}

export default App;