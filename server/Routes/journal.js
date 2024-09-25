import express from 'express'
import { addEntry, validateEntry, updateEntry, retrieveEntry, overwriteEntry } from '../dbController.js'

const router = express.Router()

//Returns Journal Entry for the selected Date and UserUID
//Does not make any changes to DB
router.post('/api/data/journal/get-data',async (req,res)=>{
    try{
        const data = await retrieveEntry(req.body)
        if(!data){
            res.status(200).json({message: `No entry available`})
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
        return
    }
    try{
        const alreadyExists = await addEntry(req.body)
        if(alreadyExists){
            res.status(200).json({message: `Entry already exists!`,entry:req.body.entry})
            return
        }
    }catch(error){
        console.error(error)
    }
    console.log('respnding status 200')
    res.status(200).json({message: 'Entry submitted successfully.'})
})

router.put('/api/data/journal/entry/overwrite',async (req,res)=>{
    if(!validateEntry(req.body)){
        console.log('respnding status 400')
        res.status(400).json({message: `Invalid or missing values entered!`})
        return
    }
    try{
        overwriteEntry(req.body)
        res.status(200).json({message: 'Entry submitted successfully.'})
        return
    }catch(error){
        console.error(error)
    }
})

export default router