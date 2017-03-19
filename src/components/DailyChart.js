import React, { Component } from 'react';
import { Doughnut, defaults } from 'react-chartjs-2';

import Style from 'style-it';

class DailyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      good: 0,
      okay: 0,
      bad: 0,
      chartData: {
        labels: ['Good', 'Okay', 'Bad'],
        datasets: [
            {
                data: [0, 0, 0],
                backgroundColor: [
                    '#68D286',
                    '#FBAD2F',
                    '#EB585C'
                ],
                hoverBackgroundColor: [
                '#68D286',
                '#FBAD2F',
                '#EB585C'
                ]
            }
        ],
        options: {
            cutoutPercentage: 50,
            datasetStrokeWidth : 5,
            elements: {
                arc: {
                    borderWidth: 2
                }
            },
            legend: {
                labels: {
                    boxWidth: 20,
                    padding: 25
                }
            }
        }
      }, // chartData
    };
    this.retrieveMealValues = this.retrieveMealValues.bind(this);
    this.calculateMealValues = this.calculateMealValues.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.calculateNumOfEntries = this.calculateNumOfEntries.bind(this);
    this.calculateTotalValue = this.calculateTotalValue.bind(this);
    this.formatValue = this.formatValue.bind(this);
  }
  // retrieve the meal values from the entries data
  retrieveMealValues(entryData) {
    let entries = entryData;
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
      good: goodCount * 10,
      okay: okayCount * 10,
      bad: badCount * 10
    });
  }
  // retreive the values, calculate the occurences and then update the chart with those values
  updateChart(entryData) {
    // console.log('updating')
    this.retrieveMealValues(this.props.data);
    this.setState({
      chartData: {
        labels: ['Good', 'Okay', 'Bad'],
        datasets: [
            {
                data: [`${this.state.good}`, `${this.state.okay}`, `${this.state.bad}`],
                backgroundColor: [
                    '#68D286',
                    '#FBAD2F',
                    '#EB585C'
                ],
                hoverBackgroundColor: [
                '#68D286',
                '#FBAD2F',
                '#EB585C'
                ]
            }
        ],
        options: {
            cutoutPercentage: 50,
            datasetStrokeWidth : 5,
            elements: {
                arc: {
                    borderWidth: 2
                }
            },
            legend: {
                labels: {
                    boxWidth: 20,
                    padding: 25
                }
            }
        }
      }
    })
  }
  calculateNumOfEntries(entryData) {
    let totalEntries = entryData.length;
    return totalEntries;
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
    return majorityValue;
  }
  formatValue = (val) => {
    let newValue = val.substr(0,1).toUpperCase().concat(val.substr(1));
    return newValue;
  }
  componentDidMount() {
    this.updateChart();
    this.loadInterval = setInterval(this.updateChart, 0);
  }
  // interval needs to be cleared to prevent setting state in the unmounted component
  componentWillUnmount() {
    this.loadInterval && clearInterval(this.loadInterval);
    this.loadInterval = false;
  }
  render() {
    defaults.global.legend.display = false;
    return (
      <Style>
        {`
          .chartContainer {
            margin-bottom: 1.5em;
            border-radius: .5em;
            box-shadow: 0px 3px 8px rgba(0,0,0,.2);
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
          .box {
            border-top-right-radius: .5em;
            border-top-left-radius: .5em;
            background-color: rgba(0,116,217,.6);
            border: 2px solid #f1f1f1;
            border-bottom: none;
            padding: 1em;
          }
          .chartInfo {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: .8em;
            border-bottom-right-radius: .5em;
            border-bottom-left-radius: .5em;
            background-color: white;
            font-family: sans-serif;
            color: #4a4a4a;
          }
          .chartInfo span {
            color: #9d9c9c;
          }
          .chartHeading {
            margin: 0;
          }
          .chartHeading span {
            display: block;
            font-size: .8em;
            margin-top: 5px;
          }
          .chartEntries {
            border-right: 1px solid #ccc;
          }
          .infoBox {
            flex: 1;
            text-align: center;
          }
          .divider {
            border-right: 1px solid #ccc;
          }
        `}
        <div className="chartContainer">
          <div className="box">
          <Doughnut data={ this.state.chartData } />
          </div>
          <div className="chartInfo">
            <div className="infoBox divider">            
              <h3 className="chartHeading">Times eaten today: <span>{ this.calculateNumOfEntries(this.props.data) }</span></h3>
            </div>
            <div className="infoBox">
              <h3 className="chartHeading">Mostly: <span>{ this.formatValue(this.calculateTotalValue(this.props.data)) }</span></h3>
            </div>
          </div>
        </div>
      </Style>
    )
  }
}

export default DailyChart;