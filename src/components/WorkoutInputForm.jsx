import './../componentcss/WorkoutInputForm.css'
import SubmitButton from './SubmitButton'

export default function WorkoutInputForm({
    handleSubmit,
    exerciseForm,
    handleChange
}){

    return(
        <>
            <div className='input-wrapper'>
                <div className='input-label-pair'>
                    <input onClick={(e)=>e.target.select()} name='exerciseName' onChange={handleChange} value={exerciseForm.exerciseName} className='input-styling'></input>
                    <label>Exercise Name</label>
                </div>
                <div className='input-label-pair'>
                    <input onClick={(e)=>e.target.select()}  name='reps' onChange={handleChange} value={exerciseForm.reps} className='input-styling'></input>
                    <label>Reps</label>
                </div>
                <div className='input-label-pair'>
                    <input onClick={(e)=>e.target.select()} name='weight' onChange={handleChange} value={exerciseForm.weight} className='input-styling'></input>
                    <label>Weight</label>
                </div>
                <SubmitButton handleSubmit={handleSubmit}/>
            </div>
        </>
    )
}