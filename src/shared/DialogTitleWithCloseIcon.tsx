import React from "react";

import {
  IconButton,
  DialogTitle,
  Typography,
  Box,
  withTheme,
  WithTheme,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

interface DialogTitleWithCloseIconProps extends WithTheme {
  paddingBottom?: number;
  onClose: () => void;
  disabled?: boolean;
  title?: string;
  disablePadding?: boolean;
}

function DialogTitleWithCloseIcon(props: DialogTitleWithCloseIconProps) {
  const {
    theme,
    paddingBottom,
    onClose,
    disabled,
    title,
    disablePadding,
  } = props;
  return (
    <DialogTitle
      style={{
        paddingBottom: paddingBottom
          ? paddingBottom && disablePadding
            ? 0
            : paddingBottom
          : theme.spacing(3),
        paddingTop: disablePadding ? 0 : theme.spacing(2),
        width: "100%",
      }}
      disableTypography
    >
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h5">{title}</Typography>
        <IconButton
          onClick={onClose}
          style={{ marginRight: -12, marginTop: -10 }}
          disabled={disabled}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </DialogTitle>
  );
}

export default withTheme(DialogTitleWithCloseIcon);
