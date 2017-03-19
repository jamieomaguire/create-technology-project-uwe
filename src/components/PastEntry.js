import React from 'react';

const PastEntry = ({ date, uniqueID, value }) => {
    const formatDate = (entryDate) => {
        let date = entryDate;
        let dateArr = date.split(' ');
        dateArr.splice(4);
        let newDate = dateArr.join(" ")
        return newDate;
    }
    const formatValue = (val) => {
      let newValue = val.substr(0,1).toUpperCase().concat(val.substr(1));
      return newValue;
    }
    return (
        <li>
            <h4>{ formatDate(date) }</h4>
            <h5>{ formatValue(value) }</h5>
        </li>
    )
}

export default PastEntry;