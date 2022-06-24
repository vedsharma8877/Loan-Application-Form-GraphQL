import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { darken, lighten } from '@mui/material/styles';
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { useMutation, useQuery } from "@apollo/client";
import { PropagateLoader} from 'react-spinners'
import { css} from '@emotion/react'
import { GET_USERS } from "./queries/userQueries";
import { UPDATE_USER } from "./mutations/userMutation";
import DataGridPagination from "./DataGridPagination";

const loaderCSS = css`
display: flex;
justify-content: center;
margin-top: 200px;
margin-bottom: 25px'
`

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

// const getHoverBackgroundColor = (color, mode) =>
//   mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);


const UserDetails = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  
  const [ updateUser ] = useMutation(UPDATE_USER, {
    refetchQueries: {GET_USERS}
  })
   console.log(data);
  console.log(data && data.users)

  const confirmationApproval = () => {
      return(window.confirm("*Are you sure you want to Approve the application?"));

  }

  const confirmationRejection = () => {
      return(window.confirm("*Are you sure you want to Reject the application?"));

  }

  const columns = [
    //{field:'_id', headerName:'ID'},
    {
      field: "fname",
      headerName: "First Name",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lname",
      headerName: "Last Name",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      headerAlign: "center",
      align: "center",
      width: 200,
    },
    {
      field: "lamount",
      headerName: "Loan Amount($)",
      headerAlign: "right",
      align: "right",
      width: 150,
    },
    {
      field: "lpurpose",
      headerName: "Loan Purpose",
      headerAlign: "center",
      align: "center",
    },
    { field: "sa1", headerName: "Address" },
    {
      field: "city",
      headerName: "City",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "approve",
      headerName: "Approve",
      headerAlign: "center",
      align: "center",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        if (params.row.status !== "Pending") {
          return "";
        } else {
          return (
            <Button
              variant="contained"
              color="success"
              startIcon={<CheckIcon />}
              onClick={() => {
                  if(confirmationApproval()){
                      updateUser({
                        variables:{
                          id:params.row.id, status:'Approved'} })
                  }
              }}
            >
              Approve
            </Button>
          );
        }
      },
    },
    {
      field: "reject",
      headerName: "Reject",
      width: 150,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        if (params.row.status !== "Pending") return "";
        else {
          return (
            <Button
              variant="contained"
              color="error"
              startIcon={<ClearIcon />}
              onClick={() => {
                  if(confirmationRejection()){
                    updateUser({
                      variables:{
                        id:params.row.id, status:'Rejected'} })
                  }
              }}
            >
              Reject
            </Button>
          );
        }
      },
    },
  ];

  
  if (loading) return <PropagateLoader color='blue' css={loaderCSS} />
  if (error) return <p>Error</p>;

  return (
    <Box sx={{
      '& .super-app-theme--Rejected': {
      bgcolor: (theme) =>
        getBackgroundColor(theme.palette.error.main, theme.palette.mode),
      // '&:hover': {
      //   bgcolor: (theme) =>
      //     getHoverBackgroundColor(theme.palette.error.main, theme.palette.mode),
      // },
    },
    '& .super-app-theme--Approved': {
      bgcolor: (theme) =>
        getBackgroundColor(theme.palette.success.main, theme.palette.mode),
      // '&:hover': {
      //   bgcolor: (theme) =>
      //     getHoverBackgroundColor(
      //       theme.palette.success.main,
      //       theme.palette.mode,
      //     ),
      // },
    },
  }}>
      <Typography variant="h2" mx={2} my={2} align="center">
        User Details
      </Typography>
      <Paper>
      <DataGrid
        rows={data.users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowId={(row) => row.id}
        getRowClassName={(params) => `super-app-theme--${params.row.status}`}
        autoHeight
        autoPageSize
        components={{ Toolbar: GridToolbar,
        Pagination: DataGridPagination }}
        checkboxSelection
        disableSelectionOnClick
      />
      </Paper>
    </Box>
  );
};
export default UserDetails;
