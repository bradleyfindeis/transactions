import React from 'react'
// import useQuery from '@apollo/client/react/components'
// import GetTransactions from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'
import { TxBarChart } from '../components/transactions/TxBarChart'
import { TxPieChart } from '../components/transactions/TxPieChart'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { transactions } from '../../mocks/transactions-data'
import { chartData } from '../../mocks/chart-data'
import { pieData } from '../../mocks/pie-data'

export function Home () {
  return (
    <div
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
          <Paper>
            <TxTable transactions={transactions} />
          </Paper>
        </Grid>
        <Grid
          container
          spacing={3}
          style={{ marginTop: '2%' }}
        >
          <Grid
            item
            lg={6}
            sm={6}
            xs={10}
          >
            <Paper>
              <TxBarChart
                amounts={chartData.amounts}
                labels={chartData.categories}
              />
            </Paper>
          </Grid>
          <Grid
            item
            lg={6}
            sm={6}
            xs={10}
          >
            <Paper>
              <TxPieChart
                amounts={pieData.amounts}
                dates={pieData.dates}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
