import React, { ReactChild, ReactChildren } from "react";
import classNames from "classnames";
import {
  Typography,
  withStyles,
  Theme,
  WithStyles,
  createStyles,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    main: {
      backgroundColor: theme.palette.warning.light,
      //@ts-ignore
      border: `${theme.border.borderWidth}px solid ${theme.palette.warning.main}`,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      marginTop: "1rem",
    },
  });

interface HighlighedInformationProps extends WithStyles<typeof styles> {
  children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
  className?: string;
}

function HighlighedInformation(props: HighlighedInformationProps) {
  const { className, children, classes } = props;
  return (
    <div className={classNames(classes.main, className ? className : null)}>
      <Typography variant="body2">{children}</Typography>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(HighlighedInformation);
