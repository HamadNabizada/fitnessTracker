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
            display: 'flex',
            flexDirection: 'row',
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
        if(!entryData){
            return
        }
        const elemsArray = entryData.exercises.map((item, index)=>{
            return(
                <Box key={index} sx={styles.exercisesWrapper}>
                    <Typography variant='body1'>Exercise: {item.exerciseName}</Typography>
                    <Typography variant='body1'>Sets: {item.sets}</Typography>
                    <Typography variant='body1'>Reps: {item.reps}</Typography>
                    <Typography variant='body1'>Weight: {item.weight}lbs</Typography>
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
                        <Typography variant='h5'>{weight}</Typography>
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