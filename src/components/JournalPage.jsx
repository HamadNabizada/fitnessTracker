import { Container, Paper, Box, Button, Typography } from '@mui/material'

export default function JournalPage({date, userUID}){
    

    const styles = {
        containerStyle: {
            display: 'flex', 
            flexDirection: 'column'
        },
        labelValueWrapper: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
        },
        exercisesWrapper: {
            display: 'flex',
            flexDirection: 'column',
        },
        page: {
            padding: '1rem'
        },
        dateWeightWrapper: {
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between'
        }
    }

    function createExerciseElements(){
        return(
            <Box>
                <Typography>100</Typography>
                <Typography>100</Typography>
                <Typography>100</Typography>
                <Typography>100</Typography>
            </Box>
        )
    }


    return(
        <Container sx={styles.containerStyle}>
            <Paper sx={styles.page}>
                <Box sx={styles.dateWeightWrapper}>
                    <Box sx={styles.labelValueWrapper}>
                        <Typography variant='h6'>Date: </Typography>
                        <Typography variant='h5'>12/12/12</Typography>
                    </Box>
                    <Box sx={styles.labelValueWrapper}>
                        <Typography variant='h6'>Weight: </Typography>
                        <Typography variant='h5'>100</Typography>
                    </Box>
                </Box>
                <Box sx={styles.labelValueWrapper}>
                    <Typography variant='h6'>Exercises: </Typography>
                    <Box sx={styles.exercisesWrapper}>
                        {createExerciseElements()}
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
}