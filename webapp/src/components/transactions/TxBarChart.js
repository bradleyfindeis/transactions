import React from 'react'
import { Bar } from 'react-chartjs-2'
// import { arrayOf, string, bool, number, shape } from 'prop-types'
import { arrayOf, string, number } from 'prop-types'

export class TxBarChart extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      labels: [],
      amount: [],
      loading: true
    }
  }

  componentDidMount () {
    this.setState({ loading: false })
  }

  render () {
    if (!this.state.loading) {
      return (
        <Bar data={{
          labels: this.props.labels,
          datasets: [{
            label: 'Amount By Category',
            backgroundColor: ['rgba(255,99,132,0.2)', '#FF6384', '#36A2EB', '#FFCE56', 'rgba(75,192,192,0.4)'],
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: this.props.amounts
          }],
          scales: {
            yAxes: [{
              ticks: {
                callback (value, index, values) {
                  return '$' + value
                }
              }
            }]
          }
        }}
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
TxBarChart.propTypes = {
  amounts: arrayOf(number),
  labels: arrayOf(string)
}
