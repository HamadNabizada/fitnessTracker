import './App.css'
import AddWorkout from './components/AddWorkout'
import WorkoutInputForm from './components/WorkoutInputForm'
import { useState } from 'react'

function App() {
  let [addingExercise, setAddingExercise] = useState(false);
  let listOfExercises = []
  
  const emptyListElem = (
    <p>No Current Exercises</p>
  )
  let listOfExercisesElem = (
    <p>Bench Press, 5x5, 135lb</p>
  )


  function addNewExercise(){
    setAddingExercise(true)
  }
  function submitInputForm(){
    setAddingExercise(false)
  }

  return (
    <>
      <div className='header'>
        <h1 className='header-title' >Fitness Journal</h1>
        <div className='header-date'>DATE</div>
      </div>
      <div className='workout-chart-wrapper'>
      {listOfExercises.length == 0 ? emptyListElem : listOfExercisesElem}
      {!addingExercise ? <AddWorkout handleClick={addNewExercise} /> : <WorkoutInputForm handleSubmit={submitInputForm}/>}
      </div>
    </>
  )
}


export default App
