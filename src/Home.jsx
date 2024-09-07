import './App.css'
import AddWorkout from './components/AddWorkout'
import WorkoutInputForm from './components/WorkoutInputForm'
import { useEffect, useState } from 'react'

export default function Home() {
  const [addingExercise, setAddingExercise] = useState(false);
  const [listOfExercises, setListOfExercises] = useState([])
  const [exerciseForm, setExerciseForm] = useState({
    exerciseName:'Exercise Name',
    reps:0,
    weight:0
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
      return <p>No Current Exercises</p>
    }
    return listOfExercises.map((item,index)=>{
      return <p key={index}>{`${item.exerciseName}, ${item.reps}, ${item.weight}`}</p>
    })
  }


  function addNewExercise(){
    setAddingExercise(true)
  }
  function submitInputForm(){
    setListOfExercises(prev =>(
      [
        ...prev,
        {
          ...exerciseForm
        }
      ]
    ))
    setAddingExercise(false)
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
    <>
      <div className='header'>
        <h1 className='header-title' >Fitness Journal</h1>
        <div className='header-date'>DATE</div>
      </div>
      <div className='workout-chart-wrapper'>
      {createWorkoutLogElems()}
      {!addingExercise ? <AddWorkout handleClick={addNewExercise} /> : 
        <WorkoutInputForm handleChange={handleChange} exerciseForm={exerciseForm} handleSubmit={submitInputForm}/>}
      </div>
    </>
  )
}
