import { Container, Card, Box, Typography, CardActionArea, CardContent } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InsertPhotoIcon from '@mui/icons-material/Photo'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import BookIcon from '@mui/icons-material/Book'
import { useNavigate } from 'react-router-dom';

export default function Dashboard(){
    const navigateTo = useNavigate()

    const styles = {
        cardStyle: {
            marginBottom: '1rem'
        },
        cardContentStyle:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '100px'

        },
        cardWrapper : {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
        }
    }

    return(
        <Container>
            <Box sx={styles.cardWrapper}>
                <Card sx={styles.cardStyle}>
                    <CardActionArea onClick={() => navigateTo('/profile')}>
                        <CardContent sx={styles.cardContentStyle}>
                            <Typography color='primary' gutterBottom variant='h4'>
                                Profile
                            </Typography>
                            <AccountBoxIcon color='primary' fontSize='inherit'/>
                            <Typography color='textPrimary' variant='body1'>
                                Go to your profile settings
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={styles.cardStyle}>
                    <CardActionArea onClick={() => navigateTo('/journal')}>
                        <CardContent sx={styles.cardContentStyle}>
                            <Typography color='primary' gutterBottom variant='h4'>
                                Journal
                            </Typography>
                            <BookIcon color='primary' fontSize='inherit'/>
                            <Typography color='textPrimary' variant='body1'>
                                See your workout journal
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={styles.cardStyle}>
                    <CardActionArea onClick={() => navigateTo('/daily-entry')}>
                        <CardContent sx={styles.cardContentStyle}>
                            <Typography color='primary' gutterBottom variant='h4'>
                                Daily Entry
                            </Typography>
                            <CalendarTodayIcon color='primary' fontSize='inherit'/>
                            <Typography color='textPrimary' variant='body1'>
                                Save your daily workout
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={styles.cardStyle}>
                    <CardActionArea onClick={() => navigateTo('/pictures')}>
                        <CardContent sx={styles.cardContentStyle}>
                            <Typography color='primary' gutterBottom variant='h4'>
                                Pictures
                            </Typography>
                            <InsertPhotoIcon color='primary' fontSize='inherit'/>
                            <Typography color='textPrimary' variant='body1'>
                                Save pics to track your progress
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Container>
    )
}