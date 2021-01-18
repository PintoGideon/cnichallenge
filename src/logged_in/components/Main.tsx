import React, { useState, Fragment, useCallback, useEffect } from "react";
import { withStyles, Theme, createStyles, WithStyles } from "@material-ui/core";
import classNames from "classnames";
import NavBar from "./navigation/NavBar";
import ConsecutiveSnackbarMessages from "../../shared/ConsecutiveSnackbarMessages";
import Routing from "./Routing";
import { client, cniclient } from "../../utils/auth-provider";


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

export interface PluginListProp {
  id?: number;
  name?: string;
  status?: string;
  files?: {
    creation_data: string;
    file_resource: string;
  }[];
}

function Main(props: MainProps) {
  const { classes, user } = props;
  const [selectedTab, setSelectedTab] = useState("");
  const [pushMessageToSnackbar, setPushMessageToSnackbar] = useState<
    (message: string) => void
  >();
  const [isPluginSubmitted, setIsPluginSubmitted] = React.useState(false);
  const [pluginList, setPluginList] = React.useState<PluginListProp[]>([]);

  const fetchRegisteredPlugins = useCallback(async () => {
    const plugins = await client().then(async (fetchedClient) => {
      const pluginList = await fetchedClient.getPlugins({
        limit: 10,
        offset: 0,
      });
      return pluginList;
    });

    const submittedPluginList = Promise.all(
      plugins.data.map(async (plugin: any) => {
        let target: PluginListProp = {};
        if (plugin.id <= 3) {
          return;
        } else {
          let files = [];
          const response = await cniclient(`cni/${plugin.id}/`, "get", {
            username: "janedoe",
            password: "jane1234",
          });

          if (response.status === "finishedSuccessfully") {
            const response = await cniclient(`cni/${plugin.id}/files`, "get", {
              username: "janedoe",
              password: "jane1234",
            });
            files = response.results.length > 0 ? response.results : [];
          }
          target = {
            id: plugin.id,
            name: plugin.name,
            status: response.status,
            files,
          };
          return target;
        }
      })
    );

    submittedPluginList.then((data: any) => {
      let filteredList = (data as PluginListProp[]).filter((data) => {
        if (data) return data;
      });
      setPluginList(filteredList);
    });
  }, []);

  useEffect(() => {
    fetchRegisteredPlugins();
  }, [fetchRegisteredPlugins]);

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
      <NavBar selectedTab={selectedTab} user={user} />
      <ConsecutiveSnackbarMessages
        getPushMessageFromChild={getPushMessageFromChild}
      />
      <main className={classNames(classes.main)}>
        <Routing
          isPluginSubmitted={isPluginSubmitted}
          pushMessageToSnackbar={pushMessageToSnackbar}
          selectDashboard={selectDashboard}
          computedList={pluginList}
        />
      </main>
    </Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(Main);
