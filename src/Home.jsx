import WorkoutInputForm from './components/WorkoutInputForm'
import { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button'
import { AppBar, keyframes, Toolbar } from '@mui/material'
import { format } from 'date-fns'
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';


export default function Home() {
  const { currentUser } = useAuth()

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

  const drawerWidth = 240

  const styles = {
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      backgroundColor: '#f5f5f5',
      color: '#9c27b0',
    },
    toolbar: {
        height: '65.3px'
    }
  }
  
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
       <AppBar
          sx={{...styles.appBar}}
          elevation={0}
        >
          <Toolbar >
              <Typography variant="body1">Today is the {format(new Date(), 'do MMMM y')} </Typography>
          </Toolbar>
        </AppBar>
      <Stack
        direction='column'
        sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
      >
        <Typography 
            variant='h3' 
            component='h1'
            color="secondary"
            align='center'
        >
            Fitness Journal
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
