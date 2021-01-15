import React from "react";
import {
  CircularProgress,
  Box,
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    circularProgress: {
      color: theme.palette.secondary.main,
    },
  });

interface ButtonCircularProgressProps extends WithStyles<typeof styles> {
  size?: number;
}

function ButtonCircularProgress(props: ButtonCircularProgressProps) {
  const { size, classes } = props;
  return (
    <Box color="secondary.main" pl={1.5} display="flex">
      <CircularProgress
        size={size ? size : 24}
        thickness={size ? (size / 5) * 24 : 5}
        className={classes.circularProgress}
      />
    </Box>
  );
}

export default withStyles(styles, { withTheme: true })(ButtonCircularProgress);
