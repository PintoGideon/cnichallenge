import React, { Fragment, useCallback, useState } from "react";
import RegisterDialog from "./RegisterDialog";
import LoginDialog from "./LoginDialog";
import ModalBackdrop from "../../../shared/ModalBackdrop";

interface DialogSelectorProps {
  dialogOpen: string;
  openLoginDialog: () => void;
  onClose: () => void;
  openRegisterDialog: () => void;
}

function DialogSelector(props: DialogSelectorProps) {
  const { dialogOpen, onClose } = props;
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
          />
        );
      case "login":
        return (
          <LoginDialog
            onClose={_onClose}
            status={loginStatus}
            setStatus={setLoginStatus}
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
  ]);

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

export default DialogSelector;
