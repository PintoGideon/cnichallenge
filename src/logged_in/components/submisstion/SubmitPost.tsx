import React, { Fragment, ChangeEvent } from "react";
import {
  FormControl,
  TextField,
  Typography,
  Theme,
  createStyles,
  Button,
  IconButton,
  WithStyles,
  WithTheme,
  withStyles,
  FormHelperText,
} from "@material-ui/core";
import FileCopy from "@material-ui/icons/FileCopy";
import CloseIcon from "@material-ui/icons/Close";
import HighlightedInformation from "../../../shared/HighlightedInformation";
import { ErrorPayload } from "./AddPost";
const styles = (theme: Theme) =>
  createStyles({
    floatButtonWrapper: {
      position: "absolute",
      top: theme.spacing(1),
      botton: theme.spacing(1),
      right: theme.spacing(1),
      zIndex: 1000,
    },
    inputRoot: {
      width: 190,
      "@media (max-width:  400px)": {
        width: 160,
      },
      "@media (max-width:  360px)": {
        width: 140,
      },
      "@media (max-width:  340px)": {
        width: 120,
      },
    },
    uploadIcon: {
      fontSize: 48,
      transition: theme.transitions.create(["color", "box-shadow", "border"], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    imgWrapper: { position: "relative" },
    img: {
      width: "100%",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRadius: theme.shape.borderRadius,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    },
    uploadText: {
      transition: theme.transitions.create(["color", "box-shadow", "border"], {
        duration: theme.transitions.duration.short,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    numberInput: {
      width: 110,
    },
    numberInputInput: {
      padding: "9px 34px 9px 14.5px",
    },

    dNone: {
      display: "none",
    },
    input: {
      display: "none",
    },
  });

interface SubmitPostProps extends WithStyles<typeof styles>, WithTheme {
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  formValues: {
    pluginName: string;
    dockerImage: string;
    githubRepository: string;
  };
  updateValue: (name: string, value: string) => void;
  errorStatus: ErrorPayload;
  fileName: string;
  clearUpload:   ()   =>   void;
}

function SubmitPost(props: SubmitPostProps) {
  const {
    classes,
    onUpload,
    formValues,
    updateValue,
    errorStatus,
    fileName,
    theme,
    clearUpload,
  } = props;

  return (
    <Fragment>
      <Typography paragraph variant="h6">
        Upload your Plugin
      </Typography>

      <FormControl variant="outlined">
        <TextField
          variant="outlined"
          value={formValues.pluginName}
          margin="normal"
          error={errorStatus.name.length > 0}
          required
          fullWidth
          label="Plugin Name"
          autoFocus
          autoComplete="off"
          type="email"
          onChange={(e) => {
            updateValue("pluginName", e.target.value);
          }}
          helperText={errorStatus.name}
          FormHelperTextProps={{ error: true }}
        />

        <TextField
          variant="outlined"
          value={formValues.dockerImage}
          margin="normal"
          error={errorStatus.dock_image.length > 0}
          required
          fullWidth
          label="Docker Image"
          autoComplete="off"
          type="email"
          onChange={(e) => {
            updateValue("dockerImage", e.target.value);
          }}
          helperText={errorStatus.dock_image}
          FormHelperTextProps={{ error: true }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          value={formValues.githubRepository}
          error={errorStatus.public_repo.length > 0}
          required
          fullWidth
          label="Github Repository"
          autoComplete="off"
          type="email"
          onChange={(e) => {
            updateValue("githubRepository", e.target.value);
          }}
          helperText={errorStatus.public_repo}
          FormHelperTextProps={{ error: true }}
        />
        <div>
          <input
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            onChange={onUpload}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>

          {fileName && (
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={clearUpload}
              >
                <FileCopy /> {fileName}
                <IconButton
                  color="primary"
                  aria-label="cancel upload"
                  component="span"
                >
                  <CloseIcon />
                </IconButton>
              </IconButton>
            </label>
          )}
        </div>
        {errorStatus.descriptor_file && (
          <FormHelperText
            error
            style={{
              display: "block",
              marginTop: theme.spacing(3),
            }}
          >
            {errorStatus.descriptor_file}
          </FormHelperText>
        )}
        <HighlightedInformation>
          Please upload a plugin representation from your local file system
        </HighlightedInformation>
      </FormControl>
    </Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(SubmitPost);
