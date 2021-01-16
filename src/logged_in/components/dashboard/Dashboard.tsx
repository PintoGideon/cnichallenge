import React, { useState, useCallback, Fragment } from "react";
import { Box, Typography } from "@material-ui/core";
import PostContent from "../submisstion/PostContent";
import AddPost from "../submisstion/AddPost";
import StatusArea from "../submisstion/StatusArea";

interface DashboardProps {
  selectDashboard: () => void;
  pushMessageToSnackbar: (message: string) => void;
}

function Dashboard(props: DashboardProps) {
  const { pushMessageToSnackbar } = props;
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
        <Typography variant="subtitle1" gutterBottom>
          Submission Status
        </Typography>
      </Box>
      <PostContent
        pushMessageToSnackbar={pushMessageToSnackbar}
        openAddPostModal={openAddPostModal}
      />
    </Fragment>
  );
}

export default Dashboard;
