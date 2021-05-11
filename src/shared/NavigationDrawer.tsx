import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  withStyles,
  IconButton,
  Typography,
  withWidth,
  isWidthUp,
  Toolbar,
  WithWidth,
  WithStyles,
  Theme,
  createStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme: Theme) =>
  createStyles({
    closeIcon: {
      marginRight: theme.spacing(0.5),
    },
    headSection: {
      width: 200,
    },
    blackList: {
      backgroundColor: theme.palette.common.black,
      height: "100%",
    },
    noDecoration: {
      textDecoration: "none !important",
    },
  });

type MenuItems = {
  link?: string;
  name?: string;
  icon?: any;
  onClick?: (e: any) => void;
};

interface NavigationDrawerProps extends WithStyles<typeof styles>, WithWidth {
  anchor: string;
  open: boolean;
  onClose: () => void;
  selectedItem: string;
  menuItems?: MenuItems[];
}

function NavigationDrawer(props: NavigationDrawerProps) {
  const {
    width,
    open,
    onClose,
    anchor,
    classes,
    menuItems,
    selectedItem,
    //@ts-ignore
    theme,
  } = props;

  useEffect(() => {
    window.onresize = () => {
      if (isWidthUp("sm", width) && open) {
        onClose();
      }
    };
  }, [width, open, onClose]);

  return (
    //@ts-ignore
    <Drawer variant="temporary" open={open} onClose={onClose} anchor={anchor}>
      <Toolbar className={classes.headSection}>
        <ListItem
          style={{
            paddingTop: theme.spacing(0),
            paddingBottom: theme.spacing(0),
            height: "100%",
            justifyContent: anchor === "left" ? "flex-start" : "flex-end",
          }}
          disableGutters
        >
          <ListItemIcon className={classes.closeIcon}>
            <IconButton onClick={onClose} aria-label="Close Navigation">
              <CloseIcon color="primary" />
            </IconButton>
          </ListItemIcon>
        </ListItem>
      </Toolbar>
      <List className={classes.blackList}>
        {menuItems &&
          menuItems.map((element) => {
            if (element.link) {
              return (
                <Link
                  key={element.name}
                  to={element.link}
                  className={classes.noDecoration}
                  onClick={onClose}
                >
                  <ListItem
                    button
                    selected={selectedItem === element.name}
                    /**
                     * We disable ripple as it will make a weird animation
                     * with primary and secondary color
                     */
                    disableRipple
                    disableTouchRipple
                  >
                    <ListItemIcon>{element.icon}</ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" className="text-white">
                          {element.name}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Link>
              );
            }
            return (
              <ListItem button key={element.name} onClick={element.onClick}>
                <ListItemIcon>{element.icon}</ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="text-white">
                      {element.name}
                    </Typography>
                  }
                />
              </ListItem>
            );
          })}
      </List>
    </Drawer>
  );
}

export default withWidth()(
  withStyles(styles, { withTheme: true })(NavigationDrawer)
);
