import './../componentcss/WorkoutInputForm.css'
import SubmitButton from './SubmitButton'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'


export default function WorkoutInputForm({
    handleSubmit,
    handleChange,
    errorForm
}){

    return(
        <Container>
            <Stack
                direction='row'
            >
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField 
                        onChange={handleChange}
                        color='primary' 
                        label='Exercise Name' 
                        variant='outlined'
                        name='exerciseName'
                        required
                        error={errorForm.exerciseName}
                    />
                    <TextField 
                        onChange={handleChange}
                        color='primary' 
                        label='Weight' 
                        variant='outlined'
                        name='weight'
                        required
                        error={errorForm.weight}
                    />
                    <TextField 
                        onChange={handleChange}
                        color='primary' 
                        label='Reps' 
                        variant='outlined'
                        name='reps'
                        required
                        error={errorForm.reps}
                    />
                    <Button                 
                        variant='contained'
                        color='secondary'
                        type='submit'
                    >   
                        Submit
                    </Button>
                </form>
            </Stack>
        </Container>
    )
}

{/* <div className='input-label-pair'>
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
                </div> */}