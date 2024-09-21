import { Container, Paper, Box,Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function JournalPage({
    entryData,
    loading
}){

    const [date, setDate] = useState('')
    const [weight, setWeight] = useState('')

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
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            // justifyItems: 'stretch',
        },
        page: {
            padding: '1rem'
        },
        dateWeightWrapper: {
            display: 'flex',
            flexDirection: 'row-reverse',
            justifyContent: 'space-between'
        },
        exerciseAndLabelWrapper: {
            display: 'flex',
            flexDirection: 'column',
        },
        exerciseLabelWrapper: {
            borderBottom: '1px solid black',
            // justifyItems: 'center',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr'
        }
    }
    function createExerciseElements(){
        if(!entryData){
            return
        }
        const elemsArray = entryData.exercises.map((item, index)=>{
            return(
                <Box key={index} sx={styles.exercisesWrapper}>
                    <Typography variant='body1'>{item.exerciseName}</Typography>
                    <Typography sx={{justifySelf: 'center'}} variant='body1'>{item.sets}</Typography>
                    <Typography sx={{justifySelf: 'center'}} variant='body1'>{item.reps}</Typography>
                    <Typography sx={{justifySelf: 'center'}} variant='body1'>{item.weight}</Typography>
                </Box>
            )
        })
        return elemsArray
    }

    useEffect(()=>{
        if(entryData){
            setWeight(entryData.weight)
            const dateString = entryData.date
            const formattedDate = dayjs(dateString, 'MM DD YYYY')
            setDate(formattedDate.format('DD MMMM YYYY'))
        }
    }, [entryData])

    return(
        <Container sx={styles.containerStyle}>
            <Paper sx={styles.page}>
                <Box sx={styles.dateWeightWrapper}>
                    <Box sx={styles.labelValueWrapper}>
                        <Typography variant='h6'>Date: </Typography>
                        <Typography variant='h5'>{date}</Typography>
                    </Box>
                    <Box sx={styles.labelValueWrapper}>
                        <Typography variant='h6'>Weight: </Typography>
                        <Typography variant='h5'>{weight} lbs</Typography>
                    </Box>
                </Box>
                <Box sx={styles.exerciseAndLabelWrapper}>
                    <Box sx={styles.exerciseLabelWrapper}>
                        <Typography color='primary' variant='h6'>Exercises: </Typography>
                        <Typography sx={{justifySelf: 'center'}} color='primary' variant='h6'>Sets: </Typography>
                        <Typography sx={{justifySelf: 'center'}} color='primary' variant='h6'>Reps: </Typography>
                        <Typography sx={{justifySelf: 'center'}} color='primary' variant='h6'>Weight (lbs): </Typography>
                    </Box>
                    {createExerciseElements()}
                </Box>
            </Paper>
        </Container>
    )
}