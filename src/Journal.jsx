import { Container, Box, Button, Typography } from '@mui/material'
import JournalPage from './components/JournalPage'
import { useAuth } from './context/AuthContext.jsx'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react'

export default function Journal(){

    const { currentUser } = useAuth()
    const date = dayjs()
    const [entryData, setEntryData] = useState(false)
    const [loading, setLoading] = useState(false)

    const url = 'http://localhost:3000/api/data/journal/get-data'

    async function fetchJournalEntry(){
        if(loading){
            return
        }else{
            setLoading(true)
        }
        try{
            const response = await fetch(url,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userUID: currentUser.uid,
                    date: date.format('MM DD YYYY')
                })
            })
            if (!response.ok) {
                throw new Error(`Error: Something went wrong.`);
            }
            const data = await response.json()
            setEntryData(data)
        }catch(error){
            console.log(error)
        }
    }

    const journalElements = () =>{
        if(!entryData){
            return
        }
       return(
        <JournalPage entryData={entryData} loading />
       )
    }

    return(
        <Container sx={{display:'flex', flexDirection: 'row'}}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Select the date" />
            </LocalizationProvider>
            {journalElements()}
            <Button variant='contained' onClick={fetchJournalEntry}>Get Data</Button>
        </Container>
    )
}