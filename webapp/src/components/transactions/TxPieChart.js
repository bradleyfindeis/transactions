import React from 'react'
import { Line } from 'react-chartjs-2'
// import { arrayOf, string, bool, number, shape } from 'prop-types'
import { arrayOf, string, number } from 'prop-types'

export class TxPieChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      labels: [],
      amount: [],
      loading: true,
      colors: ['#A4BAB7', '#EFF2C0', '#A52422', '#D6E5E3', '#CACFD6', '#A6B1E1', '#E3F09B', '#F79F79', '#87B6A7', '#F7D08A', '#970c66', '#424874', 'rgba(255,99,132,0.2)', '#FF6384', '#36A2EB', '#FFCE56', 'rgba(75,192,192,0.4)', '#EF5D60'],
      data: {
        labels: this.props.dates,
        datasets: [
          {
            data: this.props.amounts,
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            title: {
              display: true,
              text: 'Amount by Date'
            }
          }
        ]
      }
    }
  }

  componentDidMount () {
    this.setState({ loading: false })
  }

  render () {
    if (!this.state.loading) {
      return (
        <Line
          data={this.state.data}
        />
      )
    }
    if (this.state.loading) {
      return (
        <p>loading...</p>
      )
    }
  }
}
TxPieChart.propTypes = {
  amounts: arrayOf(number),
  dates: arrayOf(string)
}
