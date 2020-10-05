import * as React from "react";
import { Card, Grid, Container } from "tabler-react";
import { Button, Modal, Icon } from "semantic-ui-react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import S3FileUpload from 'react-s3';
import reactS3, { uploadFile } from 'react-s3';

const config = {
  bucketName: 'skillshopdocs',
  dirName: 'documents', /* optional */
  region: 'ap-southeast-2',
  accessKeyId: 'AKIAXUYWCMY6VO3N6LIK',
  secretAccessKey: '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',
}

class UploadDocument extends React.Component {
  state = { files: [] };
   
  upload(e, files, config){
    
  }
  
  getUploadParams = ({ meta}) => {
    // Need to do the upload functionality here
    

    return { url: "https://httpbin.org/post" };
  };

  handleChangeStatus = ({ meta, file }, status) => {
    console.log(status, meta, file);
  };

  handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
       
  };

  upload=(e, files)=>{
    S3FileUpload.uploadFile(files[0], config)
    .then((data)=> {
        console.log(data.location)
    })
    .catch( (err)=>{
        alert(err)
    })
  }

  render() {
    return (
      <div className="card" name="documentUpload">
        <Card.Body>
          <Card.Title>Upload Documents</Card.Title>

          <Dropzone
            getUploadParams={this.getUploadParams}
            onChangeStatus={this.handleChangeStatus}
            onSubmit={this.upload}
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
