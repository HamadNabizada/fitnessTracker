//Daily enttry
//--workout exercises
//--pictures
//--video?
//--weigh in
import { Box, Container, TextField, Typography, Button } from "@mui/material"
import { format } from 'date-fns'
import NoUserLoggedIn from "./components/NoUserLoggedIn"
import { useAuth } from "./context/AuthContext"
import { useState } from "react"

export default function DailyEntry(){
    const currentDate = format(new Date(), 'do MMMM y')
    const url = 'http://localhost:3000/api/data/daily-entry'
    const [dailyData, setDailyData] = useState({
        date: currentDate,
        weight: null,

        // exercises: [],
    })

    const { currentUser } = useAuth()

    const styles = {
        container: {
            display:'flex',
            flexDirection: 'column',
            minHeight: '80vh'
        },
        boxStyle: {
            display:'flex',
            flexDirection: 'column',
            gap: '1rem',
            minHeight: 'inherit'
        },
        labelAndInputWrapper:{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '3rem',
        },
        button: {
            maxWidth: '200px',
            marginTop: 'auto'
        }

    }

    if(!currentUser){
        return (
            <Container>
                <NoUserLoggedIn/>
            </Container>
        )
    }

    function handleChange(e){
        setDailyData(prev =>(
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }
    async function submitData(e){
        e.preventDefault()
        try{
           await submitToDB()
        }catch(error){
            console.log(error)
        }
    }
    async function submitToDB(){
        const response = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dailyData)
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`); // Handle non-200 responses
        }
    }

    return (
        <Container sx={styles.container}>
            <Box                 
                component="form"
                autoComplete="off"
                noValidate
                sx={styles.boxStyle}
            >
                <Typography color="primary" variant="h4">Daily Entry: {currentDate}</Typography>
                <Box sx={styles.labelAndInputWrapper}>
                    <Typography color='secondary' variant='body1' sx={styles.label} >Weight: </Typography>
                    <TextField onChange={handleChange} name='weight' label='lbs' type="number" autoComplete="false" variant="outlined" ></TextField>
                </Box>
                <Button onClick={submitData} sx={styles.button} color="secondary" variant="contained">Submit</Button>
            </Box>
        </Container>
    )
}