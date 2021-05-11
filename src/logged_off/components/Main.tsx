import React, { Fragment, useCallback, useState } from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";
import Routing from "./Routing";
import NavBar from "./navigation/Navbar";
import DialogSelector from "./authentication/DialogSelector";
import Footer from "./footer/Footer";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import { RegisterErrorPayload } from "../../App";


const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.common.white,
      overFlowX: "hidden",
    },
  });


interface MainProps extends WithStyles<typeof styles> {
  register: (form: {
    username: string;
    email: string;
    password: string;
  }) => void;
  authError: string;
  registerError:RegisterErrorPayload
  login: (form: { username: string; password: string }) => void;

}

function Main(props: MainProps) {
  const { classes, register, login, authError, registerError } = props;

  const [selectedTab, setSelectedTab] = useState("");
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState("");

  const openLoginDialog = useCallback(() => {
    setDialogOpen("login");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const closeDialog = useCallback(() => {
    setDialogOpen("");
  }, [setDialogOpen]);

  const openRegisterDialog = useCallback(() => {
    setDialogOpen("register");
    setIsMobileDrawerOpen(false);
  }, [setDialogOpen, setIsMobileDrawerOpen]);

  const handleMobileDrawerOpen = useCallback(() => {
    setIsMobileDrawerOpen(true);
  }, [setIsMobileDrawerOpen]);

  const handleMobileDrawerClose = useCallback(() => {
    setIsMobileDrawerOpen(false);
  }, [setIsMobileDrawerOpen]);

  const selectHome = useCallback(() => {
    document.title = "CNI-CHALLENGE";
    setSelectedTab("Home");
  }, [setSelectedTab]);

  const selectAbout = useCallback(() => {
    smoothScrollTop();
    document.title = "CNI-CHALLENGE";
    setSelectedTab("Blog");
  }, [setSelectedTab]);

  const selectContainerize = useCallback(() => {
    smoothScrollTop();
    document.title = "CNI-CHALLENGE";
    setSelectedTab("Containerize");
  }, [setSelectedTab]);



  return (
    <div className={classes.wrapper}>
      <Fragment>
        <DialogSelector
          openLoginDialog={openLoginDialog}
          openRegisterDialog={openRegisterDialog}
          dialogOpen={dialogOpen}
          onClose={closeDialog}
          register={register}
          login={login}
          authError={authError}
          registerError={registerError}
        />
        <NavBar
          selectedTab={selectedTab}
          selectTab={setSelectedTab}
          openLoginDialog={openLoginDialog}
          openRegisterDialog={openRegisterDialog}
          mobileDrawerOpen={isMobileDrawerOpen}
          handleMobileDrawerOpen={handleMobileDrawerOpen}
          handleMobileDrawerClose={handleMobileDrawerClose}
        />
        <Routing
          selectHome={selectHome}
          selectAbout={selectAbout}
          selectContainerize={selectContainerize}
        />
        <Footer />
      </Fragment>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Main);
