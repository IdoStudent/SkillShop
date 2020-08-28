// @flow

import React, { Component } from "react";

import { Container, Grid, Header, Alert } from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";

import GeneralInformation from "../components/JobseekerProfile/GeneralInformation.react";
import Skills from "../components/JobseekerProfile/Skills.react";
import JobseekerExpContainer from "../components/JobseekerProfile/JobseekerExpContainer.react";
import JobseekerEduContainer from "../components/JobseekerProfile/JobseekerEduContainer.react";

class ProfilePage extends Component {
  render() {
    return (
      <SiteWrapper>
        <Alert type="warning" isDismissible>
          <center>
            All information on your profile is publicly available to potential
            employers.
          </center>
        </Alert>
        <div className="my-3 my-md-5">
          {this.props.auth.isAuthenticated && this.props.auth.user && (
            <p>
              Hello {this.props.auth.user}
            </p>
          )}
          <Container>
            <Grid.Row>
              <Grid.Col lg={12}>
                <Header.H1>Your Profile</Header.H1>

                {/* Jobseeker General Information Set */}
                <GeneralInformation />

                {/* Jobseeker Skills Set */}
                <Skills />

                {/* Jobseeker Experience Set */}
                <JobseekerExpContainer />

                {/* Jobseeker Education Set */}
                <JobseekerEduContainer />
              </Grid.Col>
            </Grid.Row>
          </Container>
        </div>
      </SiteWrapper>
    );
  }
}

export default ProfilePage;
