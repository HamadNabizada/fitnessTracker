import { Box, Container, Button, Input, Typography } from "@mui/material"
import { useAuth } from "./context/AuthContext"
import NoUserLoggedIn from "./components/NoUserLoggedIn"
import FileImport from "./components/FileInput"
import { useEffect, useState } from "react"
import { BorderAllRounded } from "@mui/icons-material"

export default function Pictures(){
    const [selectedFile, setSelectedFile] = useState('')
    const { currentUser } = useAuth()
    const url = 'http://localhost:300/api/data/pictures/upload'

    if(!currentUser){
        return(
            <NoUserLoggedIn/>
        )
    }

    const styles = {
        box: {
            display: 'flex',
            flexDirection: 'column',
        },
        pictureInput: {
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',
            border: '1px dashed blue',
            padding: '1rem',
            borderRadius: '10px',
            justifyContent: 'space-between'
        }

    }

    function handleInputChange(e){
        setSelectedFile(e.target.files[0])
    }

    function fileInfoElems(){
        return(
            <Typography variant="h6">{`Uploaded File: ${selectedFile.name}`}</Typography>
        )
    }
    function submitButtonElem(){
        return <Button type="submit" variant="contained">Submit</Button>
    }

    async function submitPicture(e){
        e.preventDefault()
        const formData = new FormData()
        formData.append('image',selectedFile)
        try{
            const response = await fetch(url,{
                method: 'POST',
                body: formData
            })
            const data = await response.json()
            console.log(data)
        }catch(error){
            console.log(error)
        }
    }

    return(
        <Container>
            <Box onSubmit={submitPicture} encType="multipart/form-data" component='form' sx={styles.pictureInput}>
                <FileImport handleChange={handleInputChange} />
                {selectedFile && fileInfoElems()}
                {selectedFile && submitButtonElem()}
            </Box>
        </Container>
    )
}