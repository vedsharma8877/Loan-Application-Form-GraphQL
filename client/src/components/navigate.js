import {
    Button,
    Box,
  } from "@mui/material";
  import { Link, Outlet } from 'react-router-dom';
  
const Navigate = () => {
    return(
        <div>
            <Box container justifyContent="center" mx={3} my={2}>
            <Button component={Link} to={'form'} variant="contained" size="large" fullWidth>Loan Application Form</Button>
            </Box>
            <Box container justifyContent="center" mx={3} my={2}>
                <Button component={Link} to={'user'} variant="contained" size="large" fullWidth>User Details</Button>
            </Box>
            <Outlet />
            </div>
    )
}

export default Navigate;