// comment
import React, { Component } from 'react';

import style from './style';

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
  render() {
    return (
      <div style={ style.container }>
        <h3>{this.props.time}</h3>
        <span>{this.props.meal}</span>
        <p>{this.props.value}</p>
        <a href="#" onClick={ this.updateEntry }>update</a>
        <a href="#" onClick={ this.deleteEntry }>delete</a>
        { (this.state.toBeUpdated) 
          ? (<form onSubmit={ this.handleEntryUpdate }>
              <input
                type='text'
                placeholder='Update time'
                value={ this.state.time }
                onChange={ this.handleTimeChange } />
              <input
                type='text'
                placeholder='Update your meal'
                value={ this.state.meal }
                onChange={ this.handleMealChange }/>
              <input 
                type='submit'
                value='Update' />
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
            </form>)
            : null}
      </div>
    )
  }
}