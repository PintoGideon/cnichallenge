import React from 'react';
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import LoggedOutComponent from "./logged_off/components/Main";
import LoggedInComponent from "./logged_in/components/Main";
import * as auth from "./utils/auth-provider";

import './App.css';

export type Auth = {
  username: string;
  password: string;
};

export type RegisterErrorPayload={
  username:string,
  email:string,
  password:string

}


function App() {
  const [user, setUser] = React.useState<Auth>({
    username: "",
    password: "",
  });
  const [authError, setAuthError] = React.useState("");
  const [registerError, setRegisterError] = React.useState<RegisterErrorPayload>({
    username: "",
    email: "",
    password: "",
  });
  const register = (form: {
    username: string;
    email: string;
    password: string;
  }) => {
    setRegisterError({
      username:"",
      email:"",
      password:""
    })
    auth.register(form).then((data) => {
     
      if(data.error.username || data.error.password || data.error.email){
        setRegisterError(data.error)
      }
      if(data.user.username && data.user.password){
           setUser({
             username:data.user.username,
             password:data.user.password
           })
      }
    });
  };
  

  const login = (form: { username: string; password: string }) => {
    setAuthError("")
    auth.login(form).then((data) => {
      if (data.error) {
        setAuthError(data.error);
      }
      setUser(data.auth);
    }); 
  };

  const logout = () => {
    auth.logout();
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <Switch>
          <Route>
            {user.username && !authError && (!registerError.username || registerError.password || registerError.email)  ? (
              <LoggedInComponent user={user} logout={logout} />
            ) : (
              <LoggedOutComponent
             register={register}
             login={login}
             authError={authError}
             registerError={registerError}
              />
            )}
          </Route>
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
