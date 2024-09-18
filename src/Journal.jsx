import { Container, Box, Button, Typography } from '@mui/material'
import JournalPage from './components/JournalPage'
import { useAuth } from './context/AuthContext.jsx'
import { format } from 'date-fns'

export default function Journal(){

    const { currentUser } = useAuth()
    const date = new Date()
    const currentDate = format(date, 'do MMMM y')

    const url = 'http://localhost:3000/api/data/journal/'

    async function fetchJournalEntry(){
        console.log('click')
        try{
            const response = await fetch(url)
            const data = await response.json()
            console.log(data.message)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <Container>
            <JournalPage date={currentDate} userUID={currentUser.uid} />
        </Container>
    )
}