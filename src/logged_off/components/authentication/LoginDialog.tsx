import React, {
  useState,
  useCallback,
  useRef,
  Fragment,
  Dispatch,
  SetStateAction,
} from "react";

import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  TextField,
  Button,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core";
import FormDialog from "../../../shared/FormDialog";
import ButtonCircularProgress from "../../../shared/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/VisibilityPasswordTextField";

const styles = (theme: Theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

interface LoginDialogProps
  extends WithStyles<typeof styles>,
    RouteComponentProps {
  onClose: () => void;
  setStatus: Dispatch<SetStateAction<string>>;
  status: string;
  loginCallback:(form:{username:string, password:string})=>void;
}

export type RefProp = {
  value: string;
};

function LoginDialog(props: LoginDialogProps) {
  const { setStatus, onClose, status, loginCallback } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginUsername = useRef<RefProp>({
    value: "",
  });
  const loginPassword = useRef<RefProp>({
    value: "",
  });

  const login = useCallback(() => {
    setIsLoading(true);
    setStatus("");
    const username = loginUsername.current.value;
    const password = loginPassword.current.value;

    if(username && password){
      setIsLoading(false);
      loginCallback({username,password})    
    }
  }, [setIsLoading, loginUsername, loginPassword, setStatus, loginCallback]);

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <TextField
              //@ts-ignore
              variant="outlined"
              margin="normal"
              error={status === "invalidUsername"}
              required
              fullWidth
              label="UserName"
              inputRef={loginUsername}
              autoFocus
              autoComplete="off"
              type="text"
              onChange={() => {
                if (status === "invalidUsername") {
                  setStatus("");
                }
              }}
              helperText={
                status === "Username" &&
                "This username address isn't associated with an account."
              }
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              //@ts-ignore
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPassword"}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidPassword") {
                  setStatus("");
                }
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    Incorrect password. Try again, or click on{" "}
                    <b>&quot;Forgot Password?&quot;</b> to reset it.
                  </span>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Login
              {isLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}

export default withRouter(withStyles(styles)(LoginDialog));
