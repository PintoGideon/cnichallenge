import React, { useEffect } from "react";
import classNames from "classnames";
import {
  Grid,
  Card,
  Box,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
} from "@material-ui/core";
import ZoomImage from "../../../shared/ZoomImage";
import content from './content'
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

    h5:{
      color: theme.palette.primary.main,
      marginTop:'2rem',
      marginBottom:"2rem"

    }
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
              <ZoomImage
                className={classes.img}
                src={`${process.env.PUBLIC_URL}/images/Challenge.png`}
                alt=""
              />
              <Box p={3}>
               {content}
              </Box>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
}

export default withStyles(styles, { withTheme: true })(AboutPost);
