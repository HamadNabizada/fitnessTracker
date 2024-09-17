import { Container, Icon, Card, Box, Typography, CardActionArea, CardContent } from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function Dashboard(){

    const styles = {
        cardStyle: {
            maxWidth: '500px',
            // minHeight: '130px',
            // border: '1px solid red'
        },
        cardContentStyle:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

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
                    <CardActionArea>
                        <CardContent sx={styles.cardContentStyle}>
                            <Typography gutterBottom variant='h5'>
                                Profile
                            </Typography>
                            <Typography variant='body2'>
                                Go to your profile settings
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={styles.cardStyle}>
                    <CardActionArea>
                        <CardContent sx={styles.cardContentStyle}>
                            <Typography gutterBottom variant='h5'>
                                Journal
                            </Typography>
                            <Typography variant='body2'>
                                See your workout journal
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={styles.cardStyle}>
                    <CardActionArea>
                        <CardContent sx={styles.cardContentStyle}>
                            <Typography gutterBottom variant='h5'>
                                Daily Entry
                            </Typography>
                            <Typography variant='body2'>
                                Entry your daily workout
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card sx={styles.cardStyle}>
                    <CardActionArea>
                        <CardContent sx={styles.cardContentStyle}>
                            <Typography gutterBottom variant='h5'>
                                Pics
                            </Typography>
                            <Typography variant='body2'>
                                Save pics to track your progress
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Container>
    )
}