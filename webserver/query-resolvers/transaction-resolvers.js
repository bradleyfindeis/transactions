const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()
  try {
    const transactions = await query.exec()
    return packageModel(transactions)
  } catch(err) {
    return err
  }
}

async function findAll() {
  const query = TransactionModel.find()
  try {
    const transactions = await query.exec()
  
    return packageModel(transactions)
  } catch(err) {
    return err
  }
}

async function findOne (id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

module.exports = {
  find,
  findOne,
  findAll
}
