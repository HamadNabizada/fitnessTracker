import './../componentcss/WorkoutInputForm.css'

export default function WorkoutInputForm(){

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
            </div>
        </>
    )
}