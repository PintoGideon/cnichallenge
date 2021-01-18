import React, { memo, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import {
  withStyles,
  AppBar,
  Typography,
  Toolbar,
  Button,
  Hidden,
  IconButton,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import InfoIcon from "@material-ui/icons/Info";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: theme.shadows[6],
      backgroundColor: theme.palette.common.white,
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    menuButtonText: {
      fontSize: theme.typography.body1.fontSize,
      fontWeight: theme.typography.h6.fontWeight,
    },
    brandText: {
      fontFamily: "'Baloo Bhaijaan', cursive",
      fontWeight: 400,
    },
    noDecoration: {
      textDecoration: "none !important",
    },
  });

interface NavBarProps extends WithStyles<typeof styles> {
  handleMobileDrawerOpen: () => void;
  handleMobileDrawerClose: () => void;
  mobileDrawerOpen: Boolean;
  selectedTab: string;
  selectTab: Dispatch<SetStateAction<string>>;
  openRegisterDialog: () => void;
  openLoginDialog: () => void;
}

function NavBar(props: NavBarProps) {
  const {
    classes,
    openRegisterDialog,
    openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
  } = props;

  const menuItems = [
    {
      link: "/",
      name: "Home",
      icon: <HomeIcon className="text-white" />,
    },
    {
      link: "/about",
      name: "About",
      icon: <InfoIcon />,
    },
    {
      name: "Register",
      onClick: openRegisterDialog,
      icon: <HowToRegIcon className="text-white" />,
    },
    {
      name: "Login",
      onClick: openLoginDialog,
      icon: <LockOpenIcon className="text-white" />,
    },
  ];

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="primary"
            >
              Cni
            </Typography>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="secondary"
            >
              Challenge
            </Typography>
          </div>
          <div>
            <Hidden mdUp>
              <IconButton
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
              >
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {menuItems.map((element) => {
                if (element.link) {
                  return (
                    <Link
                      key={element.name}
                      to={element.link}
                      className={classes.noDecoration}
                      onClick={handleMobileDrawerClose}
                    >
                      <Button
                        color="secondary"
                        size="large"
                        classes={{ text: classes.menuButtonText }}
                      >
                        {element.name}
                      </Button>
                    </Link>
                  );
                }
                return (
                  <Button
                    color="secondary"
                    size="large"
                    onClick={element.onClick}
                    classes={{ text: classes.menuButtonText }}
                    key={element.name}
                  >
                    {element.name}
                  </Button>
                );
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(memo(NavBar));
