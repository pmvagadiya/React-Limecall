import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from './auth'

function PrivateRoute({ component: Component, ...rest }) {
  const token = useAuth()


  let existingTokens = localStorage.getItem('access_token')

  return (
    <Route
      {...rest}
      render={props =>
        existingTokens ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

export default PrivateRoute
