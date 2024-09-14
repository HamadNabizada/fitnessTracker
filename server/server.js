import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT;


const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions))

app.use(express.json());


app.get('/api/data',(req,res)=>{
    console.log('Get Request Success')
})

app.post('/api/data',(req,res)=>{
    console.log('Post Request Success')
})

app.post('/api/data/daily-workout',(req,res)=>{
    console.log('Post Request Success')
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

