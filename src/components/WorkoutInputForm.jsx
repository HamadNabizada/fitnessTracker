import { Box, Button, Typography, TextField} from '@mui/material'
import { useState } from 'react'


export default function WorkoutInputForm({
    currentDate,
    currentUser
}){
    const [loading, setLoading] = useState(false)

    const url = 'http://localhost:3000/api/data/journal/entry'
    const [inputData, setInputData] = useState({
        date: currentDate,
        weight: null,
        exercises: [{ exerciseName: '', sets: '', reps: '', weight: '' }],
    })
    const [errorCheck, setErrorCheck] = useState({
        weight: false,
        exercises: [{ exerciseName: false, sets: false, reps: false, weight: false }],
    })

    const styles = {
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

    const exerciseElems = createExerciseElems()

    function createExerciseElems(){
        const exerciseArray = inputData.exercises.map((value,index) =>{
            
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
    function handleChange(e){
        setInputData(prev =>(
            {
                ...prev,
                [e.target.name]: e.target.value
            }
        ))
    }
    function handleExerciseChange(e, index){
        setInputData(prev =>{
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
        if(loading) return
        setLoading(true)
        e.preventDefault()
        if(ValidateData()){
            try{
               await submitToDB()
            }catch(error){
                console.log(error)
            }
        }
        setLoading(false)
    }
    async function submitToDB(){
        const response = await fetch(url,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                entry:{...inputData},
                userUID: currentUser.uid
            })
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message); // Handle non-200 responses
        }
    }
    function updateDataStateWithNewExerciseObject(){
        setInputData(prev=>{
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
        setInputData(prev=>{
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
        if(!inputData.weight){
            setErrorCheck(prev=>{
                return{
                    ...prev,
                    weight: true
                }
            })
        }
        let noErrorsInExercisesArray = true
        const updatedExerciseArray = inputData.exercises.map((item,index)=>{
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

    return(
        <Box 
            component="form"
            autoComplete="off"
            noValidate
            sx={styles.boxStyle}
        >
            <Box sx={styles.labelAndInputWrapper}>
                <Typography color='secondary' variant='body1' sx={styles.label} >Weight:</Typography>
                <TextField error={errorCheck.weight} required onChange={handleChange} name='weight' label='lbs' type="number" autoComplete="false" variant="outlined" />
            </Box>
            {exerciseElems}
            <Button onClick={updateDataStateWithNewExerciseObject}><Typography >+ Add New Line</Typography></Button>
            <Button onClick={submitData} sx={styles.button} color="secondary" variant="contained">Submit</Button>
        </Box>
    )
}