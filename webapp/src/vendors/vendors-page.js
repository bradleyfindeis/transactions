import React from 'react'
// import { useQuery } from '@apollo/client'
// import GetTransactions from '../gql/transactions.gql'
import { VendorTxTable } from '../components/vendors/VendorTxTable'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

export class Vendors extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }

  useStyles () {
    makeStyles((theme) => ({
      root: {
        flexGrow: 1
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary
      }
    }))
  }

  classes () {
    return this.useStyles()
  }

  render () {
    if (!this.state.loading) {
      return (
        <div
          className={this.classes.root}
          style={{ marginLeft: '8%', marginRight: '8%', paddingBottom: '5%' }}
        >
          <Grid
            container
            spacing={4}
            style={{ marginTop: '2%' }}
          >
            <Grid
              item
              lg={12}
              style={{ flex: 1 }}
              xs={10}
            >
              <Paper
                className={this.classes.paper}
              >
                <VendorTxTable />
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    } else {
      return (
        <p> loading...</p>
      )
    }
  }
}
