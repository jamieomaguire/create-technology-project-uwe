// comment
import React, { Component } from 'react';
import TiEdit from 'react-icons/lib/ti/edit';
import TiDelete from 'react-icons/lib/ti/delete';

import Style from 'style-it';

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toBeUpdated: false,
      time: '',
      meal: '',
      value: ''
    };
    /**
     * ************************
     * Bind the functions to the context of EntryForm.
     * Using .bind(this) ensures that the methods have their contexts bound to the component instance.
     * This means props and state can be accessed, and setState, forceUpdate can be called from the bound methods
     * ************************
     */
     this.deleteEntry = this.deleteEntry.bind(this);
     this.updateEntry = this.updateEntry.bind(this);
     this.handleTimeChange = this.handleTimeChange.bind(this);
     this.handleMealChange = this.handleMealChange.bind(this);
     this.handleValueChange = this.handleValueChange.bind(this);
     this.handleEntryUpdate = this.handleEntryUpdate.bind(this);
     this.formatValue = this.formatValue.bind(this);
  }
  updateEntry(e) {
    e.preventDefault();
    // brings up the update field when update link is clicked
    this.setState({ toBeUpdated: !this.state.toBeUpdated });
  }
  handleEntryUpdate(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    // if time or meal changed, set it. if not, leave it pull and PUT request will ignore it
    let time = (this.state.time) ? this.state.time : null;
    let meal = (this.state.meal) ? this.state.meal : null;
    let value = (this.state.value) ? this.state.value : null;
    let entry = { time: time, meal: meal, value: value };
    this.props.onEntryUpdate(id, entry);
    this.setState({
      toBeUpdated: !this.state.toBeUpdated,
      time: '',
      meal: '',
      value: ''
    })
  }
  deleteEntry(e) {
    e.preventDefault();
    let id = this.props.uniqueID;
    this.props.onEntryDelete(id);
    console.log('oops deleted');
  }
  handleMealChange(e) {
    this.setState({ meal: e.target.value });
  }
  handleTimeChange(e) {
    this.setState({ time: e.target.value });
  }
  handleValueChange(e) {
    let arr = [...document.getElementsByName('mealValue')];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked === true) {
        this.setState({ value: arr[i].value });
      }
    }
  }
  formatValue = (val) => {
      let newValue = val.substr(0,1).toUpperCase().concat(val.substr(1));
      return newValue;
  }
  render() {
    let color = '';

    if (this.props.value === 'good') {
      color = '#68D286';
    } else if (this.props.value === 'okay') {
      color = '#FBAD2F';
    } else if (this.props.value === 'bad') {
      color = '#EB585C';
    }
    return (
      <Style>
        {`
          .entryContainer {
            padding: 1em;
            border-bottom: 1px solid #ccc;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top: .5em;
            padding-bottom: .5em;
          }
          .entryContainer:last-of-type {
            border: none;
            padding-bottom: 0;
          }
          .entryOptions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: .5em;
          }
          .entryTime {
            margin: 0;
            font-size: .9em;
            font-family: sans-serif;
            color: #888;
          }
          .entryUpdate {
            margin-left: auto;
            margin-right: 1em;
          }
          .entryDelete,
          .entryUpdate {
            cursor: pointer;
            height: 1.8em;
            width: 1.8em;
            color: #888;
            transition: 300ms ease-out;
          }
          .entryDelete:hover,
          .entryUpdate:hover {
            color: #333;
          }
          .entryValue {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 40px;
            align-self: flex-end;
            margin: 0;
            padding: 0;
          }
          .entryValueColour {
            background-color: ${color};
            display: block;
            height: 1.5em;
            width: 1.5em;
            border-radius: 50%;
            margin-bottom: .5em;
          }
          .entryContent {
            font-family: sans-serif;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: .5em;
          }
          .entryMeal {
          }
          .updateForm {

          }
          .updateTime,
          .updateMeal {
            padding: .5em;
            border: 0;
            border-bottom: 1px solid #ccc;
            display: block;
            margin-bottom: .5em;
          }
          .updateSubmit {
            background-color: #1DA1CD;
            color: #FFF;
            border: none;
            padding: .5em 1em;
            text-transform: uppercase;
          }
          .updateValueGroup {
            margin-bottom: .5em;
          }
          .updateValue {

          }
        `}
        <div className="entryContainer">
          <div className="entryOptions">
            <h3 className="entryTime">{this.props.time}</h3>
            <TiEdit className="entryUpdate" href="#" onClick={ this.updateEntry } />
            <TiDelete className="entryDelete" href="#" onClick={ this.deleteEntry }/>
          </div>
          <div className="entryContent">
            <p className="entryMeal">{this.props.meal}</p>
            <div className="entryValue">
              <span className="entryValueColour"></span>
              <span>{ this.formatValue(this.props.value) }</span>
            </div>
          </div>
          { (this.state.toBeUpdated) 
            ? (<form onSubmit={ this.handleEntryUpdate } className="updateForm">
                <input
                  type='text'
                  placeholder='Update time'
                  value={ this.state.time }
                  className="updateTime"
                  onChange={ this.handleTimeChange } />
                <input
                  type='text'
                  placeholder='Update your meal'
                  value={ this.state.meal }
                  className="updateMeal"
                  onChange={ this.handleMealChange }/>
                <div className="updateValueGroup">
                  <label htmlFor="good"> Good
                    <input
                      type="radio"
                      id="good"
                      value="good"
                      ref="goodRadio"
                      name="mealValue"
                      className="updateValue"
                      onChange={ this.handleValueChange } />
                  </label>
                  <label htmlFor="okay"> Okay
                    <input
                      type="radio"
                      id="okay"
                      value="okay"
                      ref="okayRadio"
                      name="mealValue"
                      className="updateValue"
                      onChange={ this.handleValueChange } />
                  </label>
                  <label htmlFor="bad"> Bad
                    <input
                      type="radio"
                      id="bad"
                      value="bad"
                      ref="badRadio"
                      name="mealValue" 
                      className="updateValue"
                      onChange={ this.handleValueChange }/>
                  </label>
                </div>
                <input 
                  type='submit'
                  className="updateSubmit"
                  value='Update' />
              </form>)
              : null}
        </div>
      </Style>
    )
  }
}