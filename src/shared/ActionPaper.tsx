import React, { ReactNode } from "react";

import {
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    helpPadding: {
      "@media (max-width:  400px)": {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
    },
    fullWidth: {
      width: "100%",
    },
  });

interface ActionPaperProps extends WithStyles<typeof styles> {
  title?: ReactNode | string;
  content: ReactNode;
  maxWidth?: string;
  actions: ReactNode;
  helpPadding?: boolean;
  fullWidthActions?: boolean;
}

function ActionPaper(props: ActionPaperProps) {
  const {
    //@ts-ignore
    theme,
    classes,
    title,
    content,
    maxWidth,
    actions,
    helpPadding,
    fullWidthActions,
  } = props;
  return (
    <Box pt={1}>
      <Paper style={{ maxWidth: theme.breakpoints.values[maxWidth] }}>
        {title && <DialogTitle>{title}</DialogTitle>}
        {content && (
          <DialogContent
            classes={helpPadding ? { root: classes.helpPadding } : undefined}
          >
            {content}
          </DialogContent>
        )}
        {actions && (
          <Box pb={2} pr={2}>
            <DialogActions>{actions}</DialogActions>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default withStyles(styles, { withTheme: true })(ActionPaper);
