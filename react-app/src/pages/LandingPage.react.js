import React, { Component } from "react";

import {
  Container,
  Card,
  Form,
  Grid,
  Alert,
  Header,
  Button,
} from "tabler-react";

import background from "../img/background.png";
import logo from "../img/middlelogo.png";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //routing
      jobseekerRegisterWindow: false,
      employerRegisterWindow: false,
      loginWindow: false,
      landingPageWindow: true,

      //cognito
      email: "",
    };
  }

  componentDidMount() {
    this.setState({ employerRegisterWindow: false });
  }

  handleJobseekerRegister = () => {
    console.log("jobseeker register");
    this.props.history.push("/registrationpagejobseeker");
    // this.setState({ jobseekerRegisterWindow: true });
  };

  handleEmployerRegister = () => {
    console.log("employer register");
    this.props.history.push("/registrationpageemployer");
    // this.setState({ employerRegisterWindow: true });
    // this.setState({ landingPageWindow: false });
  };

  handleLogin = () => {
    console.log("login");
    this.props.history.push("/login");
    // this.setState({ loginWindow: true });
  };

  handleSubmit = () => {
    console.log("submit");
    //to implement
  };

  handleChange = () => {
    console.log("change");
    //to implement
  };

  render() {
    return (
      <div className="landingPage">
        <Container className="card">
          <Header.H2>Welcome to SkillShop. Let's get Started!</Header.H2>
          <Grid className="landingGrid">
            <Grid.Row>
              <Grid.Col md={4} offset={2}>
                {" "}
                <Button square color="primary" onClick={this.handleJobseekerRegister}>
                  I'm a Jobseeker
                </Button>
              </Grid.Col>

              <Grid.Col md={4}>
                {" "}
                <Button square color="primary" onClick={this.handleEmployerRegister}>
                  I'm an Employer
                </Button>
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Container>

        <p className="bottomRight">Already have an account? <span onClick={this.handleLogin} className="linkText">Log In</span></p>
      </div>
    );
  }
}

export default LandingPage;
