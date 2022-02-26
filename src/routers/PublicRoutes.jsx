import React from 'react'
import { Redirect } from 'react-router-dom'
import AuthRouter from './AuthRouter'

const PublicRoutes = ({ isLoggedIn }) => {  

  return  !isLoggedIn ? <AuthRouter /> : <Redirect to='/'/>

}

export default PublicRoutes