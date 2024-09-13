import { useState } from "react"
import { Container, TextField, Button, Stack, Typography } from "@mui/material"
import {Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth, loginWithEmailAndPassword, signUserInAnonymously } from "./context/AuthContext.jsx";



export default function Login(){

const { currentUser } = useAuth()
const [error, setError] = useState(null)

const navigateTo = useNavigate()

const [loginCredentials, setLoginCredentials] = useState({
    username: null,
    password: null
})
const [loginCredentialsValidation, setLoginCredentialsValidation] = useState({
    usernameError: false,
    passwordError: false
})

function handleChange(e){
    setLoginCredentials(prev=>(
        {...prev,
            [e.target.name]: e.target.value
        }
    ))
}
async function submitCredentials(e){
    e.preventDefault()
    if(loginCredentials.username && loginCredentials.password){
        try {
           await loginWithEmailAndPassword(loginCredentials.username,loginCredentials.password)
           navigateTo('/')
        } catch {
            setError(true)
        }
    }else{
        setLoginCredentialsValidation({
            usernameError: false,
            passwordError: false
        })
        if(!loginCredentials.username){
            setLoginCredentialsValidation(prev =>(
                {
                    ...prev,
                    usernameError: true
                }
            ))
        }
        if(!loginCredentials.password){
            setLoginCredentialsValidation(prev =>(
                {
                    ...prev,
                    passwordError: true
                }
            ))
        }
    }
}

    return (
        <Container maxWidth="xs">
            <Box
                component="form"
                autoComplete="off"
                noValidate
                onSubmit={submitCredentials}
                sx={{
                    display:'flex',
                    flexDirection:'column',
                    gap: '1rem',
                    alignItems: 'center',
                    border: '1px solid black',
                    padding: '1rem',
                    borderRadius: '5px',
                }}
            >
                <Typography component='h2' variant="h4" >Log In</Typography>
                {error && <Typography variant="body1" color="error">Incorrect Username or Password</Typography>}
                <TextField
                    fullWidth
                    onChange={handleChange}
                    color='primary'
                    required
                    label='Username'
                    variant="outlined"
                    name='username'
                    error={loginCredentialsValidation.usernameError}
                />
                <TextField
                    fullWidth
                    onChange={handleChange}
                    color='primary'
                    required
                    label='Password'
                    variant="outlined"
                    name='password'
                    error={loginCredentialsValidation.passwordError}
                />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '.4rem',
                }}>
                    <Box sx={{display: 'flex', gap: '1rem'}}>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            Log in
                        </Button>
                        <Button onClick={() => {
                            signUserInAnonymously()
                            navigateTo('/')
                        }} variant="outlined">Sign In Anonymously</Button>
                    </Box>
                    <Typography variant="body1" textAlign='center'>OR</Typography>
                        <Button
                            variant="outlined"
                            onClick={()=>navigateTo('/signup')}
                        >
                            Sign up
                        </Button>
                </Box>
            </Box>
        </Container>
    )   
}