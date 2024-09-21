import { Container, Box, Button, Typography } from '@mui/material'
import JournalPage from './components/JournalPage'
import { useAuth } from './context/AuthContext.jsx'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react'
import ForwardIcon from '@mui/icons-material/Forward';
import IconButton from '@mui/material/IconButton';

export default function Journal(){

    const { currentUser } = useAuth()
    const [date, setDate] = useState(dayjs())
    const [entryData, setEntryData] = useState(null)
    const [loading, setLoading] = useState(false)

    const messageRef = {
        noAvailableData: 'No entry available'
    }

    const messageElements = {
        noData: <Typography variant='body1' >{`No entry available for ${date.format('DD MMMM YYYY')}`}</Typography>,
        loadingElem: <Typography variant='body1'>Loading...</Typography>
    }

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
            if(data.message === messageRef.noAvailableData){
                setEntryData(null)
            }else{
                setEntryData(data)
            }
        }catch(error){
            console.log(error)
        }
        setLoading(false)
    }

    function handleChange(e){
        setDate(e)
    }
    useEffect(()=>{
        if(date===null){
            return
        }
        fetchJournalEntry()
    }, [date])

    function renderJournalPages(){
        if(loading)
            return messageElements.loadingElem
        if(!date){
            return
        }
        if(!entryData){
            return(
                messageElements.noData
            )
        }
        return(
            <JournalPage entryData={entryData} loading={loading}/>
        )
    }

    function handleArrowClick(e){
        const ref = e.currentTarget.name
        if(ref === 'leftArrow'){
            setDate(prev=>{
                return(
                    prev.subtract(1,'day')
                )
            })
        }else{
            setDate(prev=>{
                return(
                    prev.add(1,'day')
                )
            })
        }
    }


    return(
        <Container sx={{
            display:'flex', 
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: "center",
                gap: '1rem',
                fontSize: '40px'
            }}>
                <IconButton onClick={handleArrowClick} name={"leftArrow"}>
                    <ForwardIcon color='primary' sx={{fontSize: '40px', transform: 'rotate(180deg)'}} />
                </IconButton>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker sx={{maxWidth: '200px'}} value={date} onChange={handleChange} label="Select the date" />
                </LocalizationProvider>
                <IconButton onClick={handleArrowClick} name={"rightArrow"}>
                    <ForwardIcon color='primary' sx={{fontSize: '40px'}} />
                </IconButton>
            </Box>
            {renderJournalPages()}
        </Container>
    )
}