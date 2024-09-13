import { Box, Container, Typography, TextField, Button } from "@mui/material"
import { useState } from "react"
import { signUpUserWithEmailAndPassword } from "../firebase/auth"
import { useAuth } from "./context/AuthContext"

export default function SignUp(){

    const { currentUser } = useAuth()

    const [credentials, setCredentials] = useState({
        username: null,
        passwordOne: null,
        passwordTwo: null
    })
    const [credentialsError, setCredentialsError] = useState({
        usernameError: false,
        passwordOneError: false,
        passwordTwoError: false
    })
    
    function submitCredentials(e){
        e.preventDefault()
        if((credentials.username && credentials.passwordOne) && (credentials.passwordOne === credentials.passwordTwo)){
            signUpUserWithEmailAndPassword(credentials.username, credentials.passwordOne)
        }else{
            setCredentialsError({usernameError: false, passwordOneError: false, passwordTwoError: false})
            if(!credentials.username){
                setCredentialsError(prev =>(
                    {
                        ...prev,
                        usernameError: true
                    }
                ))
            }
            if(!credentials.passwordOne){
                setCredentialsError(prev =>(
                    {
                        ...prev,
                        passwordOneError: true
                    }
                ))
            }
            if(!credentials.passwordTwo){
                setCredentialsError(prev =>(
                    {
                        ...prev,
                        passwordTwoError: true
                    }
                ))
            }
            if(credentials.passwordOne !== credentials.passwordTwo){
                setCredentialsError(prev =>(
                    {
                        ...prev,
                        passwordOneError: true,
                        passwordTwoError: true
                    }
                ))
            }
            
        }
    }

    function handleChange(e){
        setCredentials(prev=>(
            {...prev,
                [e.target.name]: e.target.value
            }
        ))
    }

    return(
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
                <Typography component='h2' variant="h4" >Sign up</Typography>
                <TextField
                    fullWidth
                    onChange={handleChange}
                    color='primary'
                    required
                    label='Username'
                    variant="outlined"
                    name='username'
                    error={credentialsError.usernameError}
                />
                <TextField
                    fullWidth
                    onChange={handleChange}
                    color='primary'
                    required
                    label='Password'
                    variant="outlined"
                    name='passwordOne'
                    error={credentialsError.passwordOneError}
                />
                <TextField
                    fullWidth
                    onChange={handleChange}
                    color='primary'
                    required
                    label='Re-Enter password'
                    variant="outlined"
                    name='passwordTwo'
                    error={credentialsError.passwordTwoError}
                />
                <Box sx={{
                    display: 'flex',
                    gap: '1rem',
                }}>
                    <Button variant="contained" type="submit">Sign up</Button>
                </Box>
            </Box>
        </Container>
    )
}