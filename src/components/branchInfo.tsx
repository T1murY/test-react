import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import { useState } from 'react'
import BranchIcon from './icons'
import BranchUpdateCreateModal from './branchUpdateCreateModal';
function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);
  
    return color;
  }

const BranchInfo = ({branch}:any) => {
    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => {
        setOpenModal(true);
      };
      const handleSubmit = (formData: any) => {
        // Send the form data to your API
        console.log('Form Data:', formData);
        // You can use fetch, Axios, or any other library to send the data to your API
        setOpenModal(false);
      };
  return (
    <Box sx={{backgroundColor:'white',borderRadius: 4,margin: 1,padding: 3, }}>
        <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <Avatar
        variant="square"
        sx={{
            backgroundColor: randomColor(),
            width: 55,
            height: 55,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
            mr: 2,
        }}
        >
            <BranchIcon fontSize='large'/>
        </Avatar>
        
        <Typography variant="h6" gutterBottom>
            Şube Bilgileri
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
            Bilgileri Düzenle
        </Button>
        <BranchUpdateCreateModal open={openModal} onClose={() => setOpenModal(false)} onSubmit={handleSubmit} branch={branch}/>
    </Box>
    <Typography variant="h6" gutterBottom marginTop={3}>
            {branch.name}
        </Typography>
    <Divider sx={{ mb: 1, color:'black',marginTop:1}} />
    <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        }}>
        <Typography variant="body1" color={'GrayText'} fontWeight={'bold'}>
            Email :
        </Typography>
        <Typography variant="body1" gutterBottom>
            {branch.email} 
        </Typography>
        <Typography variant="body1" color={'GrayText'} fontWeight={'bold'}>
            Telefon :
        </Typography>
        <Typography variant="body1" gutterBottom>
            {branch.phone} 
        </Typography>
        <Typography variant="body1" color={'GrayText'} fontWeight={'bold'}>
            Oluşturma Tarihi :
        </Typography>
        <Typography variant="body1" gutterBottom>
            {branch.createdOn} 
        </Typography>
        <Typography variant="body1" color={'GrayText'} fontWeight={'bold'}>
            Konum :
        </Typography>
        <Typography variant="body1" gutterBottom>
            {branch.address} 
        </Typography>

        </Box>

    </Box>
    
  )
}

export default BranchInfo