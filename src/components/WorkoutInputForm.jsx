import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { Box } from '@mui/material'


export default function WorkoutInputForm({
    handleSubmit,
    handleChange,
    errorForm
}){

    return(
        <Container>
                <Box 
                    component='form' 
                    noValidate 
                    autoComplete='off' 
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}
                >
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
                </Box>
        </Container>
    )
}