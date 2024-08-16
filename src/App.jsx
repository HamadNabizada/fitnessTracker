import './App.css'
import AddWorkout from './components/AddWorkout'
import WorkoutInputForm from './components/WorkoutInputForm'
import { useState } from 'react'

function App() {
  let [addingExercise, setAddingExercise] = useState(false);
  let listOfExercises = []
  let [exerciseForm, setExerciseForm] = useState({
    exerciseName:'Exercise Name',
    reps:0,
    weight:0
  })
  
  const emptyListElem = (
    <p>No Current Exercises</p>
  )
  let listOfExercisesElem = (
    <p>Bench Press, 5x5, 135lb</p>
  )

  let [title, setTitle] = useState({first: "default title"})
  function titleChange(e){
    console.log(`title before change: ${title.first}`)
    setTitle({first:"changed"})
    console.log(`title after change: ${title.first}`)
  }

  function addNewExercise(){
    setAddingExercise(true)
  }
  function submitInputForm(){
    setAddingExercise(false)
  }
 
  function handleChange(e){
    // setExerciseForm()
    console.log('updating change')
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
      {listOfExercises.length == 0 ? emptyListElem : listOfExercisesElem}
      {!addingExercise ? <AddWorkout handleClick={addNewExercise} /> : 
        <WorkoutInputForm titleChange={titleChange} title={title} handleChange={handleChange} exerciseForm={exerciseForm} handleSubmit={submitInputForm}/>}
      </div>
    </>
  )
}


export default App
