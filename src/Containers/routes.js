import React from 'react'
import Loadable from 'react-loadable'
import I18n from '../I18n'
// import DefaultLayout from './containers/DefaultLayout/DefaultLayout'

function Loading () {
  return <div>Loading...</div>
}

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading
})

const Profile = Loadable({
  loader: () => import('./views/Profile/Profile'),
  loading: Loading
})

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', name: I18n.t('dashboard'), component: Dashboard },
  { path: '/profile', name: I18n.t('profile'), component: Profile }
]

export default routes
