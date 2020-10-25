import * as React from "react";
import { Card, Container } from "tabler-react";
import { Divider, Button } from "semantic-ui-react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import S3FileUpload from "react-s3";
//import reactS3, { uploadFile } from 'react-s3';
import axios from "axios";
import Auth from "@aws-amplify/auth";

import NotificationSystem from "react-notification-system";

const config = {
  bucketName: "skillshopdocs",
  dirName: "documents" /* optional */,
  region: "ap-southeast-2",
  accessKeyId: "AKIAXUYWCMY6VO3N6LIK",
  secretAccessKey: "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",
};

class UploadDocument extends React.Component {
  notificationSystem = React.createRef();

  constructor(props) {
    super(props);

    this.state = { files: [] };
  }

  // Fetch the currently uploaded documents that the current user has
  async getDocuments() {
    let email = Auth.user.attributes.email;

    fetch(
      `https://3dvi80ije9.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` +
        email
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.length > 0) {
          this.setState(
            {
              files: result,
            },
            () => console.log(this.state.files)
          );
        }

        console.log(result);
      });
  }

  componentDidMount = () => {
    this.getDocuments();
  };

  // 'Change' means a file has been selected, it will prepare the upload
  handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
    S3FileUpload.uploadFile(file, config)
      .then((data) => {
        const params = {
          userEmail: Auth.user.attributes.email,
          documentLocation: data.location,
          documentName: file.name,
        };

        axios.post(
          "https://ezc5p5i8b2.execute-api.ap-southeast-2.amazonaws.com/prod",
          params
        );

        console.log(data.location);
      })
      .catch((err) => {
        alert(err);
      });
  };

  // Files will be successfully uploaded and then removed from the preview view
  handleSubmit = (allFiles) => {
    allFiles.forEach((f) => f.remove());

    // Add a notification to show success
    this.addSuccessNotification();

    // Fetch the documents again to see the newly uploaded document in the list
    this.getDocuments();
  };

  // Remove the document (Remove button)
  removeItem = (index) => {
    let userEmail = Auth.user.attributes.email;
    let tmpArray = [...this.state.files];
    tmpArray.splice(index, 1);
    this.setState({ files: tmpArray });

    fetch(
      "https://6r644cc680.execute-api.ap-southeast-2.amazonaws.com/prod/getlocation/deletedoc?userEmail=" +
        userEmail +
        "&documentLocation=" +
        this.state.files[index].documentLocation
    );

    this.addRemoveNotification();
  };

  // Download the document (Download button)
  downloadItem = (index) => {
    window.location.href = this.state.files[index].documentLocation;
  };

  // Notification handler
  addSuccessNotification = () => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: "Document uploaded succesfully",
      level: "success",
      position: "br",
    });
  };

  // Notification handler
  addRemoveNotification = () => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: "Document removed",
      level: "info",
      position: "br",
    });
  };

  render() {
    return (
      <div className="card" name="documentUpload">
        <NotificationSystem ref={this.notificationSystem} />
        <Card.Body>
          <Card.Title>Your Documents</Card.Title>

          {this.state.files.map((d, i) => {
            return (
              <Container className="filePreview">
                <span>{d.documentName}</span>
                <Button
                  floated="right"
                  basic
                  icon="x"
                  type="button"
                  onClick={() => this.removeItem(i)}
                />

                <Button
                  floated="right"
                  basic
                  icon="download"
                  type="button"
                  onClick={() => this.downloadItem(i)}
                />
                <Divider />
              </Container>
            );
          })}

          <Dropzone
            onChangeStatus={this.handleChangeStatus}
            type="file"
            onSubmit={this.handleSubmit}
            multiple={false}
            maxFiles={1}
            accept="*"
          />
        </Card.Body>
      </div>
    );
  }
}

export default UploadDocument;
