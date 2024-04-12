import AttachMoney from '@mui/icons-material/AttachMoney'
import { Avatar, Box, Typography } from '@mui/material'
import PropTypes from 'prop-types';
const BranchDetailEarning = (props:any) => {
  return (
    <Box sx={{backgroundColor:'white',borderRadius:4,padding:2}}>
        <Typography variant="h6" gutterBottom>
            {props.title}
        </Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        
        }}>
        <Typography variant="h4" fontWeight="bold">
            <span>{props.amount}</span>
            {props.yearly && <span style={{fontSize:10}}> /Yıllık</span>}
        </Typography>
        <Box sx={{
            display: 'flex',
            ml: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            }}>
        <Avatar variant="square" sx={{backgroundColor: "#F9DDC5",
              width: 55,
              height: 55,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              mr: 2,}}>
        <AttachMoney sx={{color:"orange"}} fontSize='large' />
        </Avatar>
        </Box>
        
        </Box>
    </Box>
  )
}


BranchDetailEarning.propTypes = {
    title: PropTypes.string.isRequired, // must be a string and defined
    amount: PropTypes.number.isRequired, // must be a number and defined
    yearly: PropTypes.bool.isRequired  // must be a string and defined
};

export default BranchDetailEarning