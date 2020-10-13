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

        console.log(data.location)
      })
      .catch((err) => {
        alert(err);
      });
  };

  handleSubmit = (allFiles) => {
    this.setState(
      {
        files: [...this.state.files, allFiles[0]],
      },
      () => console.log(this.state.files)
    );

    allFiles.forEach((f) => f.remove());
    this.addSuccessNotification();
  };

  removeItem = (index) => {
    let tmpArray = [...this.state.files]
    tmpArray.splice(index, 1)
    this.setState({files: tmpArray})

    this.addRemoveNotification()
  }

  addSuccessNotification = () => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: "Document uploaded succesfully",
      level: "success",
      position: "br",
    });
  };

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
            <span>{d.file.name}</span>
            <Button
                floated="right"
                basic
                icon="x"
                type="button"
                onClick={ () => this.removeItem(i)}
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
