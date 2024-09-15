import { Box, Container, TextField, Typography, Button } from "@mui/material"
import { format } from 'date-fns'
import NoUserLoggedIn from "./components/NoUserLoggedIn"
import { useAuth } from "./context/AuthContext"
import { useEffect, useState } from "react"

export default function DailyEntry(){
    const currentDate = format(new Date(), 'do MMMM y')
    const url = 'http://localhost:3000/api/data/daily-entry'
    const [dailyData, setDailyData] = useState({
        date: currentDate,
        weight: null,
        exercises: [{ exerciseName: '', sets: '', reps: '', weight: '' }],
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
        },
        exerciseWrapper: {
            display: 'flex',
            gap: '1rem'
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

    function handleChange(e){
        setDailyData(prev =>(
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }
    function handleExerciseChange(e, index){
        setDailyData(prev =>{
            const exerciseArray = [...prev.exercises]
            exerciseArray[index] = {
                ...exerciseArray[index],
                [e.target.name] : e.target.value
            }
            return {
                ...prev,
                exercises: [...exerciseArray]
            }
        })
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
    function updateDailyDataStateWithNewExerciseObject(){
        setDailyData(prev=>{
            return (
                {
                    ...prev,
                    exercises: [...prev.exercises,
                        { exerciseName: '', sets: '', reps: '', weight: '' }]
                }
            )
        })
    }
    function removeLine(index, e){
        setDailyData(prev=>{
            const exerciseArray = [...prev.exercises]
            exerciseArray.splice(index,1)
            return{
                ...prev,
                exercises: exerciseArray
            }
        })

    }
    const exerciseElems = createExerciseElems()

    function createExerciseElems(){
        const exerciseArray = dailyData.exercises.map((value,index) =>{
            
            return(
                <Box key={index} sx={styles.exerciseWrapper}>
                    <TextField value={value.exerciseName} name="exerciseName" label="Exercise" onChange={e => handleExerciseChange(e,index)}  autoComplete="false" variant="outlined"/>
                    <TextField value={value.sets} name="sets" label="Sets" onChange={e => handleExerciseChange(e,index)} type="number" autoComplete="false" variant="outlined"/>
                    <TextField value={value.reps} name="reps" label="Reps" onChange={e => handleExerciseChange(e,index)} type="number" autoComplete="false" variant="outlined"/>
                    <TextField value={value.weight} name="weight" label="Weight (lbs)" onChange={e => handleExerciseChange(e,index)} type="number" autoComplete="false" variant="outlined"/>
                    <Button onClick={(e)=> removeLine(index, e)}>Remove</Button>
                </Box>
            )
        })
        return exerciseArray
    }
    
    // function submitData1(){
    //     console.log(dailyData)
    // }

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
                    <TextField onChange={handleChange} name='weight' label='lbs' type="number" autoComplete="false" variant="outlined" />
                </Box>
                {exerciseElems}
                <Button onClick={updateDailyDataStateWithNewExerciseObject}><Typography >+ Add New Line</Typography></Button>
                <Button onClick={submitData} sx={styles.button} color="secondary" variant="contained">Submit</Button>
            </Box>
        </Container>
    )
}