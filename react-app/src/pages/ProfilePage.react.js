// @flow

import React, { Component } from "react";

import { Container, Grid, Header, Alert } from "tabler-react";
import { Button, Modal } from "semantic-ui-react";
import { Auth } from "aws-amplify";

import SiteWrapper from "../SiteWrapper.react";

import GeneralInformation from "../components/JobseekerProfile/GeneralInformation.react";
import Skills from "../components/JobseekerProfile/Skills.react";
import JobseekerExpContainer from "../components/JobseekerProfile/JobseekerExpContainer.react";
import JobseekerEduContainer from "../components/JobseekerProfile/JobseekerEduContainer.react";
import RemoveUser from "../components/JobseekerProfile/RemoveUser.react";
import UploadDocument from "../components/JobseekerProfile/UploadDocument.react";

class ProfilePage extends Component {
  state = {
    open: false,

    noData: false,
  };

  openModal = () => {
    this.setState({ open: true });
  };

  closeModal = () => {
    this.setState({ open: false });
  };

  render() {
    const userType = Auth.user.attributes["custom:role"];

    return (
      <SiteWrapper>
        <Alert type="warning" className="fixed">
          <center>
            All information on your profile is publicly available to potential
            employers.{" "}
            <span onClick={this.openModal} className="link">
              {" "}
              Learn more{" "}
            </span>
          </center>
        </Alert>
        <div className="spacer" />
        <div className="my-3 my-md-5">
          <Container>
            <Grid.Row>
              <Grid.Col lg={12}>
                <Header.H1 className="pageHeading">Your Profile</Header.H1>

                {userType == "jobseeker" ? (
                  <div>
                    {/* Jobseeker General Information Set */}
                    <GeneralInformation />

                    {/* Jobseeker Skills Set */}
                    <Skills />

                    {/* Jobseeker Experience Set */}
                    <JobseekerExpContainer />

                    {/* Jobseeker Education Set */}
                    <JobseekerEduContainer />

                    {/* Upload Document */}
                    <UploadDocument />
                  </div>
                ) : (
                  // If not a jobseeker, just display the general information set so the user can still change their name and information
                  <GeneralInformation />
                )}

                {/* Remove User */}
                <RemoveUser />
              </Grid.Col>
            </Grid.Row>
          </Container>

          {/* MODAL CONTENT */}
          <Modal open={this.state.open}>
            <Modal.Header>
              <span className="xButtonHeader"> Your public information </span>
              <Button
                className="xButton"
                onClick={this.closeModal}
                icon="x"
              />{" "}
            </Modal.Header>
            <Modal.Content>
              <p>
                <b>
                  Everything you put on your profile will be publically
                  available for any potential employers to see
                </b>{" "}
              </p>
              <p>
                In order to help facilitate matches, we need to show potential
                employers your information! This means that for any job we deem
                you to be a good match for, that business will be able to see
                your full name, location, description and any experience and
                education information that you have added. Your privacy is
                important to us and we only use this information to help match
                you with potential employers. It is a breach of our terms of
                service for any employers to share any information about you
                with anyone else.
              </p>
            </Modal.Content>
          </Modal>
        </div>
      </SiteWrapper>
    );
  }
}

export default ProfilePage;
