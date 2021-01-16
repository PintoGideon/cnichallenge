import React, {
  useState,
  useCallback,
  useRef,
  Fragment,
  Dispatch,
  SetStateAction,
} from "react";

import {
  TextField,
  Button,
  withStyles,
  WithStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import FormDialog from "../../../shared/FormDialog";
import HighlightedInformation from "../../../shared/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/VisibilityPasswordTextField";
import { RefProp } from "./LoginDialog";


const styles = (theme: Theme) =>
  createStyles({
    link: {
      transition: theme.transitions.create(["background-color"], {
        duration: theme.transitions.duration.complex,
        easing: theme.transitions.easing.easeInOut,
      }),
      cursor: "pointer",
      color: theme.palette.primary.main,
      "&:enabled:hover": {
        color: theme.palette.primary.dark,
      },
      "&:enabled:focus": {
        color: theme.palette.primary.dark,
      },
    },
  });

interface RegisterDialogProps extends WithStyles<typeof styles> {
  setStatus: Dispatch<SetStateAction<string>>;
  status: string;
  onClose: () => void;
  registerCallback: (form: {
    username: string;
    email: string;
    password: string;
  }) => void;
}

function RegisterDialog(props: RegisterDialogProps) {
  const { setStatus, status, onClose, registerCallback } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const registerUsername = useRef<RefProp>({
    value: "",
  });
  const registerPassword = useRef<RefProp>({
    value: "",
  });
  const registerPasswordRepeat = useRef<RefProp>({
    value: "",
  });
  const registerEmail = useRef<RefProp>({
    value: "",
  });

  const register = useCallback(() => {
    const username  =  registerUsername.current.value;
    const email = registerEmail.current.value;
    const password = registerPassword.current.value;
    const confirmPassword = registerPassword.current.value;
    if (password !== confirmPassword) {
      setStatus("passwordsDontMatch");
      return;
    }

    if (username && email && password && password === confirmPassword) {
      setStatus("");
      setIsLoading(true);
      registerCallback({ username, email, password });
    }
  }, [setStatus, setIsLoading, registerPassword, registerCallback]);

  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open
      headline="Register"
      onFormSubmit={(e: any) => {
        e.preventDefault();
        register();
      }}
      hideBackdrop
      content={
        <Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={status === "invalidUsername"}
            label="UserName"
            autoFocus
            inputRef={registerUsername}
            autoComplete="off"
            type="text"
            onChange={() => {
              if (status === "invalidUsername") {
                setStatus("");
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={status === "invalidEmail"}
            label="Email Address"
            autoFocus
            inputRef={registerEmail}
            autoComplete="off"
            type="email"
            onChange={() => {
              if (status === "invalidEmail") {
                setStatus("");
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          <VisibilityPasswordTextField
            //@ts-ignore
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Password"
            inputRef={registerPassword}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus("");
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
              return null;
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <VisibilityPasswordTextField
            //@ts-ignore
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Repeat Password"
            inputRef={registerPasswordRepeat}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus("");
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          {status === "accountCreated" ? (
            <HighlightedInformation>
              We have created your account. Please click on the link in the
              email we have sent to you before logging in.
            </HighlightedInformation>
          ) : (
            <HighlightedInformation>
              Registration is disabled until we go live.
            </HighlightedInformation>
          )}
        </Fragment>
      }
      actions={
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          disabled={isLoading}
        >
          Register
          {isLoading && <ButtonCircularProgress />}
        </Button>
      }
    />
  );
}

export default withStyles(styles, { withTheme: true })(RegisterDialog);
