// comment box
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
  loadEntriesFromServer() {
    axios.get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      })
  }
  handleEntrySubmit(entry) {
    let entries = this.state.data;
    entry.id = Date.now();
    let newEntries = entries.concat([entry]);
    this.setState({ data: newEntries });
    axios.post(this.props.url, entry)
      .catch(err => {
        console.error(err);
        this.setState({ data: entries });
      });
  }

  handleEntryDelete(id) {
    console.log('deleting...')
    axios.delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Entry deleted!');
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleEntryUpdate(id, entry) {
    console.log('updating...')
    // sends the entry id and new time/meal to the api
    axios.put(`${this.props.url}/${id}`, entry)
      .catch(err => {
        console.log(err);
      });
    console.log(this.state.data)
  }
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
      console.log(totalGood, totalOkay, totalBad)
    } else if (totalBad > totalGood && totalBad > totalOkay) {
      majorityValue = 'bad';
      console.log(totalGood, totalOkay, totalBad)
    } else {
      majorityValue = 'okay';
    }

    console.log(majorityValue);
    return majorityValue;
  }
  // TEST FOR COMPLETE DAY
  handlePastEntrySubmit() {
    this.calculateTotalValue(this.state.data);

      // axios.delete(`${this.props.url}/${el._id}`)
      // .then(res => {
      //   console.log('Entry deleted!');
      // })
      // .catch(err => {
      //   console.error(err);
      // });
    this.loadEntriesFromServer();
  }
  // END TEST FOR COMPLETE DAY

  /** 
   * upon loading, make an axios call to the url and fill the state with database Entries
   * then use the setInterval to look for new entries every 2 seconds 
   */
  componentDidMount() {
    this.loadEntriesFromServer();
    this.loadInterval = setInterval(this.loadEntriesFromServer, 1000);
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