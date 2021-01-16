import React, { useCallback, useState, useRef, useEffect } from "react";

import {
  createStyles,
  Snackbar,
  withStyles,
  Theme,
  WithStyles,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });

interface ConsecutiveSnackbarMessagesProps extends WithStyles<typeof styles> {
  getPushMessageFromChild: (pushMessage: (message: any) => void) => void;
}

interface Message {
  message: any;
  key: number;
}

function ConsecutiveSnackbars(props: ConsecutiveSnackbarMessagesProps) {
  const { classes, getPushMessageFromChild } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<Message | undefined>(
    undefined
  );
  const queue = useRef<Array<Message>>([]);

  const processQueue = useCallback(() => {
    if (queue.current && queue.current.length > 0) {
      setMessageInfo(queue.current.shift());
      setIsOpen(true);
    }
  }, [setMessageInfo, setIsOpen, queue]);

  const handleClose = useCallback(
    (_, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setIsOpen(false);
    },
    [setIsOpen]
  );

  const pushMessage = useCallback(
    (message) => {
      queue.current.push({
        message,
        key: new Date().getTime(),
      });
      if (isOpen) {
        // immediately begin dismissing current message
        // to start showing new one
        setIsOpen(false);
      } else {
        processQueue();
      }
    },
    [queue, isOpen, setIsOpen, processQueue]
  );

  useEffect(() => {
    getPushMessageFromChild(pushMessage);
  }, [getPushMessageFromChild, pushMessage]);
  console.log("MessageInfo", messageInfo);

  return (
    <Snackbar
      disableWindowBlurListener
      key={messageInfo && messageInfo.key}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      onExited={processQueue}
      ContentProps={{
        classes: {
          root: classes.root,
        },
      }}
      message={
        <span>
          {messageInfo && messageInfo.message ? messageInfo.message : null}
        </span>
      }
    />
  );
}

export default withStyles(styles, { withTheme: true })(ConsecutiveSnackbars);
