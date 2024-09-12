import express from 'express'
import cors from 'cors'
import {firebaseConnect, db as database} from './firebase.js';
import dotenv from 'dotenv'
// import { Router } from 'express';
dotenv.config()

const app = express()
const port = process.env.PORT;


const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions))

app.use(express.json());



const admin = firebaseConnect()
const db = database


app.get('/api/data',(req,res)=>{
    console.log('Get Request Success')
})

app.post('/api/data',(req,res)=>{
    console.log('Post Request Success')
})
app.post('/api/signup',(req,res)=>{
    // const userData = {
    //     email: 'john@test.com',
    //     first: 'John',
    //     last: 'Doe'
    // }
    // db.collection("users").doc(userData.email).set(userData)
    console.log('Post Request Success')
    // console.log('John Doe Signed Up')
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

