import React, { useState, Fragment, useCallback } from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core";
import classNames from "classnames";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../shared/ConsecutiveSnackbarMessages";
import Routing from "./Routing";
import { Auth } from "../../App";


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
  user: Auth;
  logout: () => void;
}

export interface PluginListProp {
  profilePicUrl?: string;
  author?: string;
  id?: number;
  name?: string;
  status?: string;
  files?: {
    creation_data: string;
    file_resource: string;
  }[];
}

function Main(props: MainProps) {
  const { classes, user, logout } = props;
  const [selectedTab, setSelectedTab] = useState("Dashboard");
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

  return (
    <Fragment>
      <NavBar selectedTab={selectedTab} user={user} logout={logout} />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)}>
        <Routing
          user={user}
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectDashboard={selectDashboard}
        />
      </main>
    </Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(Main);
