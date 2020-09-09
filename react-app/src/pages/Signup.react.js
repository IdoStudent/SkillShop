import React, { Component } from "react";
import { Auth } from "aws-amplify";

import { Container, Form, Grid, Header, Button, Alert } from "tabler-react";

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    role: "",

    roleErrMsg: "",
    emailErrMsg: "",
    passwordErrMsg: "",
    passwordConfErrMsg: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // If form validation passes, sign up the user
    if (this.validateForm()){
      // AWS Cognito registration
      this.state.username = this.state.email;
      const { username, email, password } = this.state;
      try {
        const signUpResponse = await Auth.signUp({
          username,
          password,
          attributes: {
            email: email,
            "custom:role": this.state.role,
          },
        });
        console.log(signUpResponse);
        this.props.history.push("/login");
      } catch (error) {
        console.log("Error");
      }
    }
  };

  validateForm = () => {
    let email = this.state.email;
    let password = this.state.password;
    let passwordConfirm = this.state.passwordConfirm;
    let role = this.state.role;

    let validInput = true;

    if (!email) {
      this.setState({ emailErrMsg: "E-mail is required", emailErr: true });
      validInput = false
    } else if (!validEmailRegex.test(email)) {
        this.setState({ emailErrMsg: "Please enter a valid email", emailErr: true });
        validInput = false
    }

    if (!password) {
        this.setState({ passwordErrMsg: "Password is required", passwordErr: true });
        validInput = false
    }

    if (!passwordConfirm) {
        this.setState({ passwordConfErrMsg: "Please confirm your password", passwordConfErr: true });
        validInput = false
    } else if (password != passwordConfirm) {
        this.setState({ passwordConfErrMsg: "Passwords do not match", passwordErr: true, passwordConfErr: true });
        validInput = false
    }

    if (!role){
        this.setState({ roleErrMsg: "Please select your account type"});
        validInput = false
    }

    return validInput
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,

      emailErr: false,
      emailErrMsg: "",

      passwordErr: false,
      passwordErrMsg: "",

      passwordConfErr: false,
      passwordConfErrMsg: "",

      roleErrMsg: ""

    });
  };

  handleRadio = (event) => {
    this.setState({
      role: event.target.value,
      roleErrMsg: ""
    });
  };

  sendtoLogin = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="registerPage">
        <Container className="wrapper">
          <Header.H3>Register</Header.H3>
          <Container className="card">
            <Grid className="landingGrid">
              <Grid.Row>
                {/* ACCOUNT TYPE RADIOS */}
                <Grid.Col md={10} offset={1}>
                  <Form.Group label="Select your account type">
                    <Form.Radio
                      isInline
                      label="I'm a Jobseeker"
                      name="accountType"
                      value="jobseeker"
                      onChange={this.handleRadio}
                    />
                    <Form.Radio
                      isInline
                      label="I'm an Employer"
                      name="accountType"
                      value="employer"
                      onChange={this.handleRadio}
                    />
                  </Form.Group>
                  <Container className="errorMsg radios">
                      <p> {this.state.roleErrMsg} </p>
                    </Container>
                </Grid.Col>

                {/* FORM INPUTS */}
                <Grid.Col md={8} offset={2}>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group label="Email" isRequired className="formLabelLeft">
                      <Form.Input
                        name="email"
                        value={this.state.email}
                        onChange={this.onInputChange}
                        invalid={this.state.emailErr}
                      />
                    </Form.Group>

                    <Container className="errorMsg">
                      <p> {this.state.emailErrMsg} </p>
                    </Container>

                    <Form.Group label="Password" isRequired className="formLabelLeft">
                      <Form.Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onInputChange}
                        invalid={this.state.passwordErr}
                      />
                    </Form.Group>

                    <Container className="errorMsg">
                      <p> {this.state.passwordErrMsg} </p>
                    </Container>

                    <Form.Group label="Re-Type Password" isRequired className="formLabelLeft">
                      <Form.Input
                        name="passwordConfirm"
                        type="password"
                        value={this.state.passwordConfirm}
                        onChange={this.onInputChange}
                        invalid={this.state.passwordConfErr}
                      />
                    </Form.Group>

                    <Container className="errorMsg">
                      <p> {this.state.passwordConfErrMsg} </p>
                    </Container>

                    <Button type="submit" square>
                      Register
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
          Already have an account?{" "}
          <span onClick={this.sendtoLogin} className="linkText">
            Login
          </span>
        </p>
      </div>
    );
  }
}

export default Signup;
