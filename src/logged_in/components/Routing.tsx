import React, { memo } from "react";
import { Switch } from "react-router-dom";
import {
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  WithTheme,
} from "@material-ui/core";
import Dashboard from "./dashboard/Dashboard";
import PropsRoute from "../../shared/PropsRoute";

const styles = (theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      width: "auto",
      [theme.breakpoints.up("xs")]: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
      },
      [theme.breakpoints.up("sm")]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
      },
      [theme.breakpoints.up("md")]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        width: "82.5%",
        marginLeft: "auto",
        marginRight: "auto",
      },
      [theme.breakpoints.up("lg")]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        width: "70%",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
  });

interface RoutingProps extends WithStyles<typeof styles>, WithTheme {
  selectDashboard: () => void;
  pushMessageToSnackbar?: (message: string) => void;
}

function Routing(props: RoutingProps) {
  const { selectDashboard, classes, pushMessageToSnackbar } = props;
  return (
    <div className={classes.wrapper}>
      <Switch>
        <PropsRoute
          path="/dashboard"
          component={Dashboard}
          selectDashboard={selectDashboard}
          pushMessageToSnackbar={pushMessageToSnackbar}
        />
      </Switch>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(memo(Routing));
