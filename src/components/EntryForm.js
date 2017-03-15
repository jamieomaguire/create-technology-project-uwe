// comment form
import React, { Component } from 'react';

class EntryForm extends Component {
  constructor(props) {
    super(props);
    this.state = { time: '', meal: '' };
    /**
     * ************************
     * Bind the functions to the context of EntryForm.
     * Using .bind(this) ensures that the methods have their contexts bound to the component instance.
     * This means props and state can be accessed, and setState, forceUpdate can be called from the bound methods
     * ************************
     */
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleMealChange = this.handleMealChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleTimeChange(e) {
    this.setState({ time: e.target.value });
  }
  handleMealChange(e) {
    this.setState({ meal: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    let time = this.state.time.trim();
    let meal = this.state.meal.trim();
    if (!meal || !time) {
      return;
    }
    this.props.onEntrySubmit({ time: time, meal: meal });
    this.setState({ time: '', meal: '' });
  }
  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <input
          type='text'
          placeholder='What time did you eat?'
          value={ this.state.time }
          onChange={ this.handleTimeChange } />
        <input
          type='text'
          placeholder='What did you have?'
          value={ this.state.text }
          onChange={ this.handleMealChange } /> 
        <input
          type='submit'
          value='Post' />
      </form>
    )
  }
}

export default EntryForm;