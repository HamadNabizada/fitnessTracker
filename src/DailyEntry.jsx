import { Box, Container, TextField, Typography, Button } from "@mui/material"
import { format } from 'date-fns'
import NoUserLoggedIn from "./components/NoUserLoggedIn"
import { useAuth } from "./context/AuthContext"
import WorkoutInputForm from "./components/WorkoutInputForm"

export default function DailyEntry(){
    const date = new Date()
    const currentDate = format(date, 'do MMMM y')

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


    return (
        <Container sx={styles.container}>
            <Box                 
                sx={styles.boxStyle}
            >
                <Typography color="primary" variant="h4">Daily Entry: {currentDate}</Typography>
                <WorkoutInputForm 
                    currentDate = {currentDate}
                    currentUser = {currentUser}
                />
            </Box>
        </Container>
    )
}