import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './Routes/journal.js'
dotenv.config()

const app = express()
const port = process.env.PORT;


const corsOptions = {
    origin: "*"
}
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({extended: true}))



app.use(router)


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})

