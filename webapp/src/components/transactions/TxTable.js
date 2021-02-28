import React from 'react'
import MaterialTable from 'material-table'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { Edit, Delete, Check, ChevronRight, SaveAlt, FilterList, FirstPage, LastPage, ChevronLeft, Search, Remove, ViewColumn } from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog'
import { DialogTitle, DialogContent, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { categories, users } from '../../../mocks/transactions-data'
import { merchants } from '../../../mocks/vendor-data'
import { Button } from 'react-bootstrap'

export class TxTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [
        { field: 'amount', title: 'Amount', type: 'currency', align: 'left' },
        { field: 'credit', title: 'Credit', align: 'left', width: 100 },
        { field: 'debit', title: 'Debit', align: 'left', width: 100 },
        { field: 'description', title: 'Description', align: 'left', width: 300 },
        { field: 'merchantName', title: 'Merchant' },
        { field: 'userId', title: 'User', align: 'left' },
        { field: 'id', title: 'id', hidden: true }
      ],
      modalOpen: false,
      rowData: {},
      transactions: this.props.transactions,
      trueFalse: ['true', 'false']
    }
  }

  handleClose () {
    this.setState({ modalOpen: false })
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

  handleUserChange (val) {
    this.setState({ rowData: { ...this.state.rowData, userId: val } })
  }

  handleMerchantChange (val) {
    this.setState({ rowData: { ...this.state.rowData, merchantName: val } })
  }

  render () {
    return (
      <div>
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
                      key={val + Math.random()}
                      onClick={() => this.handleMerchantChange(val)}
                      value={val}
                    >
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}>
                <InputLabel id='user-label'>User</InputLabel>
                <Select
                  id='user'
                  labelId='user-label'
                  value={this.state.rowData.userId}
                >
                  {users.map(val => (
                    <MenuItem
                      key={val + Math.random()}
                      onClick={() => this.handleUserChange(val)}
                      value={val}
                    >
                      {val}
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
