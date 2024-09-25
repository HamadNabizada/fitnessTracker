import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function JournalEntryModal({modalInfo, handleDataOverwrite, handleModal}) {
  const navigateTo = useNavigate()
  const [open, setOpen] = React.useState(handleModal);
  const handleClose = () => setOpen(false);

  function goHome(){
    navigateTo('/')
  }

  return (
    <div>
      <Modal
        open={open}
        slotProps={{
          backdrop: {onClick: (event) => event.stopPropagation()}
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{
            display:'flex',
            flexDirection:'column',
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {modalInfo.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {modalInfo.message}
            </Typography>
            <Button onClick={goHome} variant='outlined' sx={{marginTop: '1rem'}}>Go Home</Button>
            {modalInfo.type ==='overwrite' && <Button onClick={handleDataOverwrite} variant='contained' sx={{marginTop: '1rem'}}>Overwrite Data</Button>}
          </Box>
        </Box>
      </Modal>
    </div>
  );
}