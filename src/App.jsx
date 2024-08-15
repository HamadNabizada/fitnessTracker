import './App.css'
import AddWorkout from './components/AddWorkout'
import WorkoutInputForm from './components/WorkoutInputForm'
import SubmitButton from './components/SubmitButton'

function App() {

  let listOfExercises = []
  
  const emptyListElem = (
    <h2>No Current Exercises</h2>
  )
  let listOfExercisesElem = (
    <h2>Bench Press, 5x5, 135lb</h2>
  )
  

  return (
    <>
      <div className='header'>
        <h1 className='header-title' >Fitness Journal</h1>
        <div className='header-date'>DATE</div>
      </div>
      {listOfExercises.length == 0 ? emptyListElem : listOfExercisesElem}
      <div className='workout-chart-wrapper'>
        <WorkoutInputForm/>
        <AddWorkout/>
        <SubmitButton/>
      </div>
    </>
  )
}


export default App
