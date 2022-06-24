import React from 'react'
import {
  Typography, CssBaseline, Switch, Grid
} from "@mui/material";
import {ThemeProvider, createTheme} from "@mui/material/styles"
import {useState} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigate from "./components/navigate"
import Form from "./components/form"
import UserDetails from "./components/userDetails"
import {  Route, Routes} from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming
          }
        },
      }
    }
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5001/graphql',
  cache,
})

toast.configure();

const light = {
  palette: {
    mode: "light",
  },
};
const dark = {
  palette: {
    mode: "dark",
  },
};
  const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const changeTheme = () => {
      setIsDarkTheme(!isDarkTheme);
    };

  return (
    <React.Fragment>
    <ApolloProvider client={client}>
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
    <CssBaseline />
    <div>
    <Grid
    container 
    direction="row"
  justifyContent="flex-end"
  alignItems="center">
    <Switch checked={isDarkTheme} onChange={changeTheme} />
    <Typography variant="body1">
    Dark Mode is {isDarkTheme ? "On" : "Off"}
  </Typography>
    </Grid>
    <Routes>
    <Route path="/" element={<Navigate />}>
    </Route>
      <Route path="form" element={<Form />}>
      </Route>
      <Route path="user" element={<UserDetails />}>
      </Route>
    </Routes>
    </div>
    </ThemeProvider>
    </ApolloProvider>
    </React.Fragment>
  );
};

export default App;
