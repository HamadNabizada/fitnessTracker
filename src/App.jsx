import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Profile from "./Profile";


export default function App(){

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}