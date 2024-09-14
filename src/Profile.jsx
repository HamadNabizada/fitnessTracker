import { Container, Box, Typography, Link, Button } from '@mui/material'
import { signOutUser, useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom';

export default function Profile(){

    const navigateTo = useNavigate()
    const {currentUser} = useAuth();

    const styles = {
        container: {
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        profileBox:{
            display:'flex',
            flexDirection:'column',
            border: '1px solid black',
            borderRadius: '5px',
            padding: '1rem',
            width: '500px',
            alignItems: 'center',
            gap: '1rem'
        }
    }

   async function logoutUser(){
        try{
            signOutUser()
            navigateTo('/login')
        }catch(error){
            console.log(error)
        }
    }

    return(
        <Container sx={styles.container}>
            {!currentUser ?
                <Typography variant='body1'>
                    You are not logged in. Click <Link href="/login">here</Link> to log in.
                </Typography>
                :
                <Box sx={styles.profileBox}>
                    <Typography variant='h4'>User: {currentUser.isAnonymous ? 'Anonymous' : currentUser.email}</Typography>
                    <Button variant='contained' onClick={logoutUser} >Log Out</Button>
                </Box>
            }
        </Container>
    )
}