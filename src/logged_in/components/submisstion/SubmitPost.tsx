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
  withStyles,
} from "@material-ui/core";
import FileCopy from "@material-ui/icons/FileCopy";

const styles = (theme: Theme) =>
  createStyles({
    floatButtonWrapper: {
      position: "absolute",
      top: theme.spacing(1),
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

interface SubmitPostProps extends WithStyles<typeof styles> {
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  formValues: {
    pluginName: string;
    dockerImage: string;
    githubRepository: string;
  };
  updateValue: (name: string, value: string) => void;
  errorStatus: string;
  fileName: string;
}

function SubmitPost(props: SubmitPostProps) {
  const {
    classes,
    onUpload,
    formValues,
    updateValue,
    errorStatus,
    fileName,
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
          error={errorStatus === "invalidPlugin"}
          required
          fullWidth
          label="Plugin Name"
          autoFocus
          autoComplete="off"
          type="email"
          onChange={(e) => {
            updateValue("pluginName", e.target.value);
          }}
          helperText={
            errorStatus === "invalidPlugin" &&
            "This plugin is already present in the store."
          }
          FormHelperTextProps={{ error: true }}
        />

        <TextField
          variant="outlined"
          value={formValues.dockerImage}
          margin="normal"
          error={errorStatus === "dockerImage"}
          required
          fullWidth
          label="Docker Image"
          autoFocus
          autoComplete="off"
          type="email"
          onChange={(e) => {
            updateValue("dockerImage", e.target.value);
          }}
          helperText={errorStatus === "dockerImage" && "This image is Valid"}
          FormHelperTextProps={{ error: true }}
        />

        <TextField
          variant="outlined"
          margin="normal"
          value={formValues.githubRepository}
          error={errorStatus === "githubRepository"}
          required
          fullWidth
          label="Github Repository"
          autoFocus
          autoComplete="off"
          type="email"
          onChange={(e) => {
            updateValue("githubRepository", e.target.value);
          }}
          helperText={errorStatus === "githubRepository" && "This url is Valid"}
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
              >
                <FileCopy /> {fileName}
              </IconButton>
            </label>
          )}
        </div>
      </FormControl>
    </Fragment>
  );
}

export default withStyles(styles, { withTheme: true })(SubmitPost);
