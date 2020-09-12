import React, { Component } from "react";

import { Container, Grid, Header, Button } from "tabler-react";

class LandingPage extends Component {

  handleJobseekerRegister = () => {
    this.props.history.push({
        pathname: '/signup',
        type: 'jobseeker',
    });
  };

  handleEmployerRegister = () => {
    this.props.history.push({
        pathname: '/signup',
        type: 'employer',
    });
  };

  handleLogin = () => {
    console.log("login");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="background landingPage">
        <Container className="header">
          <Header.H1>Welcome to SkillShop</Header.H1>{" "}
          <Header.H2>Let's get Started!</Header.H2>
        </Container>

        <Container className="middleContent">
          <Grid>
            <Grid.Row>
              <Grid.Col md={4}>
                <Container className="sideButton">
                  <Header.H2>I'm a Jobseeker</Header.H2>
                  <Button type="button" square onClick={this.handleJobseekerRegister}>
                      Signup to start getting Matches
                    </Button>
                </Container>
              </Grid.Col>
              <Grid.Col md={4}>
                <Container className="middleDivider"></Container>
              </Grid.Col>
              <Grid.Col md={4}>
                <Container className="sideButton">
                  <Header.H2>I'm an Employer</Header.H2>
                  
                  <Button type="button" square onClick={this.handleEmployerRegister}>
                      Signup to find Candidates
                    </Button>
                </Container>
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Container>

        <p className="bottomRight">
          Already have an account?{" "}
          <span onClick={this.handleLogin} className="linkText">
            Log In
          </span>
        </p>
      </div>
    );
  }
}

export default LandingPage;
