//commentlist
import React, { Component } from 'react';
import Entry from './Entry';

import Style from 'style-it';

class EntryList extends Component {
  render() {
    let entryNodes = this.props.data.map(entry => {
      return (
        <Entry 
          time={ entry.time }
          uniqueID={ entry['_id'] } 
          onEntryDelete={ this.props.onEntryDelete }
          onEntryUpdate={ this.props.onEntryUpdate }
          meal={ entry.meal }
          value={ entry.value } 
          key={ entry['_id'] } />
      )
    })
    return (
      <Style>
        {`
          .container {
            border: 1px solid #ccc;
            margin-bottom: 1.5em;
            border-radius: .2em;
            box-shadow: 0px 3px 8px rgba(0,0,0,.2);
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .completeDay {
            align-self: flex-end;
            margin-top: 1em;
            background-color: #68D286;
            border: none;
            padding: .5em 1em;
            font-size: .8em;
            text-transform: uppercase;
            color: white;
            cursor: pointer;
            margin-bottom: 1em;
            margin-right: 1em;
          }
        `}
        <div className="container">
          { entryNodes }
          <button className="completeDay">Complete Day</button>
        </div>
      </Style>
    )
  }
}

export default EntryList;