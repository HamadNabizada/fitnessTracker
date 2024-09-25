import { Box, Container, Typography, Button } from "@mui/material"
import JournalEntryModal from "./components/JournalEntryModal"
import NoUserLoggedIn from "./components/NoUserLoggedIn"
import dayjs from "dayjs"
import { useAuth } from "./context/AuthContext"
import WorkoutInputForm from "./components/WorkoutInputForm"
import { useState } from "react"

export default function DailyEntry(){
    const url = 'http://localhost:3000/api/data/journal/entry/overwrite'
    const [entry, setEntry] = useState({})
    const date = dayjs()
    const [handleModal, setHandleModal] = useState(false)
    const [modalInfo, setModalInfo] = useState({
        type: 'null',
        message: '',
        title: '',
    })
    const { currentUser } = useAuth()

    const styles = {
        container: {
            display:'flex',
            flexDirection: 'column',
            minHeight: '80vh'
        }
    }

    //If user is not logged in, the page will redirect to /login
    if(!currentUser){
        return (
            <Container>
                <NoUserLoggedIn/>
            </Container>
        )
    }

    const responseModal = () =>{
        if(!handleModal){
            return
        }
        
        return(
            <JournalEntryModal handleDataOverwrite={handleDataOverwrite} modalInfo={modalInfo} handleModal={handleModal}/>
        )
        
    }

    function handleResponse(data){
        const { message, entry } = data
        if(message === 'Entry submitted successfully.'){
            setModalInfo({
                type: 'success',
                title: 'Great Work!',
                message: 'Entry submitted successfully.'
            })
        }
        if(message === 'Entry already exists!'){
            setModalInfo({
                type: 'overwrite',
                title: 'Entry already exists!',
                message: 'If you would like to overwrite the previously saved data, please click the Overwrite button'
            })
            setEntry(entry)
        }
        setHandleModal(true)
    }

    async function handleDataOverwrite(){
        try{
            const response = await fetch(url,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    entry:{...entry},
                    userUID: currentUser.uid
                })
            })
            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message); // Handle non-200 responses
            }
            const data = await response.json()
            handleResponse(data)
        }catch(error){
            console.log(error)
        }
    } 

    return (
        <Container sx={styles.container}>
            {responseModal()}
            <Box                 
                sx={styles.boxStyle}
            >
                <Typography color="primary" variant="h4">{`Daily Entry: ${date.format('DD MMMM YYYY')}`}</Typography>
                <WorkoutInputForm 
                    date = {date}
                    currentUser = {currentUser}
                    handleResponse={handleResponse}
                />
            </Box>
        </Container>
    )
}