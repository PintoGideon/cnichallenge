import React, { Fragment, useCallback, useState } from "react";
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";
import ModalBackdrop from "../../../shared/ModalBackdrop";
import { RegisterErrorPayload } from "../../../App";

interface DialogSelectorProps {
  dialogOpen: string;
  openLoginDialog: () => void;
  onClose: () => void;
  openRegisterDialog: () => void;
  register: (form: {
    username: string;
    email: string;
    password: string;
  }) => void;
  authError: string;
  registerError:RegisterErrorPayload,
  login: (form: { username: string; password: string }) => void;
  
}

function DialogSelector(props: DialogSelectorProps) {
  const { dialogOpen, onClose, register, login, authError , registerError} = props;
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const _onClose = useCallback(() => {
    setLoginStatus("");
    setRegisterStatus("");
    onClose();
  }, [onClose, setLoginStatus, setRegisterStatus]);

  const printDialog = useCallback(() => {
    switch (dialogOpen) {
      case "register":
        return (
          <RegisterDialog
            onClose={_onClose}
            status={registerStatus}
            setStatus={setRegisterStatus}
            registerCallback={register}
            registerError={registerError}
          />
        );
      case "login":
        return (
          <LoginDialog
            onClose={_onClose}
            status={loginStatus}
            setStatus={setLoginStatus}
            loginCallback={login}
            authError={authError}
          />
        );

      default:
    }
  }, [
    dialogOpen,
    _onClose,
    loginStatus,
    registerStatus,
    setLoginStatus,
    setRegisterStatus,
    login,
    register,
    authError,
  ]);

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

export default DialogSelector;
