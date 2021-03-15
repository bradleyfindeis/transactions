import React from 'react'
import MaterialTable from 'material-table'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { Edit, Delete, Check, ChevronRight, SaveAlt, FilterList, FirstPage, LastPage, ChevronLeft, Search, Remove, ViewColumn } from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog'
import { DialogTitle, DialogContent, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { categories, users } from '../../../mocks/transactions-data'
import { merchants } from '../../../mocks/vendor-data'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { css } from '@emotion/css'

export class TxTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [
        { field: 'amount', title: 'Amount', type: 'currency', align: 'left', hidden: false },
        { field: 'romanAmount', title: 'Roman Numeral Amount', align: 'left', hidden: true },
        { field: 'credit', title: 'Credit', align: 'left', width: 100 },
        { field: 'debit', title: 'Debit', align: 'left', width: 100 },
        { field: 'description', title: 'Description', align: 'left', width: 300 },
        { field: 'merchantName', title: 'Merchant' },
        { field: 'userName', title: 'User', align: 'left' },
        { field: 'id', title: 'id', hidden: true }
      ],
      modalOpen: false,
      rowData: {},
      transactions: this.props.transactions,
      trueFalse: ['true', 'false'],
      createTransactionModalOpen: false,
      amount: '',
      credit: false,
      debit: false,
      category: '',
      merchantName: '',
      description: '',
      userName: '',
      userId: '',
      merchants: merchants,
      users: users
    }
  }

  componentDidMount () {
    const addRomans = this.state.transactions.map(el => ({ ...el, romanAmount: this.convertToRoman(el.amount) }))
    this.setState({ transactions: addRomans })
  }

  romans () {
    const columns = this.state.columns.map(col => col.field === 'amount' || col.field === 'romanAmount' ? { ...col, hidden: !col.hidden } : col)
    this.setState({ columns: columns })
  }

  convertToRoman (num) {
    const decimalValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    const romanNumeral = [
      'M',
      'CM',
      'D',
      'CD',
      'C',
      'XC',
      'L',
      'XL',
      'X',
      'IX',
      'V',
      'IV',
      'I'
    ]
    let romanized = ''
    // for each of the decimal values in decimalValue
    for (let index = 0; index < decimalValue.length; index++) {
      // as long as the decimalValue is less than or equal to the number
      while (decimalValue[index] <= num) {
        // romanized is equal to whatever romanized is plus the roman numeral
        romanized += romanNumeral[index]
        // number is equal to whatever num is minus the decimalValue
        num -= decimalValue[index]
      }
    }
    return romanized
  }

  handleClose () {
    this.setState({ modalOpen: false })
    this.setState({ createTransactionModalOpen: false })
  }

  handleEdit () {
    const rowData = {
      amount: this.state.rowData.amount,
      category: this.state.rowData.category,
      created: this.state.rowData.created,
      credit: this.state.rowData.credit,
      debit: this.state.rowData.debit,
      id: this.state.rowData.id,
      merchantName: this.state.rowData.merchantName,
      userId: this.state.rowData.userId,
      userName: this.state.rowData.userName,
      description: this.state.rowData.description
    }
    const updatedTransaction = this.props.transactions.map(el => {
      return el.id === rowData.id ? rowData : el
    })
    this.setState({ transactions: updatedTransaction })
    this.setState({ modalOpen: false })
  }

  handleDelete (event, rowData) {
    const removedTransaction = this.state.transactions.filter(el => el.id !== rowData.id)
    this.setState({ transactions: removedTransaction })
  }

  handleAmountChange (val) {
    this.setState({ rowData: { ...this.state.rowData, amount: val } })
  }

  handleCreditChange (val) {
    this.setState({ rowData: { ...this.state.rowData, credit: val } })
  }

  handleDebitChange (val) {
    this.setState({ rowData: { ...this.state.rowData, debit: val } })
  }

  handleDescriptionChange (val) {
    this.setState({ rowData: { ...this.state.rowData, description: val } })
  }

  handleCategoryChange (val) {
    this.setState({ rowData: { ...this.state.rowData, category: val } })
  }

  handleUserChange (userName, id) {
    this.setState({ rowData: { ...this.state.rowData, userName: userName } })
    this.setState({ rowData: { ...this.state.rowData, userId: id } })
  }

  handleMerchantChange (val) {
    this.setState({ rowData: { ...this.state.rowData, merchantName: val } })
  }

  handleNewAmountChange (val) {
    this.setState({ amount: val })
  }

  handleNewCreditChange (val) {
    this.setState({ credit: val })
  }

  handleNewDebitChange (val) {
    this.setState({ debit: val })
  }

  handleNewDescriptionChange (val) {
    this.setState({ description: val })
  }

  handleNewCategoryChange (val) {
    this.setState({ category: val })
  }

  handleNewUserChange (val) {
    this.setState({ userName: val })
  }

  handleNewMerchantChange (val) {
    this.setState({ merchantName: val })
  }

  openCreateTransactionModal () {
    this.setState({ createTransactionModalOpen: true })
  }

  createTransaction () {
    const newId = this.state.transactions.length + 2
    const newTransaction = {
      amount: this.state.amount,
      credit: this.state.credit,
      debit: this.state.debit,
      category: this.state.category,
      merchantName: this.state.merchantName,
      description: this.state.description,
      userName: this.state.userName,
      id: newId
    }
    this.setState({ transactions: [newTransaction, ...this.state.transactions] })
    this.setState({ createTransactionModalOpen: false })
    this.setState({ amount: '' })
    this.setState({ credit: '' })
    this.setState({ debit: '' })
    this.setState({ category: '' })
    this.setState({ merchantName: '' })
    this.setState({ description: '' })
    this.setState({ userName: '' })
    this.setState({ toastOpen: true })
  }

  handleToastClose (event, reason) {
    if (reason === 'clickaway') {
      return
    }
    this.setState({ toastOpen: false })
  }

  render () {
    const color = 'gray'
    return (
      <div>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={3000}
          onClose={(event, reason) => this.handleToastClose(event, reason)}
          open={this.state.toastOpen}
        >
          <Alert
            onClose={(event, reason) => this.handleToastClose(event, reason)}
            severity='success'
          >
            Tranaction was successfully created!
          </Alert>
        </Snackbar>
        <div
          style={{ marginLeft: '65%', marginTop: '20px', marginBottom: '20px' }}
        >
          <Button
            className={css`
              background-color: hotpink;
              font-size: 14px;
              border-radius: 4px;
              margin-right: 20px;
              margin-top: 20px;
              width: 275px;
              height: 35px;
              &:hover {
                color: ${color};
              }
            `}
            onClick={() => this.romans()}
          >
            { this.state.columns[0].hidden ? 'Convert to Amount' : 'Convert to Roman Numerals' }
          </Button>
          <Button
            color='primary'
            onClick={() => this.openCreateTransactionModal()}
            style={{ marginTop: '20px', backgroundColor: '#53a738', width: '200px' }}
            variant='contained'
          >
            Create Transaction
          </Button>
        </div>
        <MaterialTable
          actions={[
            {
              icon: Edit,
              iconProps: { style: { color: '#0dbf49' } },
              tooltip: 'Edit Transaction',
              onClick: (event, rowData) => {
                this.setState({ modalOpen: true })
                this.setState({ rowData: rowData })
              }
            },
            {
              icon: Delete,
              iconProps: { style: { color: '#ed4242' } },
              tooltip: 'Delete Transaction',
              onClick: (event, rowData) => this.handleDelete(event, rowData)
            }
          ]}
          columns={this.state.columns}
          data={this.state.transactions}
          icons={{
            Check: Check,
            Export: SaveAlt,
            Filter: FilterList,
            FirstPage: FirstPage,
            LastPage: LastPage,
            NextPage: ChevronRight,
            PreviousPage: ChevronLeft,
            Search: Search,
            ThirdStateCheck: Remove,
            ViewColumn: ViewColumn,
            DetailPanel: ChevronRight
          }}
          options={{
            actionsColumnIndex: -1,
            pageSize: 10,
            search: false
          }}
          title='All Transactions'
        />
        <Dialog
          onClose={() => this.handleClose()}
          open={this.state.modalOpen}
          style={{ maxheight: '500px !important', width: '180px !importtant' }}
        >
          <DialogTitle>
            Edit Transaction
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                id='outlined-basic'
                label='Amount'
                onChange={(event) => this.handleAmountChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}
                value={this.state.rowData.amount}
              />
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}>
                <InputLabel id='credit-label'>Credit</InputLabel>
                <Select
                  id='credit'
                  labelId='credit-label'
                  value={this.state.rowData.credit}
                >
                  {this.state.trueFalse.map(val => (
                    <MenuItem
                      key={val + Math.random()}
                      onClick={() => this.handleCreditChange(val)}
                      value={val}
                    >
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}>
                <InputLabel id='debit-label'>Debit</InputLabel>
                <Select
                  id='debit'
                  labelId='debit-label'
                  value={this.state.rowData.debit}
                >
                  {this.state.trueFalse.map(val => (
                    <MenuItem
                      key={val + Math.random()}
                      onClick={() => this.handleDebitChange(val)}
                      value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id='outlined-basic'
                label='Description'
                onChange={(event) => this.handleDescriptionChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}
                value={this.state.rowData.description}
              />
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}>
                <InputLabel id='category-label'>Category</InputLabel>
                <Select
                  id='category'
                  labelId='category-label'
                  value={this.state.rowData.category}
                >
                  {categories.map(val => (
                    <MenuItem
                      key={val + Math.random()}
                      onClick={() => this.handleCategoryChange(val)}
                      value={val}
                    >
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}>
                <InputLabel id='merchant-label'>Merchant</InputLabel>
                <Select
                  id='merchant'
                  labelId='merchant-label'
                  value={this.state.rowData.merchantName}
                >
                  {merchants.map(val => (
                    <MenuItem
                      key={val.id + Math.random()}
                      onClick={() => this.handleMerchantChange(val.name)}
                      value={val.name}
                    >
                      {val.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}>
                <InputLabel id='user-label'>User</InputLabel>
                <Select
                  id='user'
                  labelId='user-label'
                  value={this.state.rowData.userName}
                >
                  {users.map(val => (
                    <MenuItem
                      key={val.id + Math.random()}
                      onClick={() => this.handleUserChange(`${val.first_name} ${val.last_name}`, val.id)}
                      value={`${val.first_name} ${val.last_name}`}
                    >
                      {`${val.first_name} ${val.last_name}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
            <div style={{ float: 'right' }}>
              <Button
                onClick={() => this.handleClose()}
                style={{ height: '30px', width: '100px', backgroundColor: '#6c757d', color: '#ffffff', borderRadius: '3px', fontFamily: 'inherit', borderColor: '#6c757d', borderWidth: '0' }}
              >
                Cancel
              </Button>{' '}
              <Button
                onClick={() => this.handleEdit()}
                style={{ height: '30px', width: '100px', backgroundColor: '#28a745', color: '#ffffff', borderRadius: '3px', fontFamily: 'inherit', borderColor: '#28a745', borderWidth: '0' }}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog
          onClose={() => this.handleClose()}
          open={this.state.createTransactionModalOpen}
          style={{ maxheight: '500px !important', width: '180px !importtant' }}
        >
          <DialogTitle>
            Create a Transaction
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                id='outlined-basic'
                label='Amount'
                onChange={(event) => this.handleNewAmountChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}
                value={this.state.amount}
              />
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}>
                <InputLabel id='credit-label'>Credit</InputLabel>
                <Select
                  id='credit'
                  labelId='credit-label'
                  value={this.state.credit}
                >
                  {this.state.trueFalse.map(val => (
                    <MenuItem
                      key={val + Math.random()}
                      onClick={() => this.handleNewCreditChange(val)}
                      value={val}
                    >
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}>
                <InputLabel id='debit-label'>Debit</InputLabel>
                <Select
                  id='debit'
                  labelId='debit-label'
                  value={this.state.debit}
                >
                  {this.state.trueFalse.map(val => (
                    <MenuItem
                      key={val + Math.random()}
                      onClick={() => this.handleNewDebitChange(val)}
                      value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                id='outlined-basic'
                label='Description'
                onChange={(event) => this.handleNewDescriptionChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}
                value={this.state.description}
              />
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}>
                <InputLabel id='category-label'>Category</InputLabel>
                <Select
                  id='category'
                  labelId='category-label'
                  value={this.state.category}
                >
                  {categories.map(val => (
                    <MenuItem
                      key={val + Math.random()}
                      onClick={() => this.handleNewCategoryChange(val)}
                      value={val}
                    >
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}>
                <InputLabel id='merchant-label'>Merchant</InputLabel>
                <Select
                  id='merchant'
                  labelId='merchant-label'
                  value={this.state.merchantName}
                >
                  {merchants.map(val => (
                    <MenuItem
                      key={val.id + Math.random()}
                      onClick={() => this.handleNewMerchantChange(val.name)}
                      value={val.name}
                    >
                      {val.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}>
                <InputLabel id='user-label'>User</InputLabel>
                <Select
                  id='user'
                  labelId='user-label'
                  value={this.state.userName}
                >
                  {users.map(val => (
                    <MenuItem
                      key={val.id + Math.random()}
                      onClick={() => this.handleNewUserChange(`${val.first_name} ${val.last_name}`)}
                      value={`${val.first_name} ${val.last_name}`}
                    >
                      {`${val.first_name} ${val.last_name}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </form>
            <div style={{ float: 'right' }}>
              <Button
                onClick={() => this.handleClose()}
                style={{ height: '30px', width: '100px', backgroundColor: '#6c757d', color: '#ffffff', borderRadius: '3px', fontFamily: 'inherit', borderColor: '#6c757d', borderWidth: '0' }}
              >
                Cancel
              </Button>{' '}
              <Button
                onClick={() => this.createTransaction()}
                style={{ height: '30px', width: '100px', backgroundColor: '#53a738', color: '#ffffff', borderRadius: '3px', fontFamily: 'inherit', borderColor: '#28a745', borderWidth: '0' }}
              >
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    )
  }
}
TxTable.propTypes = {
  transactions: arrayOf(shape({
    amount: number,
    credit: bool,
    debit: bool,
    category: string,
    description: string,
    merchantName: string,
    userId: string,
    id: number
  }))
}
