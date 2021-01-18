import React, { useEffect } from "react";
import classNames from "classnames";
import {
  Grid,
  Typography,
  Card,
  Box,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core";
import ZoomImage from "../../../shared/ZoomImage";
import smoothScrollTop from "../../../shared/functions/smoothScrollTop";

const styles = (theme: Theme) =>
  createStyles({
    blogContentWrapper: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
      },
      maxWidth: 1280,
      width: "100%",
    },
    wrapper: {
      minHeight: "60vh",
    },
    img: {
      width: "100%",
      height: "auto",
    },
    card: {
      boxShadow: theme.shadows[4],
    },
  });

interface AboutPostProps extends WithStyles<typeof styles> {}

function AboutPost(props: AboutPostProps) {
  const { classes } = props;
  useEffect(() => {
    document.title = "CNI-CHALLENGE";
    smoothScrollTop();
  }, []);

  return (
    <Box
      className={classNames("lg-p-top", classes.wrapper)}
      display="flex"
      justifyContent="center"
    >
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={5}>
          <Grid item md={9}>
            <Card className={classes.card}>
              <Box pt={3} pr={3} pl={3} pb={2}>
                <Typography variant="h4">
                  <b>About the Challenge</b>
                </Typography>
              </Box>
              <ZoomImage
                className={classes.img}
                src={`${process.env.PUBLIC_URL}/images/Challenge.png`}
                alt=""
              />
              <Box p={3}>
                <Typography variant="body2">
                  The{" "}
                  <a href="http://www.brainconnectivity.net">
                    Connectomics in NeuroImaging Challenge
                  </a>{" "}
                  was held at the Medical Image Computation and Computer
                  Assisted Intervention (MICCAI) Conference in 2019. Full
                  details of this Challenge can be found at in the corresponding
                  publication{" "}
                  <a href="https://arxiv.org/abs/2006.03611">
                    <b>here</b>
                  </a>
                </Typography>
                <Typography variant="body2">
                  With our free to download training data and the use of our
                  Docker framework, you will be able to assess your
                  classification model on our hidden test dataset.
                </Typography>

                <Typography variant="h5">Problem Statement</Typography>
                <Typography variant="body2">
                  <i>
                    Using functional connectomics, are we capturing biologically
                    relevant and generalizable information about the brain, or
                    are we simply overfitting to the data?
                  </i>{" "}
                  This Challenge addresses the issues of generalizability and
                  clinical relevance for functional connectomes. We provide
                  resting-state fMRI (rsfMRI) datasets of children with
                  attention deficit hyperactivity disorder (ADHD) and
                  neurotypical controls for you to{" "}
                  <b>
                    design a classNameification framework that can predict
                    subject diagnosis based on brain connectivity data
                  </b>
                  .
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default withStyles(styles, { withTheme: true })(AboutPost);
