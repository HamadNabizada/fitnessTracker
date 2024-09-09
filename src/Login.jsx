import { useState } from "react"
import { Container, TextField, Button, Stack, Typography } from "@mui/material"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';
import {Box} from "@mui/material";

export default function Login(){


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
function submitCredentials(e){
    e.preventDefault()
    if(loginCredentials.username && loginCredentials.password){
        submitCredentialsToServer()
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

async function submitCredentialsToServer(){
    
    const response = await fetch("http://localhost:3000/api/data",{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({...loginCredentials})
    })
    // const data = await response.json()
}

    return (
        <Container
            maxWidth="xs"
        >
            <Grid
                container
                direction='column'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Grid>
                    <Paper
                        sx={{
                            padding: 2,
                            margin: 1
                        }}
                    >

                        <Box
                            component="form"
                            autoComplete="off"
                            noValidate
                            onSubmit={submitCredentials}
                            sx={{
                                display:'flex',
                                flexDirection:'column',
                                gap: '1rem'
                            }}
                        >
                            <Typography component='h2' variant="h4" >Sign In</Typography>
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
                            <Button
                                variant="outlined"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )   
}