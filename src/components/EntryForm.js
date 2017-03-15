// comment form
import React, { Component } from 'react';

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
      <form onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='What time did you eat?'
          value={ this.state.time }
          ref="timeInput"
          onChange={ this.handleTimeChange } />
        <input
          type='text'
          placeholder='What did you have?'
          value={ this.state.text }
          ref="mealInput"
          onChange={ this.handleMealChange } /> 
        <div>
          <label htmlFor="good"> Good
            <input
              type="radio"
              id="good"
              value="good"
              ref="goodRadio"
              name="mealValue"
              onChange={ this.handleValueChange } />
          </label>
          <label htmlFor="okay"> Okay
            <input
              type="radio"
              id="okay"
              value="okay"
              ref="okayRadio"
              name="mealValue"
              onChange={ this.handleValueChange } />
          </label>
          <label htmlFor="bad"> Bad
            <input
              type="radio"
              id="bad"
              value="bad"
              ref="badRadio"
              name="mealValue" 
              onChange={ this.handleValueChange }/>
          </label>
        </div>
        <input
          type='submit'
          value='Post' />
      </form>
    )
  }
}

export default EntryForm;