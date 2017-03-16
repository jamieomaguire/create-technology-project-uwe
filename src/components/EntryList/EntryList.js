//commentlist
import React, { Component } from 'react';
import Entry from '../Entry/Entry';

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
      <div>
        { entryNodes }
      </div>
    )
  }
}

export default EntryList;