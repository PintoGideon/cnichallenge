import React, { useState, Fragment, useCallback } from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core";
import classNames from "classnames";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../shared/ConsecutiveSnackbarMessages";
import Routing from "./Routing";

const styles = (theme: Theme) =>
  createStyles({
    main: {
      marginLeft: theme.spacing(9),
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.down("xs")]: {
        marginLeft: 0,
      },
    },
  });

interface MainProps extends WithStyles<typeof styles> {
  user: string;
}

function Main(props: MainProps) {
  const { classes, user } = props;
  const [selectedTab, setSelectedTab] = useState("");
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState<
    (message: string) => void
  >();
  const selectDashboard = useCallback(() => {
    document.title = "CNICHALLENGE - Dashboard";
    setSelectedTab("Dashboard");
  }, [setSelectedTab]);

  const getPushMessageFromChild = useCallback(
    (pushMessage) => {
      setPushMessageToSnackbar(() => pushMessage);
    },
    [setPushMessageToSnackbar]
  );
  console.log("Push", getPushMessageFromChild);

  return (
    <Fragment>
      <NavBar selectedTab={selectedTab} user={user} />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)}>
        <Routing
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectDashboard={selectDashboard}
        />
      </main>
    </Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(Main);
