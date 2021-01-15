import React from 'react';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import LoggedOutComponent from "./logged_off/components/Main";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Switch>
          <Route>
            <LoggedOutComponent />
          </Route>
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
