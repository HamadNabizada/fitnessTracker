import { Typography, Link } from '@mui/material'

export default function NoUserLoggedIn(){

    return(
        <>
            <Typography variant='body1'>
                You are not logged in. Click <Link href="/login">here</Link> to log in.
            </Typography>
        </>
    )
}