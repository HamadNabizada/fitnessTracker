const express = require('express')
const app = express()
const port = 3000;
const cors = require('cors')

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
app.post('/api/signup',(req,res)=>{
    console.log('Post Request Success')
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

