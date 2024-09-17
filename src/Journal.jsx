import { Container, Box, Button, Typography } from '@mui/material'
import JournalPage from './components/JournalPage'

export default function Journal(){

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
            <JournalPage/>
        </Container>
    )
}