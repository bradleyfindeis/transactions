import { transactions } from './transactions-data'
import _ from 'underscore'

let allDates = transactions.map(el => el.created)
let dates = _.uniq(allDates)

let data = transactions.map((element) => {
  return { date: element.created, amount: element.amount }
})
const arrAmounts = dates.map(date => (data.map(obj => (obj.date === date ? obj.amount : 0))))
const summedAmounts = arrAmounts.map(arr => (arr.reduce((a, b) => a + b, 0)))
const pieData = {
  amounts: summedAmounts,
  dates: dates
}

export { pieData }
