import React, { Component } from "react";
import { Auth } from "aws-amplify";

// import { Header,Form,Button,Grid,Message } from "semantic-ui-react";

import { Container, Form, Grid, Header } from "tabler-react";
import { Button, Icon } from "semantic-ui-react";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class Login extends Component {
  state = {
    username: "",
    password: "",
    role: "",

    errorMsg: "",

    error: false,

    sendingData: false,
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.validateForm()) {
      // AWS Cognito integration here
      try {
        this.setState({sendingData: true})
        const user = await Auth.signIn(
          this.state.username,
          this.state.password
        );
        this.props.auth.setAuthStatus(true);
        this.props.auth.setUser(user);
        // this.props.history.push("/");

        let role = user.attributes["custom:role"];
        // console.log(role);

        if (role == "employer") {
          // console.log('route to employer profile');
          this.props.history.push("/candidates");
        } else if (role == "jobseeker") {
          // console.log('route to jobseeker profile');
          this.props.history.push("/myprofile");
        }
      } catch (error) {
        this.setState({sendingData: false})
        if (error.code == "UserNotConfirmedException") {
          this.setState({
            emailErr: true,
            passwordErr: true,
            errorMsg: "Please confirm your account first!",
          });
        }

        if (error.code == "NotAuthorizedException") {
          this.setState({
            emailErr: true,
            passwordErr: true,
            errorMsg: "Incorrect username or password.",
          });
        }
      }
    }
  };

  validateForm = () => {
    let username = this.state.username;
    let password = this.state.password;

    let validInput = true;

    if (!username) {
      this.setState({ emailErr: true });
      validInput = false;
    } else if (!validEmailRegex.test(username)) {
      this.setState({ emailErr: true });
      validInput = false;
    }

    if (!password) {
      this.setState({ passwordErr: true });
      validInput = false;
    }

    return validInput;
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      emailErr: false,
      passwordErr: false,
      errorMsg: "",
    });
  };

  sendtoSignup = () => {
    this.props.history.push("/signup");
  };

  // Set initial state
  componentDidMount() {
    if (this.props.location.email) {
      this.setState({
        username: this.props.location.email,
      });
    }

    this.setState({
      error: false,
      errorMsg: "",
    });
  }

  render() {
    return (
      <div className="background loginPage">
        <Container className="wrapper">
          <Header.H3>Login</Header.H3>
          <Container className="card">
            <Container className="errorMsg">
              <p> {this.state.errorMsg} </p>
            </Container>
            <Grid className="landingGrid">
              <Grid.Row>
                <Grid.Col md={8} offset={2}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group label="Email" className="formLabelLeft">
                      <Form.Input
                        name="username"
                        value={this.state.username}
                        onChange={this.onInputChange}
                        invalid={this.state.emailErr}
                      />
                    </Form.Group>

                    <Form.Group label="Password" className="formLabelLeft">
                      <Form.Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                        invalid={this.state.passwordErr}
                      />
                    </Form.Group>
                    <Button animated={!this.state.sendingData} loading={this.state.sendingData}>
                      <Button.Content type="submit" visible>
                        Login
                      </Button.Content>
                      {(this.state.sendingData == false) ? <Button.Content hidden><Icon name="arrow right" /></Button.Content> : null}
                    </Button>
                  </Form>
                </Grid.Col>
              </Grid.Row>
            </Grid>
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
