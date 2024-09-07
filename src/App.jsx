import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Home from './Home'
import Login from './components/Login'

export default function App(){

  return (
    <BrowserRouter>
      <header>
        <nav> 
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}