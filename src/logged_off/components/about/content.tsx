import React, { Fragment } from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";

const content = (
  <Fragment>
    <Typography paragraph>
      The{" "}
      <a href="http://www.brainconnectivity.net">
        Connectomics in NeuroImaging Challenge
      </a>{" "}
      was held at the Medical Image Computation and Computer Assisted
      Intervention (MICCAI) Conference in 2019. Full details of this Challenge
      can be found at in the corresponding publication{" "}
      <a href="https://arxiv.org/abs/2006.03611">
        <b>here</b>
      </a>
    </Typography>
    <Typography paragraph>
      With our free to download training data and the use of our Docker
      framework, you will be able to assess your classification model on our
      hidden test dataset.
    </Typography>
    <Typography variant="h5">Problem Statement</Typography>
    <Typography paragraph>
      Using functional connectomics, are we capturing biologically relevant and
      generalizable information about the brain, or are we simply overfitting to
      the data?
    </Typography>
    <Typography paragraph>
      {" "}
      This Challenge addresses the issues of generalizability and clinical
      relevance for functional connectomes. We provide resting-state fMRI
      (rsfMRI) datasets of children with attention deficit hyperactivity
      disorder (ADHD) and neurotypical controls for you to{" "}
      <b>
        design a classification framework that can predict subject diagnosis
        based on brain connectivity data
      </b>
      .
    </Typography>
    <Typography variant="h5">The Data</Typography>
    <Typography paragraph>
      With collaborators from the{" "}
      <a href="http://www.kennedykrieger.org/kirby-research-center">
        Kennedy Krieger Institute
      </a>
      , 120 examples of each class are available for{" "}
      <a href="https://github.com/mdschirmer/2019_CNI_TrainingRelease">
        training
      </a>{" "}
      (n=100/100) and{" "}
      <a href="https://github.com/mdschirmer/2019_CNI_ValidationRelease">
        validation
      </a>{" "}
      (n=20/20).
      <br />
      For this challenge, we have extracted the mean time courses of the
      preprocessed rs-fMRI data using three standard parcellations: AAL (116
      ROIs), Harvard Oxford (110 ROIs) and Craddock200 (200 ROIs). The data for
      each parcellation is included as a separate timeseries_XXX.csv file in
      corresponding the subject directory. Here, rows correspond to parcel
      number and columns correspond to time samples. Any of this data may be
      used to develop your models.
      <br />
      <br />
      In addition to the rs-fMRI data, we also provide the following demographic
      variables for each subject: Age, Sex, FSIQ, and Edinburgh Handedness. This
      information can be found in the accompanying phenotypic.csv file in each
      subject directory. During training and validation, diagnosis (DX) is
      provided for you to evaluate your model. During testing, the DX field will
      contain "N/A".
      <br />
      <br />
      The test dataset comprises of another 25 subjects for each className, and
      remains unreleased to the public. It is only "accessible" through our
      evaluation portal.
    </Typography>
    <Typography variant="h5">Evaluation Metrics</Typography>
    <Typography paragraph>
      We utilize a total of 16 measures, including: accuracy, error rate,
      sensitivity, specificity, precision, recall, F-Measure, Geometric-mean,
      AUC, and optimized precision.
      <br />
      (cf. Hossin and Sulaiman. A review on evaluation metrics for data
      classNameification evaluations. Int. J. of Data Mining & Knowledge
      Management Process, 5(2):1,2015)
      <br />
      <br />
      Our Challenge portal will report the performance of your model on the
      hidden test set, using the above metrics.
    </Typography>
    <Typography variant="h5">
      Dockerize and upload your Model for Evaluation
    </Typography>
    <Typography paragraph>
      Our Challenge portal employs the{" "}
      <a href="https://chrisproject.org">ChRIS platform</a>, an open source
      framework that utilizes cloud technologies to democratize medical
      analytics application development.
      <br />
      <br />
      To evaluate your model on hidden test data, the following steps are
      required (full details <Link to="/containerize">here</Link>):
    </Typography>
    <List disablePadding={true} dense>
      <ListItem>
        <ListItemText
          primary={
            <Typography paragraph>
              1. Enable your classification model to output its decisions in a
              .csv file as per our <Link to="/containerize">requirements</Link>
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Typography paragraph>
              2.Train your model on our released dataset:{" "}
              <a href="https://github.com/mdschirmer/2019_CNI_TrainingRelease">
                Training data
              </a>
            </Typography>
          }
        ></ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Typography paragraph>
              3. Validate your model on our released dataset:{" "}
              <a href="https://github.com/mdschirmer/2019_CNI_ValidationRelease">
                Validation data
              </a>
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Typography paragraph>
              4. Populate our{" "}
              <a href="https://github.com/aichung/pl-cnichallenge_stub">
                wrapper code
              </a>{" "}
              with your trained model to convert it into a containerized plugin
              that is ChRIS compatible;
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Typography paragraph>
              5. Upload your containerized plugin to your{" "}
              <a href="https://www.docker.com">Docker Hub</a>
            </Typography>
          }
        />
      </ListItem>
      <ListItem>
        <ListItemText
          primary={
            <Typography paragraph>
              6. Immedietely evaluate your model on hidden test data by entering
              the Docker image link <Link to="/submit">here</Link>.
            </Typography>
          }
        />
      </ListItem>
    </List>
  </Fragment>
);

export default content;
