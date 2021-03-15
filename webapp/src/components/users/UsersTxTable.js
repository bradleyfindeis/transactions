import React from 'react'
import MaterialTable from 'material-table'
import { Edit, Delete, Check, ChevronRight, SaveAlt, FilterList, FirstPage, LastPage, ChevronLeft, Search, Remove, ViewColumn } from '@material-ui/icons'
import Dialog from '@material-ui/core/Dialog'
import { DialogTitle, DialogContent, TextField } from '@material-ui/core'
import { transactions } from '../../../mocks/transactions-data'
import { users } from '../../../mocks/user-data'
import Button from '@material-ui/core/Button'

export class UsersTxTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      columns: [
        { field: 'first_name', title: 'First Name' },
        { field: 'last_name', title: 'Last Name', align: 'left' },
        { field: 'dob', title: 'Birth Date', type: 'date' },
        { field: 'id', title: 'id', hidden: true },
        { field: 'dayTotal', title: 'Todays Total', type: 'currency', align: 'left' },
        { field: 'monthTotal', title: 'Months Total', type: 'currency', align: 'left' }
      ],
      modalOpen: false,
      rowData: {},
      users: users,
      trueFalse: ['true', 'false'],
      createUserModalOpen: false,
      firstName: '',
      lastName: '',
      dob: ''
    }
  }

  componentDidMount () {
    this.setTodaysTotal()
    this.setMonthsTotal()
  }

  setTodaysTotal () {
    users.map(user => (user['dayTotal'] = this.getTodaysTotal(user.id)))
  }

  setMonthsTotal () {
    users.map(user => (user['monthTotal'] = this.getMonthsTotal(user.id)))
  }

  getTodaysTotal (id) {
    let today = new Date().toISOString()
    let formattedToday = [today.slice(5, 7), '/', today.slice(8, 10), '/', today.slice(0, 4)].join('')
    const transactionsByUser = transactions.filter(obj => obj.userId === id)
    const arrAmounts = transactionsByUser.map(obj => (obj.created === formattedToday ? obj.amount : 0))
    const summedAmounts = arrAmounts.reduce((a, b) => a + b, 0).toFixed(2)
    return summedAmounts
  }

  getMonthsTotal (id) {
    const today = new Date().toISOString()
    const formattedToday = [today.slice(5, 7), '/', today.slice(8, 10), '/', today.slice(0, 4)].join('')
    const begginingOfMonth = new Date(formattedToday.slice(7, 10), (formattedToday[1] - 1), 1)
    const transactionsByUser = transactions.filter(obj => obj.userId === id)
    const amountsBetweenDates = transactionsByUser.map(obj => new Date(obj.created) >= begginingOfMonth || new Date(obj.created) <= today ? obj.amount : 0)
    const summedAmounts = amountsBetweenDates.reduce((a, b) => a + b, 0).toFixed(2)
    return summedAmounts
  }

  handleClose () {
    this.setState({ modalOpen: false })
    this.setState({ createUserModalOpen: false })
  }

  handleEdit () {
    const rowData = {
      first_name: this.state.rowData.first_name,
      last_name: this.state.rowData.last_name,
      id: this.state.rowData.id,
      dob: this.state.rowData.dob
    }
    const updatedUsers = this.state.users.map(el => {
      return el.id === rowData.id ? rowData : el
    })
    this.setState({ users: updatedUsers })
    this.setState({ modalOpen: false })
  }

  handleDelete (event, rowData) {
    const removedUser = this.state.users.filter(el => el.id !== rowData.id)
    this.setState({ users: removedUser })
  }

  handleFirstNameChange (val) {
    this.setState({ rowData: { ...this.state.rowData, first_name: val } })
  }

  handleLastNameChange (val) {
    this.setState({ rowData: { ...this.state.rowData, last_name: val } })
  }

  handleDOBChange (val) {
    this.setState({ rowData: { ...this.state.rowData, dob: val } })
  }

  handleNewFirstNameChange (val) {
    this.setState({ firstName: val })
  }

  handleNewLastNameChange (val) {
    this.setState({ lastName: val })
  }

  handleNewDOBChange (val) {
    this.setState({ dob: val })
  }

  convertDate (userDate) {
    const blah = new Date(userDate)
    const year = blah.getFullYear()
    const month = blah.getMonth()
    const day = blah.getDay()
    const date = `${year}-${month}-${day}`
    this.setState({ rowData: { ...this.state.rowData, dob: date } })
  }

  createUser () {
    // user.insert!(first_name: this.state.firstName, last_name: this.state.lastName, dob: this.state.dob)
    const newId = this.state.users.length + 2
    const newUser = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      id: newId,
      dob: this.state.dob
    }
    this.setState({ users: [newUser, ...this.state.users] })
    this.setState({ createUserModalOpen: false })
    this.setState({ firstName: '' })
    this.setState({ lastName: '' })
    this.setState({ dob: '' })
  }

  openCreateuserModal () {
    this.setState({ createUserModalOpen: true })
  }

  render () {
    return (
      <div>
        <Button
          color='primary'
          onClick={() => this.openCreateuserModal()}
          style={{ marginLeft: '90%', marginTop: '20px', marginBottom: '20px', backgroundColor: '#53a738' }}
          variant='contained'
        >
          Create User
        </Button>
        <MaterialTable
          actions={[
            {
              icon: Edit,
              iconProps: { style: { color: '#0dbf49' } },
              tooltip: 'Edit User',
              onClick: (event, rowData) => {
                this.setState({ rowData: rowData })
                setTimeout(() => {
                  this.setState({ modalOpen: true })
                  this.convertDate(rowData.dob)
                }, 250)
              }
            },
            {
              icon: Delete,
              iconProps: { style: { color: '#ed4242' } },
              tooltip: 'Delete User',
              onClick: (event, rowData) => this.handleDelete(event, rowData)
            }
          ]}
          columns={this.state.columns}
          data={this.state.users}
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
          title='All Users'
        />
        <Dialog
          onClose={() => this.handleClose()}
          open={this.state.modalOpen}
          style={{ maxheight: '500px !important', width: '180px !importtant' }}
        >
          <DialogTitle>
            Edit User
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                id='outlined-basic-first-name'
                label='First Name'
                onChange={(event) => this.handleFirstNameChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}
                value={this.state.rowData.first_name}
              />
              <TextField
                id='outlined-basic-last-name'
                label='Last Name'
                onChange={(event) => this.handleLastNameChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}
                value={this.state.rowData.last_name}
              />
              <TextField
                InputLabelProps={{
                  shrink: true
                }}
                defaultValue={this.state.rowData.dob}
                format='MM/DD/YYY'
                id='datetime-dob'
                label='Birth Date'
                onChange={(event) => this.handleDOBChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}
                type='date'
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
        <Dialog
          onClose={() => this.handleClose()}
          open={this.state.createUserModalOpen}
          style={{ maxheight: '500px !important', width: '180px !importtant' }}
        >
          <DialogTitle>
            Create a User
          </DialogTitle>
          <DialogContent>
            <form>
              <TextField
                id='outlined-basic-first-name'
                label='First Name'
                onChange={(event) => this.handleNewFirstNameChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}
                value={this.state.firstName}
              />
              <TextField
                id='outlined-basic-last-name'
                label='Last Name'
                onChange={(event) => this.handleNewLastNameChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px', marginLeft: '50px' }}
                value={this.state.lastName}
              />
              <TextField
                InputLabelProps={{
                  shrink: true
                }}
                defaultValue={this.state.dob}
                format='MM/DD/YYY'
                id='datetime-dob'
                label='Birth Date'
                onChange={(event) => this.handleNewDOBChange(event.target.value)}
                style={{ paddingTop: '10px', paddingBottom: '20px', width: '200px' }}
                type='date'
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
                onClick={() => this.createUser()}
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
