import { useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage'

import LoginPage from './pages/LoginPage'

import { WhenLoggedIn, WhenNotLoggedIn, WithLogin } from './LoginContext'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'

function App() {

  return (
    <BrowserRouter>
      <WithLogin >
        <WhenNotLoggedIn>
          <Routes>
            <Route path="my-project" element= { <LoginPage /> } />
          </Routes>
        </WhenNotLoggedIn>
        <WhenLoggedIn>
          <Routes>
            <Route path="login" element = { <Navigate to='/' /> } />
          </Routes>
        </WhenLoggedIn>
        <Routes>
          <Route index element={ <HomePage /> }/>
          <Route path="login" element= { <LoginPage /> } />
          <Route path="*" element={ <Navigate to='/' />} />
        </Routes>
      </WithLogin>
    </BrowserRouter>
  )
}

export default App
