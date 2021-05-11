import React, { useState, useCallback, useEffect, Fragment } from "react";
import PostContent from "../submisstion/PostContent";
import AddPost from "../submisstion/AddPost";
import UserDataArea from "../submisstion/UserDataArea";
import Stats from "../statistics/Stats";
import { Auth } from "../../../App";
import { PluginListProp } from "../Main";
import { client, cniclient } from "../../../utils/auth-provider";


interface DashboardProps {
  selectDashboard: () => void;
  pushMessageToSnackbar: (message: string) => void;
  user: Auth;
}

function Dashboard(props: DashboardProps) {
  console.log("DASHBOARD")
  const { pushMessageToSnackbar, user } = props;
  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);
  const openAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(true);
  }, [setIsAddPostPaperOpen]);
  const [pluginList, setPluginList] = React.useState<PluginListProp[]>([]);

  const fetchRegisteredPlugins = useCallback(async () => {
    const plugins = await client(user).then(async (fetchedClient) => {
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
          const response = await cniclient(`cni/${plugin.id}/`, "get", user);

          if (response.status === "finishedSuccessfully") {
            const response = await cniclient(
              `cni/${plugin.id}/files`,
              "get",
              user
            );
            files = response.results.length > 0 ? response.results : [];
          }

          target = {
            profilePicUrl: `${process.env.PUBLIC_URL}/images/Avatar.png`,
            author: user.username,
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
  }, [user]);

  useEffect(() => {
    fetchRegisteredPlugins();
  }, [fetchRegisteredPlugins]);

  const closeAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(false);
  }, [setIsAddPostPaperOpen]);

  if (isAddPostPaperOpen) {
    return (
      <AddPost
        user={user}
        onClose={closeAddPostModal}
        pushMessageToSnackbar={pushMessageToSnackbar}
      />
    );
  }
  return (
    <Fragment>
      <Stats   />
      <PostContent
        pushMessageToSnackbar={pushMessageToSnackbar}
        openAddPostModal={openAddPostModal}
      />
      {
        <UserDataArea
          pluginList={pluginList}
          pushMessageToSnackbar={pushMessageToSnackbar}
        />
      }
    </Fragment>
  );
}

export default Dashboard;
