import React from "react";
import {
  Grid,
  Theme,
  Card,
  CardContent,
  Typography,
  Box,
  withStyles,
  createStyles,
  WithStyles,
  WithTheme,
  List,
  ListItemText,
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    cardContentInner: {
      marginTop: theme.spacing(-4),
    },
  });
interface StatsProps extends WithStyles<typeof styles>, WithTheme {}

function Stats(props: StatsProps) {
  const { theme, classes } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <Box pt={2} px={2} pb={4}>
            <Box display="flex" justifyContent="space-between">
              <div>
                <Typography variant="subtitle1">Summary</Typography>
              </div>
            </Box>
          </Box>
          <CardContent>
            <Box className={classes.cardContentInner}>
              <List dense>
                <ListItemText primary="Total Submissions" secondary={0} />
              </List>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles, { withTheme: true })(Stats);
