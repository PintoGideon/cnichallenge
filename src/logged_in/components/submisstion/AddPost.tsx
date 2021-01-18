import React, { Fragment, useState, ChangeEvent } from "react";
import ActionPaper from "../../../shared/ActionPaper";
import ButtonCircularProgress from "../../../shared/ButtonCircularProgress";
import { Button, Box } from "@material-ui/core";
import SubmitPost from "./SubmitPost";
import { client } from "../../../utils/auth-provider";

interface AddPostProps {
  onClose: () => void;
  pushMessageToSnackbar?: (message: string) => void;
}

function AddPost(props: AddPostProps) {
  const { onClose, pushMessageToSnackbar } = props;
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = React.useState({
    fileName: "",
    pluginRepresentation: {},
    fileError: false,
  });
  const [errorStatus, setErrorStatus] = React.useState("");
  const [formValues, setFormValues] = React.useState({
    pluginName: "",
    dockerImage: "",
    githubRepository: "",
  });

  const onUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    readFile(file)
      .then(() => {
        setUploadFile({ ...uploadFile, fileError: false });
      })
      .catch(() => setUploadFile({ ...uploadFile, fileError: true }));
  };

  const updateValue = (name: string, value: string) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const readFile = (file: any) => {
    return new Promise((resolve, reject) => {
      const invalidRepresentation = new Error("Invalid Plugin Representation");
      const reader = new FileReader();

      reader.onload = (e) => {
        let result = e && e.target && e.target.result;
        let pluginRepresentation = {};
        try {
          if (result) pluginRepresentation = JSON.parse(result as string);
        } catch (_err) {
          reject(invalidRepresentation);
        }

        setUploadFile(() => {
          return {
            ...uploadFile,
            pluginRepresentation,
            fileName: file.name,
            fileError: false,
          };
        });
      };
      reader.onerror = () => reject(invalidRepresentation);
      reader.readAsText(file);
    });
  };

  const handleUpload = async () => {
    setLoading(true);
    const { pluginRepresentation } = uploadFile;
    if (pluginRepresentation) {
      const fileData = JSON.stringify(pluginRepresentation);
      const file = new Blob([fileData], {
        type: "application/json",
      });

      let pluginData = {
        name: formValues.pluginName,
        dock_image: formValues.dockerImage,
        public_repo: formValues.githubRepository,
      };

      const fetchedClient = await client();
      let newPlugin;

      try {
        const resp = await fetchedClient.createPlugin(pluginData, {
          descriptor_file: file,
        });
        newPlugin = resp.data;
        pushMessageToSnackbar &&
          pushMessageToSnackbar(
            
            `Your Submission for ${newPlugin.name} was received successfully`
          
          );
        onClose();
      } catch (error) {
        setErrorStatus(error.response.data);
      }
    }
  };

  return (
    <Fragment>
      <ActionPaper
        helpPadding
        maxWidth="md"
        content={
          <SubmitPost
            updateValue={updateValue}
            formValues={formValues}
            onUpload={onUpload}
            fileName={uploadFile.fileName}
            errorStatus={errorStatus}
          />
        }
        actions={
          <Fragment>
            <Box mr={1}>
              <Button onClick={onClose} disabled={loading}>
                Back
              </Button>
            </Box>
            <Button
              onClick={handleUpload}
              variant="contained"
              color="secondary"
              disabled={!uploadFile || loading}
            >
              Submit {loading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}

export default AddPost;
