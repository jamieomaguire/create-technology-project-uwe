import React, { Component } from 'react';

class DailyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      okay: 0,
      bad: 0
    };
    this.retrieveMealValues = this.retrieveMealValues.bind(this);
    this.calculateMealValues = this.calculateMealValues.bind(this);
  }
  // retrieve the meal values from the entries data
  retrieveMealValues() {
    let entries = this.props.data;
    let values = entries.map((el) => {
      return el.value;
    });
    // calculate the meal values and set the state
    this.calculateMealValues(values);
  }
  // calculate the number of each meal value
  calculateMealValues(vals) {
    let values = vals;
    // create values to use when reducing the values array
    let good = 'good';
    let okay = 'okay';
    let bad = 'bad';
    // calculate the occurences of good, okay and bad in the values array
    let goodCount = values.reduce((n, val) => {
      return n + (val === good);
    }, 0);
    let okayCount = values.reduce((n, val) => {
      return n + (val === okay);
    }, 0);
    let badCount = values.reduce((n, val) => {
      return n + (val === bad);
    }, 0);
    this.setState({
      good: goodCount,
      okay: okayCount,
      bad: badCount
    });
  }
  // load entries into state
  componentWillMount() {
    setInterval(
      this.retrieveMealValues, 0
      // this.calculateMealValues, 1000
    );

  }
  render() {
    return (
      <div>
        <h3>Good is: {this.state.good > 0 ? this.state.good : null}</h3>
        <h3>Okay is: {this.state.okay > 0 ? this.state.okay : null}</h3>
        <h3>Bad is: {this.state.bad > 0 ? this.state.bad : null}</h3>
      </div>
    )
  }
}

export default DailyChart;