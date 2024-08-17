const express = require('express')
const app = express()
const port = 3000;



app.get('/',(req,res)=>{
    console.log("GET REQUEST2")
    res.json({name: 'joe'})
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

