import React, { useState, useCallback } from "react";
import {
  Toolbar,
  Typography,
  Button,
  Paper,
  withStyles,
  WithStyles,
  createStyles,
  Theme,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    dBlock: { display: "block" },
    dNone: { display: "none" },
    toolbar: {
      justifyContent: "space-between",
    },
  });

interface PostContentProps extends WithStyles<typeof styles> {
  openAddPostModal: () => void;
  pushMessageToSnackbar?: (message: string) => void;
}

function PostContent(props: PostContentProps) {
  const { classes, openAddPostModal } = props;
  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Submit your work</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={openAddPostModal}
          disableElevation
        >
          Upload
        </Button>
      </Toolbar>
    </Paper>
  );
}

export default withStyles(styles)(PostContent);
