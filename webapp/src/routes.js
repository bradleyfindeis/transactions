import AppBar from '@material-ui/core/AppBar'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import { Home } from './home'
import { Vendors } from './vendors'
import { Users } from './users'
import HomeIcon from '@material-ui/icons/Home'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  clickableIcon: {
    color: 'white',
    '&:hover': {
      color: 'black'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    marginLeft: '10%',
    color: '#262626',
    '&:hover': {
      color: 'green'
    }
  }
}))

function AppRouter () {
  return (
    <Router>
      <div css={layoutStyle}>
        <AppBar color='transparent' position='static'>
          <Toolbar>
            <HomeIcon
              className={useStyles.menuButton}
              color='inherit'
              edge='start'
              fontSize='large'
              onClick={event => (window.location.href = '/')}
              style={{ cursor: 'pointer' }}
            />
            <Typography
              className={useStyles.title}
              onClick={event => (window.location.href = '/vendors')}
              style={{ marginLeft: '5%', cursor: 'pointer' }}
              variant='h6'
            >
              Vendors
            </Typography>
            <Typography
              className={useStyles.title}
              onClick={event => (window.location.href = '/users')}
              style={{ marginLeft: '2%', cursor: 'pointer' }}
              variant='h6'
            >
              Users
            </Typography>
          </Toolbar>
        </AppBar>
        <div className='main-content' css={contentStyle}>
          <Route component={Home} exact path='/' />
          <Route component={Vendors} exact path='/vendors' />
          <Route component={Users} exact path='/users' />
        </div>
      </div>
    </Router>
  )
}

export default AppRouter

const layoutStyle = css`
  display: grid
  grid-row-gap: 24px
  padding: 8px
`

const contentStyle = css`
  grid-row: 2;
`

// import React from 'react'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
// import { css } from '@emotion/core'
// import { Home } from './home'

// function AppRouter() {
//   return (
//     <Router>
//       <div css={ layoutStyle}>
//         <nav css={navStyle}>
//           <ul>
//             <li>
//               <Link to='/'>Home</Link>
//             </li>
//             <li>
//               <Link to='/another'>Another route</Link>
//             </li>
//           </ul>
//         </nav>
//         <div className='main-content' css={contentStyle}>
//           <Route component={Home} exact path='/' />
//           <Route component={() => <div>Content for /another route</div>} exact path='/another' />
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default AppRouter

// const layoutStyle = css`
//   display: grid
//   grid-row-gap: 24px
//   padding: 8px
// `

// const navStyle = css`
//   grid-row: 1
//   & > ul {
//     display: flex
//     flex-direction: row
//     list-style-type: none
//   }

//   & > ul > li:not(:first-of-type) {
//     margin-left: 16px
//   }
// `

// const contentStyle = css`
//   grid-row: 2
// `
