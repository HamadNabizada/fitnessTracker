import { Typography, Drawer, Box } from "@mui/material"
import { List, ListItem, ListItemText } from "@mui/material"
import { useNavigate } from 'react-router-dom'

export default function Layout({ children }){
    
    const navigate = useNavigate()
    const drawerWidth = 200

    const styles = {
        page: {
            background: '#f9f9f9',
            width: '100%',
            marginLeft: '1rem'
        },
        layout: {
            display:'flex',

        },
        boxList: {
            width: drawerWidth,
            "&:hover": {
                backgroundColor: '#f5f5f5',
                cursor: 'pointer'
            }
        }
    }

    return(
        <div style={styles.layout}>  
            {/* app bar */}
            <Drawer 
                variant="permanent"
                anchor="left"
                sx={{width: drawerWidth}}
            >
                <Box p={2} sx={styles.boxList} onClick={()=>navigate('/')} textAlign='center'>
                    <Typography variant='h5'>Home</Typography>
                </Box>
                <Box p={2} sx={styles.boxList} onClick={()=>navigate('/login')} textAlign='center'>
                    <Typography variant='h5'>Login</Typography>
                </Box>
            </Drawer>
            <div style={styles.page}>
                {children}
            </div>
        </div>
    )
}