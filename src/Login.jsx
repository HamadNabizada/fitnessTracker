import { useState } from "react"
import { Container,TextField, Button } from "@mui/material"

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
        <Container>
            <form
                autoComplete="off"
                noValidate
                onSubmit={submitCredentials}
            >
                <TextField
                    onChange={handleChange}
                    color='primary'
                    required
                    label='Username'
                    variant="outlined"
                    name='username'
                    error={loginCredentialsValidation.usernameError}
                />
                <TextField
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
            </form>
        </Container>
    )   
}