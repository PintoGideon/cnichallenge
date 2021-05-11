import React, { Fragment, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Drawer,
  List,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Hidden,
  Tooltip,
  Box,
  isWidthUp,
  withWidth,
  createStyles,
  Theme,
  withStyles,
  WithWidth,
  WithStyles,
} from "@material-ui/core";
import classNames from "classnames";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import NavigationDrawer from "../../../shared/NavigationDrawer";
import { Auth } from "../../../App";

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      boxShadow: theme.shadows[6],
      backgroundColor: theme.palette.common.white,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.down("xs")]: {
        width: "100%",
        marginLeft: 0,
      },
    },
    appBarToolbar: {
      display: "flex",
      justifyContent: "space-between",
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
      [theme.breakpoints.up("md")]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
      [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },
    accountAvatar: {
      backgroundColor: theme.palette.secondary.main,
      height: 24,
      width: 24,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        marginLeft: theme.spacing(1.5),
        marginRight: theme.spacing(1.5),
      },
    },
    drawerPaper: {
      height: "100%vh",
      whiteSpace: "nowrap",
      border: 0,
      width: theme.spacing(7),
      overflowX: "hidden",
      marginTop: theme.spacing(8),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
      backgroundColor: theme.palette.common.black,
    },
    smBordered: {
      [theme.breakpoints.down("xs")]: {
        borderRadius: "50% !important",
      },
    },
    menuLink: {
      textDecoration: "none",
      color: theme.palette.text.primary,
    },
    iconListItem: {
      width: "auto",
      borderRadius: theme.shape.borderRadius,
      paddingTop: 11,
      paddingBottom: 11,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    textPrimary: {
      color: theme.palette.primary.main,
    },
    mobileItemSelected: {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    brandText: {
      fontFamily: "'Baloo Bhaijaan', cursive",
      fontWeight: 400,
    },
    username: {
      paddingLeft: 0,
      paddingRight: theme.spacing(2),
    },
    justifyCenter: {
      justifyContent: "center",
    },
    permanentDrawerListItem: {
      justifyContent: "center",
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  });

interface NavBarProps extends WithStyles<typeof styles>, WithWidth {
  selectedTab: string;
  user: Auth;
  logout: () => void;
}

function NavBar(props: NavBarProps) {
  const links = useRef([]);
  const { classes, selectedTab, width, user, logout } = props;
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const openDrawer = useCallback(() => {
    setIsSideDrawerOpen(true);
  }, [setIsSideDrawerOpen]);

  const closeDrawer = useCallback(() => {
    setIsSideDrawerOpen(false);
  }, [setIsSideDrawerOpen]);

  const menuItems = [
    {
      link: "/dashboard",
      name: "Dashboard",
      onClick: closeMobileDrawer,
      icon: {
        desktop: (
          <DashboardIcon
            className={
              selectedTab === "Dashboard" ? classes.textPrimary : "text-white"
            }
            fontSize="small"
          />
        ),
        mobile: <DashboardIcon className="text-white" />,
      },
    },
    {
      link: "/",
      name: "Logout",
      onClick: logout,
      icon: {
        desktop: (
          <PowerSettingsNewIcon className="text-white" fontSize="small" />
        ),
        mobile: <PowerSettingsNewIcon className="text-white" />,
      },
    },
  ];

  return (
    <Fragment>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <Box display="flex" alignItems="center">
            <Hidden smUp>
              <Box mr={1}>
                <IconButton
                  aria-label="Open Navigation"
                  onClick={openMobileDrawer}
                  color="primary"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Hidden>
            <Hidden xsDown>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="primary"
              >
                CNI
              </Typography>
              <Typography
                variant="h4"
                className={classes.brandText}
                display="inline"
                color="secondary"
              >
                CHALLENGE
              </Typography>
            </Hidden>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            width="100%"
          >
            <ListItem
              disableGutters
              className={classNames(classes.iconListItem, classes.smBordered)}
            >
              <Avatar
                alt="profile picture"
                src={`${process.env.PUBLIC_URL}/images/Avatar.png`}
                className={classNames(classes.accountAvatar)}
              />
              {isWidthUp("sm", width) && (
                <ListItemText
                  className={classes.username}
                  primary={
                    <Typography color="textPrimary">
                      Hi {user.username}
                    </Typography>
                  }
                />
              )}
            </ListItem>
          </Box>
        </Toolbar>
      </AppBar>
      <Hidden xsDown>
        <Drawer //  both drawers can be combined into one for performance
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          open={false}
        >
          <List>
            {menuItems.map((element, index) => (
              <Link
                to={element.link}
                className={classes.menuLink}
                onClick={element.onClick}
                key={index}
                ref={(node) => {
                  //@ts-ignore
                  links.current[index] = node;
                }}
              >
                <Tooltip
                  title={element.name}
                  placement="right"
                  key={element.name}
                >
                  <ListItem
                    selected={selectedTab === element.name}
                    button
                    divider={index !== menuItems.length - 1}
                    className={classes.permanentDrawerListItem}
                    onClick={() => {
                      //@ts-ignore
                      links.current[index].click();
                    }}
                    aria-label={
                      element.name === "Logout"
                        ? "Logout"
                        : `Go to ${element.name}`
                    }
                  >
                    <ListItemIcon className={classes.justifyCenter}>
                      {element.icon.desktop}
                    </ListItemIcon>
                  </ListItem>
                </Tooltip>
              </Link>
            ))}
          </List>
        </Drawer>
      </Hidden>
      <NavigationDrawer
        menuItems={menuItems.map((element) => ({
          link: element.link,
          name: element.name,
          icon: element.icon.mobile,
          onClick: element.onClick,
        }))}
        anchor="left"
        open={isMobileOpen}
        selectedItem={selectedTab}
        onClose={closeMobileDrawer}
      />
    </Fragment>
  );
}

export default withWidth()(withStyles(styles, { withTheme: true })(NavBar));
