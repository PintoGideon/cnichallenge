import React from "react";

import {
  Typography,
  Box,
  withStyles,
  WithStyles,
  Theme,
  WithTheme,
} from "@material-ui/core";

const styles = (theme: Theme) => ({
  card: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(2),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 2,
    height: "100%",
  },
  cardHightlighted: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    border: `3px solid ${theme.palette.primary.dark}`,
    borderRadius: theme.shape.borderRadius * 3,
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down("xs")]: {
      marginTop: theme.spacing(2),
    },
    height: "100%",
  },
  title: {
    color: theme.palette.primary.main,
  },
});

interface InfoCardProps extends WithStyles<typeof styles>, WithTheme {
  title: string;
  highlighted: boolean;
  text: string;
}

function InfoCard(props: InfoCardProps) {
  const { classes, title, text, highlighted } = props;
  return (
    <div className={highlighted ? classes.cardHightlighted : classes.card}>
      <Box mb={2}>
        <Typography
          variant={highlighted ? "h3" : "h3"}
          className={highlighted ? "text-white" : classes.title}
        >
          {title}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant="body1"
          className={highlighted ? "text-white" : undefined}
        >
          {text}
        </Typography>
      </Box>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(InfoCard);
