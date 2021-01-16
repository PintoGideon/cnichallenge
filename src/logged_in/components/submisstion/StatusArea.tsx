import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Paper,
  Toolbar,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon,
  Switch,
  Box,
  withStyles,
  WithStyles,
  Theme,
} from "@material-ui/core";
import LoopIcon from "@material-ui/icons/Loop";

const styles = (theme: Theme) => ({
  paper: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  toolbar: { justifyContent: "space-between" },
  scaleMinus: {
    transform: "scaleX(-1)",
  },
  "@keyframes spin": {
    from: { transform: "rotate(359deg)" },
    to: { transform: "rotate(0deg)" },
  },
  spin: { animation: "$spin 2s infinite linear" },
  listItemSecondaryAction: { paddingRight: theme.spacing(1) },
});

interface StatusAreaProps extends WithStyles<typeof styles> {}

function StatusArea(props: StatusAreaProps) {
  const { classes, isPluginSubmmitted } = props;
  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <ListItemText
              primary="Status"
              secondary={isPluginSubmitted ? "Activated" : "Not activated"}
              className="mr-2"
            />
          </Box>
          <ListItemIcon>
            <LoopIcon
              className={classNames(
                isPluginSubmmitted ? classes.spin : null,
                classes.scaleMinus
              )}
            />
          </ListItemIcon>
        </Box>
      </Toolbar>
    </Paper>
  );
}

StatusArea.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func.isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
};

export default withStyles(styles, { withTheme: true })(AccountInformationArea);
