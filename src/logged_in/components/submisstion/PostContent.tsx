import React from "react";
import {
  Toolbar,
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
      marginBottom: "3rem",
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
