import * as React from "react";
import { Card, Grid, Container } from "tabler-react";
import { Button, Modal, Icon } from "semantic-ui-react";
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'


class UploadDocument extends React.Component {

  getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }

  handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }


  handleSubmit = (files, allFiles) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  render() {
    return (
      <div className="card" name="documentUpload">
        <Card.Body>
        <Card.Title>Upload Documents</Card.Title>

            <Dropzone
            getUploadParams={this.getUploadParams}
            onChangeStatus={this.handleChangeStatus}
            onSubmit={this.handleSubmit}
            accept="*"
          />

        </Card.Body>
      </div>
    );
  }
}

export default UploadDocument;
