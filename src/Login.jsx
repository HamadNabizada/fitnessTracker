import { useState } from "react"
import SubmitButton from "./components/SubmitButton"

export default function Login(){

const [loginCredentials, setLoginCredentials] = useState({
    username: null,
    password: null
})

function handleChange(e){
    setLoginCredentials(prev=>(
        {...prev,
            [e.target.name]: e.target.value
        }
    ))
}
async function submitCredentials(){
    console.log('submitted')
    const response = await fetch("http://localhost:3000/api/data",{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({...loginCredentials})
    })
    const data = await response.json()
}

    return (
        <>
            <div>
                <p>Username: </p>
                <input onChange={handleChange} name="username" type="text" />
            </div>
            <div>
                <p>Password: </p>
                <input onChange={handleChange} name="password" type="text" />
            </div>
            <SubmitButton handleSubmit={submitCredentials} />
        </>
    )   
}