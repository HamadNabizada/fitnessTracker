import { Box, Container, TextField, Typography, Button } from "@mui/material"
import { format } from 'date-fns'
import NoUserLoggedIn from "./components/NoUserLoggedIn"
import { useAuth } from "./context/AuthContext"
import { useEffect, useState } from "react"

export default function DailyEntry(){
    const date = new Date()
    const currentDate = format(date, 'do MMMM y')
    const url = 'http://localhost:3000/api/data/daily-entry'
    const [dailyData, setDailyData] = useState({
        date: currentDate,
        weight: null,
        exercises: [{ exerciseName: '', sets: '', reps: '', weight: '' }],
    })
    const [errorCheck, setErrorCheck] = useState({
        weight: false,
        exercises: [{ exerciseName: false, sets: false, reps: false, weight: false }],
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
        if(ValidateData()){
            try{
               await submitToDB()
            }catch(error){
                console.log(error)
            }
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
            setErrorCheck(prev =>{
                return{
                    ...prev,
                    exercises: [...prev.exercises,
                        { exerciseName: false, sets: false, reps: false, weight: false }]

            }
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
        setErrorCheck(prev=>{
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
                    <TextField error={errorCheck.exercises[index].exerciseName} required value={value.exerciseName} name="exerciseName" label="Exercise" onChange={e => handleExerciseChange(e,index)}  autoComplete="false" variant="outlined"/>
                    <TextField error={errorCheck.exercises[index].sets} required value={value.sets} name="sets" label="Sets" onChange={e => handleExerciseChange(e,index)} type="number" autoComplete="false" variant="outlined"/>
                    <TextField error={errorCheck.exercises[index].reps} required value={value.reps} name="reps" label="Reps" onChange={e => handleExerciseChange(e,index)} type="number" autoComplete="false" variant="outlined"/>
                    <TextField error={errorCheck.exercises[index].weight} required value={value.weight} name="weight" label="Weight (lbs)" onChange={e => handleExerciseChange(e,index)} type="number" autoComplete="false" variant="outlined"/>
                    <Button onClick={(e)=> removeLine(index, e)}>Remove</Button>
                </Box>
            )
        })
        return exerciseArray
    }
    function ValidateData(){
        setErrorCheck(prev =>{
            const exercisesArray = [...prev.exercises]
            const updatedArray = exercisesArray.map(item=>{
                return{ 
                    exerciseName: false, sets: false, reps: false, weight: false 
                }
                
            })
            return{
                weight: false,
                exercises: updatedArray
            }
        })
        if(!dailyData.weight){
            setErrorCheck(prev=>{
                return{
                    ...prev,
                    weight: true
                }
            })
        }
        let noErrorsInExercisesArray = true
        const updatedExerciseArray = dailyData.exercises.map((item,index)=>{
            let returnExercise = {
                exerciseName: false, sets: false, reps: false, weight: false 
            }
            if(!item.exerciseName){
                noErrorsInExercisesArray = false
                returnExercise = {
                    ...returnExercise,
                    exerciseName: true
                }
            }
            if(!item.sets){
                noErrorsInExercisesArray = false
                returnExercise = {
                    ...returnExercise,
                    sets: true
                }
            }
            if(!item.reps){
                noErrorsInExercisesArray = false
                returnExercise = {
                    ...returnExercise,
                    reps: true
                }
            }
            if(!item.weight){
                noErrorsInExercisesArray = false
                returnExercise = {
                    ...returnExercise,
                    weight: true
                }
            }
            return returnExercise
        })
        setErrorCheck(prev =>{
            return {
                ...prev,
                exercises: updatedExerciseArray
            }
        })
        return noErrorsInExercisesArray
    }
    
    // function submitData1(){
    //     ValidateData()
    //     console.log(dailyData)
    //     console.log(errorCheck)
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
                    <TextField error={errorCheck.weight} required onChange={handleChange} name='weight' label='lbs' type="number" autoComplete="false" variant="outlined" />
                </Box>
                {exerciseElems}
                <Button onClick={updateDailyDataStateWithNewExerciseObject}><Typography >+ Add New Line</Typography></Button>
                <Button onClick={submitData} sx={styles.button} color="secondary" variant="contained">Submit</Button>
            </Box>
        </Container>
    )
}