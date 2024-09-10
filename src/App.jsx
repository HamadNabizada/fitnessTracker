import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Layout from "./components/Layout";


export default function App(){

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}