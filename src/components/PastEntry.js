// Past Entry is similar to the Entry component except there is no form involed

import React from 'react';
import Style from 'style-it';

const PastEntry = ({ date, uniqueID, value }) => {
    // format the date to be more readable to people
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

    // As with the Entry component, set the background color to represent the value
    let color = '';

    if (value === 'good') {
    color = '#68D286';
    } else if (value === 'okay') {
    color = '#FBAD2F';
    } else if (value === 'bad') {
    color = '#EB585C';
    }
    return (
        <Style>
            {`
                .pastEntry {
                    border-bottom: 1px solid #fff;
                    background-color: ${color};
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    font-family: sans-serif;
                    color: #fff;
                    padding: 1em;
                }
                .pastEntry:last-of-type {
                    border-bottom: 0;
                }
                .pastEntry h4 {
                    margin: .5em;
                }
            `}
            <li className="pastEntry">
                <h4>{ formatDate(date) }</h4>
                <span>{ formatValue(value) }</span>
            </li>
        </Style>
    )
}

export default PastEntry;