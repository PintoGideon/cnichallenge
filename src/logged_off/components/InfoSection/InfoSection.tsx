import React from "react";
import classNames from "classnames";
import {
  Grid,
  Typography,
  WithWidth,
  withWidth,
  withStyles,
  Theme,
  WithStyles,
} from "@material-ui/core";
import InfoCard from "./InfoCard";
import calculateSpacing from "./calculateSpacing";

const styles = (theme: Theme) => ({
  containerFix: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
    overflow: "hidden",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  cardWrapper: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 340,
    },
  },
  cardWrapperHighlighted: {
    [theme.breakpoints.down("xs")]: {
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 360,
    },
  },
});

interface InfoSectionProps extends WithStyles<typeof styles>, WithWidth {}

function InfoSection(props: InfoSectionProps) {
  const { width, classes } = props;
  return (
    <div className="lg-p-top" style={{ backgroundColor: "#FFFFFF" }}>
      <Typography variant="h3" align="center" className="lg-mg-bottom">
        Challenge Overview
      </Typography>
      <div className={classNames("container-fluid", classes.containerFix)}>
        <Grid
          container
          spacing={calculateSpacing(width)}
          //@ts-ignore
          className={classes.gridContainer}
        >
          <Grid
            item
            xs={12}
            sm={6}
            lg={6}
            className={classes.cardWrapper}
            data-aos="zoom-in-up"
          >
            <InfoCard
              highlighted
              title="The Challenge"
              text="
            Are we capturing biologically relevant and generalizable information about the brain using functional connectomics, or are we simply overfitting to the data? Leverage a unique resting-state fMRI dataset to design a classification framework to predict patients ADHD diagnosis.
            "
            />
          </Grid>
          <Grid
            item
            className={classes.cardWrapperHighlighted}
            xs={12}
            sm={6}
            lg={6}
            data-aos="zoom-in-up"
            data-aos-delay="200"
          >
            <InfoCard
              highlighted
              title="Evaluation Portal"
              text="This portal allows you to evaluate your trained model on the hidden test set via our Docker wrapper. Receive a summary of evaluation statistics to track your performance."
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(
  withWidth()(InfoSection)
);
