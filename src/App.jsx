import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import Layout from "./components/Layout";
import Profile from "./Profile";
import DailyEntry from "./DailyEntry";
import Dashboard from './Dashboard';
import Journal from './Journal';

export default function App(){

  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/daily-entry" element={<DailyEntry/>}/>
            <Route path="/journal" element={<Journal/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  )
}