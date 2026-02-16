import React from 'react'
import PageLayout from './Layout/PageLayout'
import Login from './Layout/LoginPage'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './context/ProtectedRoute'
import SignUp from './Layout/SignUpPage'
import ChatWindow from './Layout/ChatWindow'
import NewChat from './Layout/NewChat'
import Profilepage from './Layout/Profilepage'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path='/chat' element={<ProtectedRoute><PageLayout/></ProtectedRoute>}>
        <Route index element={<NewChat/>}/>
        <Route path=':conversationId' element={<ChatWindow/>}/>
      </Route>
      <Route path="/profile" element={<ProtectedRoute><Profilepage/></ProtectedRoute>}/>
    </Routes>
  )
}

export default App