import React from 'react'
import { Redirect } from 'react-router-dom'
import JournalScreen from '../components/journal/JournalScreen'

const PrivateRoutes = ({ isLoggedIn }) => {  

  return  isLoggedIn ? <JournalScreen /> : <Redirect to='auth/login'/>

}

export default PrivateRoutes