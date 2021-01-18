import React from "react";
import classNames from "classnames";
import {
  Paper,
  Toolbar,
  ListItemText,
  ListItemIcon,
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

interface StatusAreaProps extends WithStyles<typeof styles> {
  isPluginSubmitted: boolean;
}

function StatusArea(props: StatusAreaProps) {
  const { classes, isPluginSubmitted } = props;
  return (
    <Paper className={classes.paper}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            <ListItemText
              primary="Submission Status"
              secondary={isPluginSubmitted ? "Activated" : "Not activated"}
              className="mr-2"
            />
          </Box>
          <ListItemIcon>
            <LoopIcon
              className={classNames(
                isPluginSubmitted ? classes.spin : null,
                classes.scaleMinus
              )}
            />
          </ListItemIcon>
        </Box>
      </Toolbar>
    </Paper>
  );
}



export default withStyles(styles, { withTheme: true })(StatusArea);
