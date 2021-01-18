import React, { useState, useCallback, Fragment } from "react";
import { Box} from "@material-ui/core";
import PostContent from "../submisstion/PostContent";
import AddPost from "../submisstion/AddPost";
import StatusArea from "../submisstion/StatusArea";
import {PluginListProp} from '../Main'
import UserDataArea from "../submisstion/UserDataArea";

interface DashboardProps {
  selectDashboard: () => void;
  pushMessageToSnackbar: (message: string) => void;
  isPluginSubmitted: boolean;
  computedList:PluginListProp[]
}

function Dashboard(props: DashboardProps) {
  const { pushMessageToSnackbar, isPluginSubmitted, computedList } = props;
  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);
  const openAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(true);
  }, [setIsAddPostPaperOpen]);

  const closeAddPostModal = useCallback(() => {
    setIsAddPostPaperOpen(false);
  }, [setIsAddPostPaperOpen]);

  if (isAddPostPaperOpen) {
    return (
      <AddPost
        onClose={closeAddPostModal}
        pushMessageToSnackbar={pushMessageToSnackbar}
      />
    );
  }
  return (
    <Fragment>
      <Box mt={4}>
        <StatusArea isPluginSubmitted={isPluginSubmitted} />
      </Box>
      <PostContent
        pushMessageToSnackbar={pushMessageToSnackbar}
        openAddPostModal={openAddPostModal}
      />
      {
       <UserDataArea
       computedList={computedList}
       pushMessageToSnackbar={pushMessageToSnackbar}
       />
      } 
    
    </Fragment>
  );
}

export default Dashboard;
