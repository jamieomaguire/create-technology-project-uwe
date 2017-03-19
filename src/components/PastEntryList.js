import React from 'react';
import PastEntry from './PastEntry';

const PastEntryList = ({ entries }) => {
    let pastEntryNodes = entries.map(entry => {
      return (
        <PastEntry 
          date={ entry.date }
          uniqueID={ entry['_id'] } 
          value={ entry.value } 
          key={ entry['_id'] } />
      )
    })
    return (
        <ul>
            { pastEntryNodes }
        </ul>
    )
}

export default PastEntryList;