import React, { Component } from "react";
import { Auth } from "aws-amplify";

// import { Header,Form,Button,Grid,Message } from "semantic-ui-react";

import { Container, Form, Grid, Header, Button, Alert } from "tabler-react";

class Login extends Component {
  state = {
    username: "",
    password: "",
    role: "",

    errorMsg: "",

    error: false,
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // AWS Cognito integration here
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      // this.props.history.push("/");

      let role = user.attributes["custom:role"];
      // console.log(role);

      if (role == "Employer") {
        // console.log('route to employer profile');
        this.props.history.push("/candidates");
      } else if (role == "Jobseeker") {
        // console.log('route to jobseeker profile');
        this.props.history.push("/myprofile");
      }
    } catch (error) {
      console.log("Error");
      let err = null;
      !error.message ? (err = { message: error }) : (err = error);
      this.setState({
        error: true,
        errorMsg:
          "The username or password you entered is incorrect, please try again.",
        errors: {
          ...this.state.errors,
          cognito: err,
        },
      });
    }
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: false,
      errorMsg: "",
    });
  };

  sendtoSignup = () => {
    this.props.history.push("/signup");
  };

  // Set initial state
  componentDidMount() {
    this.setState({
      error: false,
      errorMsg: "",
    });
  }

  render() {
    return (
      <div className="loginPage">
        <Container className="wrapper">
          <Header.H3>Login</Header.H3>
          <Container className="card">
            <Grid className="landingGrid">
              <Grid.Row>
                <Grid.Col md={8} offset={2}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group label="Email" className="formLabelLeft">
                      <Form.Input
                        name="username"
                        value={this.state.username}
                        onChange={this.onInputChange}
                        invalid={this.state.error}
                      />
                    </Form.Group>

                    <Form.Group label="Password" className="formLabelLeft">
                      <Form.Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                        invalid={this.state.error}
                      />
                    </Form.Group>

                    <Button type="submit" square>
                      Login
                    </Button>
                  </Form>
                </Grid.Col>
              </Grid.Row>
            </Grid>
          </Container>
          <Container className="errorMsg">
            <p> {this.state.errorMsg} </p>
          </Container>
        </Container>

        <p className="bottomRight">
          Need to create an Account?{" "}
          <span onClick={this.sendtoSignup} className="linkText">
            Sign up
          </span>
        </p>
      </div>
    );
  }
}

export default Login;
