import './../componentcss/AddWorkout.css'



export default function AddWorkout({handleClick}){

    return(
        <>
            <button onClick={handleClick} className='button-add-exercise'>+ Add Exercise</button>
        </>
    )
}