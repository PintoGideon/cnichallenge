import React from "react";
import PropTypes from "prop-types";
import {
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  Typography,
  Box,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const drawerWidth = 240;

const styles = (theme: Theme) =>
  createStyles({
    toolbar: {
      minWidth: drawerWidth,
    },
  });

interface SideDrawerProps extends WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
}

function SideDrawer(props: SideDrawerProps) {
  const { classes, onClose, open } = props;
  return (
    <Drawer anchor="right" open={open} variant="temporary" onClose={onClose}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Box
          pl={3}
          pr={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h6">A Sidedrawer</Typography>
          <IconButton
            onClick={onClose}
            color="primary"
            aria-label="Close Sidedrawer"
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
    </Drawer>
  );
}

export default withStyles(styles)(SideDrawer);
