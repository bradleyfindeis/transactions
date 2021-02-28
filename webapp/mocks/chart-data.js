import { transactions, categories } from './transactions-data'

let data = transactions.map((element) => {
  return { category: element.category, amount: element.amount }
})
const arrAmounts = categories.map(category => (data.map(obj => (obj.category === category ? obj.amount : 0))))
const summedAmounts = arrAmounts.map(arr => (arr.reduce((a, b) => a + b, 0)))
const chartData = {
  amounts: summedAmounts,
  categories: categories
}

export { chartData }
