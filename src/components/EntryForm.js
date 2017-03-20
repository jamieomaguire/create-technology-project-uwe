// comment form
import React, { Component } from 'react';

import Style from 'style-it';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { time: '', meal: '', value: '' };
    /**
     * ************************
     * Bind the functions to the context of EntryForm.
     * Using .bind(this) ensures that the methods have their contexts bound to the component instance.
     * This means props and state can be accessed, and setState, forceUpdate can be called from the bound methods
     * ************************
     */
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleMealChange = this.handleMealChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTimeChange(e) {
    this.setState({ time: e.target.value });
  }
  handleMealChange(e) {
    this.setState({ meal: e.target.value });
  }
  handleValueChange(e) {
    let arr = [...document.getElementsByName('mealValue')];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].checked === true) {
        this.setState({ value: arr[i].value });
      }
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    let time = this.state.time.trim();
    let meal = this.state.meal.trim();
    let value = this.state.value.trim();
    if (!meal || !time || !value) {
      return;
    }
    this.props.onEntrySubmit({ time: time, meal: meal, value: value });
    this.setState({ time: '', meal: '', value: '' });
    // reset form
    let timeInput = this.refs.timeInput;
    let mealInput = this.refs.mealInput;
    let goodRadio = this.refs.goodRadio;
    let okayRadio = this.refs.okayRadio;
    let badRadio = this.refs.badRadio;
    timeInput.value = "";
    mealInput.value = "";
    goodRadio.checked = false;
    okayRadio.checked = false;
    badRadio.checked = false;
  }
  render() {
    return (
      <Style>
        {`
          .container {
            border: 1px solid #ccc;
            padding: 1em;
            margin-bottom: 1em;
            border-radius: .5em;
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
          }
          .textInput {
            width: 100%;
            padding: .5em;
            height: 4em;
            font-size: .8em;
            margin-bottom: 1em;
            border: none;
            border-radius: 0;
            border-bottom: 1px solid #ccc;
          }
          .radioLabel:first-of-type {
            margin-top: 1em;
          }
          .radioLabel {
            margin-left: 2em;
            display: block;
            font-family: sans-serif;
            color: #4a4a4a;
            margin-bottom: 1em;
            position: relative;
            cursor: pointer;
            -webkit-touch-callout: none;
              -webkit-user-select: none;
                 -moz-user-select: none;
                  -ms-user-select: none;
                      user-select: none;
          }
          .formSubmit {
            background-color: #68D286;
            color: #FFF;
            border: none;
            padding: .5em 1em;
            font-size: .8em;
            text-transform: uppercase;
            align-self: flex-start;
            cursor: pointer;
          }
          .radioLabel input[type="radio"] {
            position: absolute;
            visibility: hidden;
          }
          .radioCheck {
            position: absolute;
            height: 25px;
            width: 25px;
            margin-top: -5px;
            left: -100%;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #ccc;
          }
          .radioLabel:hover .radioCheck {
            border: 2px solid lightgreen;
          }
          input[type=radio]:checked ~ .radioCheck, .radioCheck:hover {
            border: 2px solid lightgreen;
          }
          .checkSelect {
            display: block;
            border-radius: 50%;
          }
          input[type=radio]:checked ~ .radioCheck .checkSelect {
            background-color: lightgreen;
            height: 18px;
            width: 18px;
          }
        `}
      <form onSubmit={ this.handleSubmit } className="container" >
        <input
          className="textInput"
          type='text'
          placeholder='When did you eat?'
          value={ this.state.time }
          ref="timeInput"
          onChange={ this.handleTimeChange } />
        <input
          className="textInput"
          type='text'
          placeholder='What did you have?'
          value={ this.state.text }
          ref="mealInput"
          onChange={ this.handleMealChange } /> 
        <div>
          <label htmlFor="good" className="radioLabel">
            <input
              type="radio"
              id="good"
              value="good"
              ref="goodRadio"
              name="mealValue"
              onChange={ this.handleValueChange } />
              <span className="radioCheck"><span className="checkSelect"></span></span>
              Good
          </label>
          <label htmlFor="okay" className="radioLabel">
            <input
              type="radio"
              id="okay"
              value="okay"
              ref="okayRadio"
              name="mealValue"
              onChange={ this.handleValueChange } />
              <span className="radioCheck"><span className="checkSelect"></span></span>
              Okay
          </label>
          <label htmlFor="bad" className="radioLabel">
            <input
              type="radio"
              id="bad"
              value="bad"
              ref="badRadio"
              name="mealValue" 
              onChange={ this.handleValueChange }/>
              <span className="radioCheck"><span className="checkSelect"></span></span>
              Bad
          </label>
        </div>
        <button className="formSubmit">Add</button>
      </form>
      </Style>
    )
  }
}

export default EntryForm;