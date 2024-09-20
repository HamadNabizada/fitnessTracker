import express from 'express'
import { addEntry, validateEntry, updateEntry, retrieveEntry } from '../dbController.js'

const router = express.Router()

//Returns Journal Entry for the selected Date and UserUID
//Does not make any changes to DB
router.post('/api/data/journal/get-data',async (req,res)=>{
    try{
        const data = await retrieveEntry(req.body)
        if(!data){
            res.status(400).json({message: `No entry for ${req.body.date}`})
        }else{
            res.status(200).json(data)
        }
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'Something went wrong'})
    }
})

router.put('/api/data/journal/update',async (req,res)=>{
    if(!validateEntry(req.body)){
        res.status(400).json({message: `Invalid or missing values entered!`})
    }
    try{
        await updateEntry(req.body)
    }catch(error){
        console.log(error)
        res.status(500).json({message: `Something went wrong.`})
    }
})

router.post('/api/data/journal/entry',async (req,res)=>{
    if(!validateEntry(req.body)){
        res.status(400).json({message: `Invalid or missing values entered!`})
    }
    try{
        console.log(req.body)
        const alreadyExists = await addEntry(req.body)
        if(alreadyExists){
            res.status(400).json({message: `Entry for ${req.body.entry.date} already exists!`})
        }
    }catch(error){
        console.error(error)
    }
    res.status(200)
})

export default router