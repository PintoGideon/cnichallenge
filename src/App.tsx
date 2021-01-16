import React from 'react';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import LoggedOutComponent from "./logged_off/components/Main";
import LoggedInComponent from "./logged_in/components/Main";
import * as auth from "./utils/auth-provider";

import './App.css';

function App() {
  const [user, setUser] = React.useState("");
  const register = (form: {
    username: string;
    email: string;
    password: string;
  }) => {
    auth.register(form).then((u) => {
      u.user.username && setUser(u.user.username);
    });
  };

  const login = (form: { username: string; password: string }) => {
    auth.login(form).then((u) => u.user.username && setUser(u.user.username));
  };


  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Switch>
          <Route>
            {user ? (
              <LoggedInComponent user={user} />
            ) : (
              <LoggedOutComponent register={register} login={login} />
            )}
          </Route>
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
