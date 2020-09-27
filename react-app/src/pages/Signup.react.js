import React, { Component } from "react";
import { Auth } from "aws-amplify";

import { Container, Form, Grid, Header } from "tabler-react";
import { Button, Icon } from "semantic-ui-react";

const validEmailRegex = 
//eslint-disable-next-line
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

    sendingData: false,

    validRegistration: false
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    // If form validation passes, sign up the user
    if (this.validateForm()){
      // AWS Cognito registration
      this.state.username = this.state.email;
      const { username, email, password } = this.state;
      try {
        this.setState({sendingData: true})
        const signUpResponse = await Auth.signUp({
          username,
          password,
          attributes: {
            email: email,
            "custom:role": this.state.role,
          },
        });

        this.setState({validRegistration: true})

      } catch (error) {
        this.setState({sendingData: false})

        if(error.code === "UsernameExistsException"){
          this.setState({ emailErrMsg: "An account with this email already exists", emailErr: true });
        }
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
    } else if (password.length < 8){
      this.setState({ passwordErrMsg: "Password needs to be atleast 8 characters", passwordErr: true });
      validInput = false
    }

    if (!passwordConfirm) {
        this.setState({ passwordConfErrMsg: "Please confirm your password", passwordConfErr: true });
        validInput = false
    } else if (password !== passwordConfirm) {
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
    this.props.history.push({
      pathname: '/login',
      email: this.state.email,
    });
  };

  componentDidMount(){

    // If there is a user type parameter (came from landing page), assign this to our state
    if(this.props.location.type) {
      this.setState({role: this.props.location.type })
    }

  }

  render() {
    return <div className="background registerPage">
        <Container className="wrapper">
          <Header.H3>Register</Header.H3>

          {this.state.validRegistration === false ? // Display if user has not signed up

            <Container className="card">
              <Grid className="landingGrid">
                <Grid.Row>
                  {/* ACCOUNT TYPE RADIOS */}
                  <Grid.Col md={10} offset={1}>
                    <Form.Group label="Select your account type">
                      <Form.Radio isInline label="I'm a Jobseeker" name="accountType" value="jobseeker" onChange={this.handleRadio} checked={this.state.role === "jobseeker"} />
                      <Form.Radio isInline label="I'm an Employer" name="accountType" value="employer" onChange={this.handleRadio} checked={this.state.role === "employer"} />
                    </Form.Group>
                    <Container className="errorMsg radios">
                      <p> {this.state.roleErrMsg} </p>
                    </Container>
                  </Grid.Col>

                  {/* FORM INPUTS */}
                  <Grid.Col md={8} offset={2}>
                    <Form>
                      <Form.Group label="Email" isRequired className="formLabelLeft">
                        <Form.Input name="email" value={this.state.email} onChange={this.onInputChange} invalid={this.state.emailErr} />
                      </Form.Group>

                      <Container className="errorMsg">
                        <p> {this.state.emailErrMsg} </p>
                      </Container>

                      <Form.Group label="Password" isRequired className="formLabelLeft">
                        <Form.Input name="password" type="password" value={this.state.password} onChange={this.onInputChange} invalid={this.state.passwordErr} />
                      </Form.Group>

                      <Container className="errorMsg">
                        <p> {this.state.passwordErrMsg} </p>
                      </Container>

                      <Form.Group label="Re-Type Password" isRequired className="formLabelLeft">
                        <Form.Input name="passwordConfirm" type="password" value={this.state.passwordConfirm} onChange={this.onInputChange} invalid={this.state.passwordConfErr} />
                      </Form.Group>

                      <Container className="errorMsg">
                        <p> {this.state.passwordConfErrMsg} </p>
                      </Container>

                      <Button animated={!this.state.sendingData} loading={this.state.sendingData} type="button" onClick={this.handleSubmit}>
                        <Button.Content visible>Register</Button.Content>
                        {this.state.sendingData === false ? <Button.Content hidden>
                            <Icon name="arrow right" />
                          </Button.Content> : null}
                      </Button>
                    </Form>
                  </Grid.Col>
                </Grid.Row>
              </Grid>
            </Container> : // Display if use has successfully registered

            <Container className="card success">
              <Header.H2>Registration was succesful!</Header.H2>

              <p> Before you can login, you need to confirm your email. <br/> <br/>
                {" "}
                To do that, find the email sent by us in your inbox and
                simply click the link. Once you've done that, you can click
                the button below to go to the login page.{" "}
              </p>

              <Button animated type="button" onClick={this.sendtoLogin}>
                <Button.Content visible>Go to Login</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Container>}
        </Container>

        <p className="bottomRight">
          Already have an account? <span onClick={this.sendtoLogin} className="linkText">
            Login
          </span>
        </p>
      </div>;
  }
}

export default Signup;
