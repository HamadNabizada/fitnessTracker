import express from 'express'
import { addEntry, validateEntry, updateEntry } from '../dbController.js'

const router = express.Router()

router.get('/api/data/journal',(req,res)=>{
    console.log('Fetching Journal Data...')
    res.json({message: 'fetch recieved'})
})

router.put('/api/data/journal/update',(req,res)=>{
    if(!validateEntry(req.body)){
        res.status(400).json({message: `Invalid or missing values entered!`})
    }
    try{
        updateEntry(req.body)
    }catch(error){
        console.log(error)
        res.status(500).json({message: `Something went wrong.`})
    }
})

router.post('/api/data/journal/entry',(req,res)=>{
    if(!validateEntry(req.body)){
        res.status(400).json({message: `Invalid or missing values entered!`})
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