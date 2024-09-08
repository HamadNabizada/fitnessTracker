import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Home from './Home'
import Login from './Login'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppBar from '@mui/material/AppBar';


export default function App(){

  return (
    <BrowserRouter>
        {/* <AppBar> 
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
        </AppBar> */}
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}