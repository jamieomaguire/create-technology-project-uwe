// This is the main container for the entries section of the application
// It contains the chart, form and list of entries

import React, { Component } from 'react';
import axios from 'axios';
import EntryList from './EntryList';
import EntryForm from './EntryForm';
import DailyChart from './DailyChart';

class EntryBox extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
    };
    /**
     * ************************
     * Bind the functions to the context of EntryForm.
     * Using .bind(this) ensures that the methods have their contexts bound to the component instance.
     * This means props and state can be accessed, and setState, forceUpdate can be called from the bound methods
     * ************************
     */
    this.loadEntriesFromServer = this.loadEntriesFromServer.bind(this);
    this.handleEntrySubmit = this.handleEntrySubmit.bind(this);
    this.handleEntryDelete = this.handleEntryDelete.bind(this);
    this.handleEntryUpdate = this.handleEntryUpdate.bind(this);
    this.handlePastEntrySubmit = this.handlePastEntrySubmit.bind(this);
    this.calculateTotalValue = this.calculateTotalValue.bind(this);
  }
  // axios is used to make ajax calls to get the data
  // this is then loaded into the state and passed down to the child components as props
  loadEntriesFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  // This updates the state to contain new entries
  handleEntrySubmit(entry) {
    let entries = this.state.data;
    entry.id = Date.now();
    let newEntries = entries.concat([entry]);
    this.setState({ data: newEntries });
    axios.post(this.props.url, entry)
      .catch(err => {
        this.setState({ data: entries });
      });
  }
  // Delete entries
  handleEntryDelete(id) {
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Entry deleted!');
      })
      .catch(err => {
        console.error(err);
      });
  }
  // Update entries
  handleEntryUpdate(id, entry) {
    // sends the entry id and new time/meal to the api
    axios.put(`${this.props.url}/${id}`, entry)
      .catch(err => {
        console.log(err);
      });
    console.log(this.state.data)
  }
  // This is part of the set of functions used to update the past entries data
  // It works out the average value for the day and passes that value on to whereever it is needed
  calculateTotalValue(entries) {
    let todaysEntries = entries;
    let totalGood = 0;
    let totalOkay = 0;
    let totalBad = 0;
    let majorityValue = '';

    todaysEntries.map((el) => {
      switch(el.value) {
        case 'good':
          totalGood++;
          break;
        case 'okay':
          totalOkay++;
          break;
        case 'bad':
          totalBad++;
          break;
          default:
          break;
      }
    });

    if (totalGood > totalOkay && totalGood > totalBad) {
      majorityValue = 'good';
    } else if (totalOkay > totalGood && totalOkay > totalBad) {
      majorityValue = 'okay';
    } else if (totalBad > totalGood && totalBad > totalOkay) {
      majorityValue = 'bad';
    } else {
      majorityValue = 'okay';
    }

    return majorityValue;
  }
  // This is called when complete day is clicked
  // It will work out the average value for the day using the calculateTotalValue function
  // and then post that to the database using axios
  // it will then wipe the data for the current day as to reset the state using axios.delete
  handlePastEntrySubmit() {
    let pastEntryValue = this.calculateTotalValue(this.state.data);
    let pastEntryDate = Date().toString();
    let newPastEntry = {};
    newPastEntry.date = pastEntryDate;
    newPastEntry.value = pastEntryValue

    axios.post(this.props.url2, newPastEntry)
      .catch(err => {
        console.error(err);
      });   
    let entries = this.state.data;

    entries.map((el) => {
    axios.delete(`${this.props.url}/${el._id}`)
      .then(res => {
        console.log('Entry deleted!');
      })
      .catch(err => {
        console.error(err);
      });
    })
  }

  /** 
   * upon loading, make an axios call to the url and fill the state with database Entries
   * then use the setInterval to look for new entries every 2 seconds 
   */
  componentDidMount() {
    this.loadEntriesFromServer();
    this.loadInterval = setInterval(this.loadEntriesFromServer, this.props.pollInterval);
  }
  // interval needs to be cleared to prevent setting state in the unmounted component
  componentWillUnmount() {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }
  render() {
    return (
      <div>
        <DailyChart data={ this.state.data } />
        <EntryForm onEntrySubmit={ this.handleEntrySubmit } />
        <EntryList 
          onEntryDelete={ this.handleEntryDelete }
          onEntryUpdate={ this.handleEntryUpdate }
          onCompleteDay={ this.handlePastEntrySubmit }
          data={ this.state.data } />
      </div>
    )
  }
}

export default EntryBox;