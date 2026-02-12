import React from 'react'
import PageLayout from './Layout/PageLayout'
import Login from './Layout/LoginPage'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './context/ProtectedRoute'
import SignUp from './Layout/SignUpPage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path='/chat' element={<ProtectedRoute><PageLayout/></ProtectedRoute>}/>
    </Routes>
  )
}

export default App