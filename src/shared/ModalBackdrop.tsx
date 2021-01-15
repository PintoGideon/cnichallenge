import React from "react";
import {
  Backdrop,
  withStyles,
  createStyles,
  WithStyles,
} from "@material-ui/core";

const styles = createStyles({
  backdrop: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1200,
    position: "fixed",
    touchAction: "none",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

interface ModalBackdropProps extends WithStyles<typeof styles> {
  open: boolean;
}

function ModalBackdrop(props: ModalBackdropProps) {
  const { classes, open } = props;
  return <Backdrop open={open} className={classes.backdrop} />;
}

export default withStyles(styles)(ModalBackdrop);
