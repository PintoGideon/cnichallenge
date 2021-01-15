import React, { ReactElement } from "react";

import {
  Dialog,
  DialogContent,
  Box,
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from "@material-ui/core";
import DialogTitleWithCloseIcon from "./DialogTitleWithCloseIcon";

const styles = (theme: Theme) =>
  createStyles({
    dialogPaper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBottom: theme.spacing(3),
      maxWidth: 420,
    },
    actions: {
      marginTop: theme.spacing(2),
    },
    dialogPaperScrollPaper: {
      maxHeight: "none",
    },
    dialogContent: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

interface FormDialogProps extends WithStyles<typeof styles> {
  open: boolean;
  onClose: () => void;
  headline: string;
  loading: boolean;
  onFormSubmit: (e: any) => void;
  content: ReactElement;
  actions: ReactElement;
  hideBackdrop: boolean;
}

/**
 * A Wrapper around the Dialog component to create centered
 * Login, Register or other Dialogs.
 */
function FormDialog(props: FormDialogProps) {
  const {
    classes,
    open,
    onClose,
    loading,
    headline,
    onFormSubmit,
    content,
    actions,
    hideBackdrop,
  } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick={loading}
      disableEscapeKeyDown={loading}
      classes={{
        paper: classes.dialogPaper,
        paperScrollPaper: classes.dialogPaperScrollPaper,
      }}
      hideBackdrop={hideBackdrop ? hideBackdrop : false}
    >
      <DialogTitleWithCloseIcon
        title={headline}
        onClose={onClose}
        disabled={loading}
      />
      <DialogContent className={classes.dialogContent}>
        <form onSubmit={onFormSubmit}>
          <div>{content}</div>
          <Box width="100%" className={classes.actions}>
            {actions}
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles, { withTheme: true })(FormDialog);
