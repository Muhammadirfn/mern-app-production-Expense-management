import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' 
      element=
      {<ProtectedRoute>
        <HomePage/>
        </ProtectedRoute>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}
export function ProtectedRoute  (props){
  if(localStorage.getItem('users')){
    return props.children
  }
  else {
   return <Navigate to={'/login'}/>
  }

}
export default App
