import './../componentcss/WorkoutInputForm.css'
import SubmitButton from './SubmitButton'

export default function WorkoutInputForm({handleSubmit}){

    return(
        <>
            <div className='input-wrapper'>
                <div className='input-label-pair'>
                    <input className='input-styling'></input>
                    <label>Exercise Name</label>
                </div>
                <div className='input-label-pair'>
                    <input className='input-styling'></input>
                    <label>Reps</label>
                </div>
                <div className='input-label-pair'>
                    <input className='input-styling'></input>
                    <label>Weight</label>
                </div>
                <SubmitButton handleSubmit={handleSubmit}/>
            </div>
        </>
    )
}