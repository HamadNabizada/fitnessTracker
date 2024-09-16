import express from 'express'
import { addEntry, validateEntry } from '../dbController.js'

const router = express.Router()


router.post('/api/data/journal',(req,res)=>{
    if(!validateEntry(req.body)){
        res.status(400)
    }
    try{
        const alreadyExists = addEntry(req.body)
        if(alreadyExists){
            res.status(400).json({message: `Entry for ${req.date} already exists!`})
        }
    }catch(error){
        console.error(error)
    }
    res.status(200)
})

export default router