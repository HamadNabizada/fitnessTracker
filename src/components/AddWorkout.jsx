// import './../componentcss/AddWorkout.css'
import Button from '@mui/material/Button';



export default function AddWorkout({handleClick}){

    return(
        <>
            {/* <button onClick={handleClick} className='button-add-exercise'>+ Add Exercise</button> */}
            <Button 
                variant='contained'
                color='secondary'
                onClick={handleClick}
            >
                + Add Exercise
            </Button>
        </>
    )
}