import React, { Fragment, useState, ChangeEvent } from "react";
import ActionPaper from "../../../shared/ActionPaper";
import ButtonCircularProgress from "../../../shared/ButtonCircularProgress";
import { Button, Box } from "@material-ui/core";
import SubmitPost from "./SubmitPost";
import { client } from "../../../utils/auth-provider";
import { Auth } from "../../../App";

interface AddPostProps {
  onClose: () => void;
  pushMessageToSnackbar?: (message: string) => void;
  user: Auth;
}

export type ErrorPayload = {
    name:string,
    dock_image:string,
    public_repo:string,
    descriptor_file:string
}

function AddPost(props: AddPostProps) {
  const { onClose, pushMessageToSnackbar, user } = props;
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = React.useState({
    fileName: "",
    pluginRepresentation: {},
    fileError: false,
  });
  const [errorStatus, setErrorStatus] = React.useState<ErrorPayload>({
    name:"",
    dock_image:"",
    public_repo:"",
    descriptor_file:""
  });
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
    setErrorStatus({
      name: "",
      dock_image: "",
      public_repo: "",
      descriptor_file:''

    });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const clearUpload=()=>{
    setUploadFile({
      fileName: "",
      pluginRepresentation: {},
      fileError: false,
    });
  }

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

      const fetchedClient = await client(user);
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
        setLoading(false)
        console.log("Error",error.response.data)
    
        let errorPayload:ErrorPayload={
          name:"",
          public_repo:'',
          dock_image:'',
          descriptor_file:''
        };

        let dockImageError = error.response.data?.dock_image;
        let publicRepoError= error.response.data?.public_repo
        let nameError = error.response.data?.name;
        let descriptorError=error.response.data?.descriptor_file;
        console.log('DescriptorError',descriptorError)
      
        if(dockImageError && dockImageError[0].length>0){
          errorPayload['dock_image']=dockImageError[0]
        }
        if(publicRepoError && publicRepoError[0].length>0){
          errorPayload['public_repo']=publicRepoError[0]
        };
        if(nameError && nameError[0].length>0){
          errorPayload['name']=nameError[0]
        }
        if(descriptorError && descriptorError[0].length>0){
          errorPayload['descriptor_file']=descriptorError[0]
        }
      
        setErrorStatus(errorPayload)
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
            clearUpload={clearUpload}
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
