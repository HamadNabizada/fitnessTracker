import WorkoutInputForm from './components/WorkoutInputForm'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'


export default function Home() {
  const [addingExercise, setAddingExercise] = useState(false);
  const [listOfExercises, setListOfExercises] = useState([])
  const [exerciseForm, setExerciseForm] = useState({
    exerciseName:null,
    reps:null,
    weight:null
  })
  const [errorForm, SetErrorForm] = useState({
    exerciseNameError:false,
    repsError:false,
    weightError:false
})
  
  const url = 'http://localhost:3000/api/data'

  async function fetchData(url){
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
  }

  useEffect(()=>{
    fetchData(url)
  },[])



  function createWorkoutLogElems(){

    if(listOfExercises.length === 0){
      return <Typography align='center' >--- No Current Exercises ---</Typography>
    }
    return listOfExercises.map((item,index)=>{
        return(
            <Typography
                key={index}
                variant='body1'

            >
                {`${item.exerciseName}, ${item.reps}, ${item.weight}`}
            </Typography>
        )
    //   return <p key={index}>{`${item.exerciseName}, ${item.reps}, ${item.weight}`}</p>
    })
  }


  function addNewExercise(){
    setAddingExercise(true)
  }
  function submitInputForm(e){
    e.preventDefault()
    if( exerciseForm.weight && exerciseForm.reps && exerciseForm.exerciseName){
        setListOfExercises(prev =>(
          [
            ...prev,
            {
              ...exerciseForm
            }
          ]
        ))
        setAddingExercise(false)
    }else{
        SetErrorForm({
            exerciseNameError:false,
            repsError:false,
            weightError:false
        })
        if(!exerciseForm.exerciseName){
            SetErrorForm(prev =>(
                {
                    ...prev,
                    exerciseName: true
                }
            ))
        }
        if(!exerciseForm.weight){
            SetErrorForm(prev =>(
                {
                    ...prev,
                    weight: true
                }
            ))
        }
        if(!exerciseForm.reps){
            SetErrorForm(prev =>(
                {
                    ...prev,
                    reps: true
                }
            ))
        }
    }
  }
 
  function handleChange(e){
    setExerciseForm(prev=>(
      {
        ...prev,
        [e.target.name]:e.target.value
      }
    ))
  }

  return (
    <Container>
      <Stack
        direction='row'
        sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
      >
        <Typography 
            variant='h3' 
            component='h1'
            color="primary"
            align='left'
        >
            Fitness Journal
        </Typography>
        <Typography
            variant='h5'
            component='h3'
            align='right'
            color='secondary'
        >
            Date
        </Typography>
      </Stack>
      <Stack>
        {createWorkoutLogElems()}
        {!addingExercise ?             
            <Button 
                variant='contained'
                color='secondary'
                onClick={addNewExercise}
            >
                + Add Exercise
            </Button> : 
            <WorkoutInputForm handleChange={handleChange} errorForm={errorForm} handleSubmit={submitInputForm}/>}
      </Stack>
    </Container>
  )
}
