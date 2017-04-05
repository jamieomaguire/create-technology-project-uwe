// This is the individual entry component
// Many of these will be rendered to a list when the entries are mapped through
// in the EntryList component

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
  checkRadio = (e) => {
    if (e.which === 32 || e.which === 13) {
      e.target.children[0].checked = true;
    }
  }
  render() {
    // choose a colour to use as the background depending on the meal value
    // good = green
    // okay = yellow
    // bad = red
    let color = '';
    if (this.props.value === 'good') {
      color = '#68D286';
    } else if (this.props.value === 'okay') {
      color = '#FBAD2F';
    } else if (this.props.value === 'bad') {
      color = '#EB585C';
    }
    // the colour variable is used below in the background-color 
    return (
      <Style>
        {`
          .entryContainer {
            border-bottom: 1px solid #fff;
            padding: 1em;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top: .5em;
            padding-bottom: .5em;
            background-color: ${color};
            color: white;
          }
          .entryContainer:first-of-type {
            border-top-left-radius: .5em;
            border-top-right-radius: .5em;
          }
          .entryContainer:last-of-type {
            padding-bottom: 0;
          }
          .entryOptions {
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: .5em;
          }
          .entryTime {
            margin: 0;
            font-size: .9em;
            font-family: sans-serif;
          }
          .entryUpdate {
            margin-left: auto;
            margin-right: 1em;
          }
          .entryDelete,
          .entryUpdate {
            cursor: pointer;
            height: 1.5em;
            width: 1.5em;
            transition: 300ms ease-out;
          }
          .entryDelete:hover,
          .entryUpdate:hover {
            transform: scale(1.2);
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
          .updateTime,
          .updateMeal {
            padding: .5em;
            border: 0;
            border-bottom: 1px solid #fff;
            display: block;
            margin-bottom: .5em;
            border-radius: 0;
            background: none;
            color: white;
          }
          ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
            color: white;
          }
          ::-moz-placeholder { /* Firefox 19+ */
            color: white;
          }
          :-ms-input-placeholder { /* IE 10+ */
            color: white;
          }
          :-moz-placeholder { /* Firefox 18- */
            color: white;
          }
          .updateSubmit {
            background-color: #1DA1CD;
            color: #FFF;
            border: none;
            padding: .5em 1em;
            text-transform: uppercase;
            margin-bottom: 1em;
          }
          .updateValueGroup {
            margin-bottom: .5em;
          }
          .updateRadioLabel input[type="radio"] {
            position: absolute;
            visibility: hidden;
          }
          .updateRadioLabel {
            display: block;
            margin-bottom: .5em;
            position: relative;
            cursor: pointer;
            font-family: sans-serif;
          }
          .updateRadioLabel:first-of-type {
            margin-top: 1em;
          }
          .updateRadioCheck {
            position: absolute;
            height: 15px;
            width: 15px;
            border-radius: 50%;
            left: 3em;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #fff;
          }
          .updateRadioLabel:hover .updateRadioCheck {
            border: 2px solid #fff;
          }
          input[type=radio]:checked ~ .updateRadioCheck, .updateRadioCheck:hover {
            border: 2px solid #fff;
          }
          .updateCheckSelect {
            display: block;
            border-radius: 50%;
          }
          input[type=radio]:checked ~ .updateRadioCheck .updateCheckSelect {
            background-color: #fff;
            border: 1px solid ${color};
            height: 10px;
            width: 10px;
          }
        `}
        <div className="entryContainer">

          <div className="entryOptions">
            <h3 className="entryTime">{this.props.time}</h3>
            {/* The update and delete icons */}
            <TiEdit className="entryUpdate" href="#" onClick={ this.updateEntry } />
            <TiDelete className="entryDelete" href="#" onClick={ this.deleteEntry }/>
          </div>

          {/* The entry meal */}
          <div className="entryContent">
            <p className="entryMeal">{this.props.meal}</p>
          </div>

          {/* This is the update form. It is only rendered if the toBeUpdated boolean in state is set to true */}
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
                  <label htmlFor="updateGood" className="updateRadioLabel" onKeyPress={this.checkRadio} tabIndex="0">
                    <input
                      type="radio"
                      id="updateGood"
                      value="good"
                      ref="goodRadio"
                      name="mealValue"
                      className="updateValue"
                      onChange={ this.handleValueChange } />
                      <span className="updateRadioCheck"><span className="updateCheckSelect"></span></span>
                      Good
                  </label>
                  <label htmlFor="updateOkay" className="updateRadioLabel" onKeyPress={this.checkRadio} tabIndex="0">
                    <input
                      type="radio"
                      id="updateOkay"
                      value="okay"
                      ref="okayRadio"
                      name="mealValue"
                      className="updateValue"
                      onChange={ this.handleValueChange } />
                      <span className="updateRadioCheck"><span className="updateCheckSelect"></span></span>
                      Okay
                  </label>
                  <label htmlFor="updateBad" className="updateRadioLabel" onKeyPress={this.checkRadio} tabIndex="0">
                    <input
                      type="radio"
                      id="updateBad"
                      value="bad"
                      ref="badRadio"
                      name="mealValue" 
                      className="updateValue"
                      onChange={ this.handleValueChange }/>
                      <span className="updateRadioCheck"><span className="updateCheckSelect"></span></span>
                      Bad
                  </label>
                </div>
                <button type="submit" className="updateSubmit">Submit</button>
              </form>)
              : null}
        </div>
      </Style>
    )
  }
}