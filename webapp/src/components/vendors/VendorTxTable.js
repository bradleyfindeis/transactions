import React from 'react'
import MaterialTable from 'material-table'
import { Edit, Delete, Check, ChevronRight, SaveAlt, FilterList, FirstPage, LastPage, ChevronLeft, Search, Remove, ViewColumn } from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog'
import { DialogTitle, DialogContent, TextField } from '@material-ui/core'
import { transactions } from '../../../mocks/transactions-data'
import { merchants } from '../../../mocks/vendor-data'
import { Button } from 'react-bootstrap'

export class VendorTxTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [
        { field: 'name', title: 'Name' },
        { field: 'description', title: 'Description', align: 'left', width: 300 },
        { field: 'monthTotal', title: 'Monthly Spend', type: 'currency' },
        { field: 'dayTotal', title: 'Todays Spend', type: 'currency' },
        { field: 'id', title: 'id', hidden: true }
      ],
      modalOpen: false,
      rowData: {},
      vendors: merchants,
      trueFalse: ['true', 'false']
    }
  }

  componentDidMount () {
    this.setTodaysTotal()
    this.setMonthsTotal()
  }

  setTodaysTotal () {
    this.state.vendors.map(merchant => (merchant['dayTotal'] = this.getTodaysTotal(merchant.name)))
  }

  setMonthsTotal () {
    this.state.vendors.map(merchant => (merchant['monthTotal'] = this.getMonthsTotal(merchant.name)))
  }

  getTodaysTotal (name) {
    let today = new Date().toISOString()
    let formattedToday = [today.slice(5, 7), '/', today.slice(8, 10), '/', today.slice(0, 4)].join('')
    const transactionsByVendor = transactions.filter(obj => obj.merchantName === name)
    const arrAmounts = transactionsByVendor.map(obj => (obj.created === formattedToday ? obj.amount : 0))
    const summedAmounts = arrAmounts.reduce((a, b) => a + b, 0).toFixed(2)
    return summedAmounts
  }

  getMonthsTotal (name) {
    const today = new Date().toISOString()
    const formattedToday = [today.slice(5, 7), '/', today.slice(8, 10), '/', today.slice(0, 4)].join('')
    const begginingOfMonth = new Date(formattedToday.slice(7, 10), (formattedToday[1] - 1), 1)
    const transactionsByVendor = transactions.filter(obj => obj.merchantName === name)
    const amountsBetweenDates = transactionsByVendor.map(obj => new Date(obj.created) >= begginingOfMonth || new Date(obj.created) <= today ? obj.amount : 0)
    const summedAmounts = amountsBetweenDates.reduce((a, b) => a + b, 0).toFixed(2)
    return summedAmounts
  }

  handleClose () {
    this.setState({ modalOpen: false })
  }

  handleEdit () {
    const rowData = {
      name: this.state.rowData.name,
      description: this.state.rowData.description,
      id: this.state.rowData.id,
      monthTotal: this.state.rowData.monthTotal,
      dayTotal: this.state.rowData.dayTotal
    }
    const updatedVendor = this.state.vendors.map(el => {
      return el.id === rowData.id ? rowData : el
    })
    this.setState({ vendors: updatedVendor })
    this.setState({ modalOpen: false })
  }

  handleDelete (event, rowData) {
    const removedVendor = this.state.vendors.filter(el => el.id !== rowData.id)
    this.setState({ vendors: removedVendor })
  }

  handleNameChange (val) {
    this.setState({ rowData: { ...this.state.rowData, name: val } })
  }

  handleDescriptionChange (val) {
    this.setState({ rowData: { ...this.state.rowData, description: val } })
  }

  render () {
    return (
      <div>
        <MaterialTable
          actions={[
            {
              icon: Edit,
              iconProps: { style: { color: '#0dbf49' } },
              tooltip: 'Edit Vendor',
              onClick: (event, rowData) => {
                this.setState({ modalOpen: true })
                this.setState({ rowData: rowData })
              }
            },
            {
              icon: Delete,
              iconProps: { style: { color: '#ed4242' } },
              tooltip: 'Delete Vendor',
              onClick: (event, rowData) => this.handleDelete(event, rowData)
            }
          ]}
          columns={this.state.columns}
          data={this.state.vendors}
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
          title='All Vendors'
        />
        <Dialog
          onClose={() => this.handleClose()}
          open={this.state.modalOpen}
          style={{ maxheight: '500px !important', width: '180px !importtant' }}
        >
          <DialogTitle>
            Edit Vendor
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                id='outlined-basic-name'
                label='Vendor Name'
                onChange={(event) => this.handleNameChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}
                value={this.state.rowData.name}
              />
              <TextField
                id='outlined-basic-description'
                label='Vendor Description'
                onChange={(event) => this.handleDescriptionChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}
                value={this.state.rowData.description}
              />
              <TextField
                disabled
                id='outlined-basic-month'
                label='Monthly Total'
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}
                value={`$ ${this.state.rowData.monthTotal}`}
              />
              <TextField
                disabled
                id='outlined-basic-today'
                label='Todays Total'
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}
                value={`$ ${this.state.rowData.dayTotal}`}
              />
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
