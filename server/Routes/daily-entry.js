import express from 'express'
import { db } from '../firebase.js'
import { addDailyEntry } from '../dbController.js'

const router = express.Router()


router.post('/api/data/daily-entry',(req,res)=>{
    console.log('Daily Exercise Posted!')
    const weight = req.body.weight
    console.log(`Weight: ${weight}`)
    try{
        addDailyEntry(weight)
    }catch(error){
        console.error(error)
    }

    res.status(200)
})

export default router