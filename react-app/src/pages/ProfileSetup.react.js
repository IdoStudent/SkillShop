import React, { Component } from "react";
import { Auth } from "aws-amplify";
import axios from "axios";

import { Container, Form, Grid, Header } from "tabler-react";
import { Button, Icon } from "semantic-ui-react";

class Login extends Component {
  state = {
    firstName: "",
    surname: "",
    postcode: "",
    state: "",

    // Form Validation stuff
    fNameInvalid: false,
    fNameErrorMsg: "",

    surnameInvalid: false,
    surnameErrorMsg: "",

    postcodeInvalid: false,
    postcodeErrorMsg: "",

    stateInvalid: false,
    stateErrorMsg: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.validateForm()) {
      try {
        const params = {
          userEmail: Auth.user.attributes.email,
          userFirstName: this.state.firstName,
          userMiddleName: "",
          userLastName: this.state.surname,
          userCity: "",
          userPostCode: this.state.postcode,
          userState: this.state.state,
          userAbout: "",
          userType: Auth.user.attributes['custom:role'],
          userPhoneNumber: "",
        };

        await axios.post(
          "https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata",
          params
        );
      } catch (err) {
        console.log(`An error has occurred: ${err}`);
      }
    }
  };

  validateForm = () => {
    let validInput = true;

    let fName = this.state.firstName;
    let surname = this.state.surname;
    let postcode = this.state.postcode;
    let state = this.state.state;

    if (!fName) {
      this.setState({
        fNameErrorMsg: "First name cannot be empty",
        fNameInvalid: true,
      });
      validInput = false;
    } else if (fName.length < 2) {
      this.setState({
        fNameErrorMsg: "First name needs to be 2 or more characters",
        fNameInvalid: true,
      });
      validInput = false;
    }

    if (!surname) {
      this.setState({
        surnameErrorMsg: "Surname cannot be empty",
        surnameInvalid: true,
      });
      validInput = false;
    } else if (surname.length < 2) {
      this.setState({
        surnameErrorMsg: "Surname needs to be 2 or more characters",
        surnameInvalid: true,
      });
      validInput = false;
    }

    if (!postcode) {
      this.setState({
        postcodeErrorMsg: "Postcode cannot be empty",
        postcodeInvalid: true,
      });
      validInput = false;
    } else if (postcode.length !== 4) {
      this.setState({
        postcodeErrorMsg: "Postcode need to be 4 numbers!",
        postcodeInvalid: true,
      });
      validInput = false;
    }

    if (!state) {
      this.setState({
        stateErrorMsg: "State cannot be empty",
        stateInvalid: true,
      });
      validInput = false;
    } else if (state.length < 3) {
      this.setState({
        stateErrorMsg: "Please enter a valid state name",
        stateInvalid: true,
      });
      validInput = false;
    }

    return validInput;
  };

  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      fNameInvalid: false,
      surnameInvalid: false,
      postcodeInvalid: false,
      stateInvalid: false
    });
  };

  render() {
    return (
      <div className="profileSetup">
        <Container className="wrapper">
          <Header.H3>Welcome!</Header.H3>
          <p> Since it's your first time here, we need some basic details from you to begin setting up your profile. You'll have to complete the full profile setup in 'My Profile'. Until you've filled out some more basic information about yourself such as a decsription and some experience, you won't appear in candidate searches.
              </p>
          <Container className="card">
            <Form>
              <Grid.Row>
                <Grid.Col md={10} offset={1}>
                  <Form.Group label="First Name" isRequired>
                    <Form.Input
                      name="firstName"
                      value={this.state.firstName}
                      onChange={this.onInputChange}
                      invalid={this.state.fNameInvalid} 
                      feedback={this.state.fNameErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col md={10} offset={1}>
                  <Form.Group label="Surname" isRequired>
                    <Form.Input
                      name="surname"
                      value={this.state.surname}
                      onChange={this.onInputChange}
                      invalid={this.state.surnameInvalid} 
                      feedback={this.state.surnameErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col md={5} offset={1}>
                  <Form.Group label="Postcode" isRequired>
                    <Form.Input
                      name="postcode"
                      value={this.state.postcode}
                      onChange={this.onInputChange}
                      invalid={this.state.postcodeInvalid} 
                      feedback={this.state.postcodeErrorMsg}
                      maxLength={4}
                    />
                  </Form.Group>
                </Grid.Col>

                <Grid.Col md={5}>
                  <Form.Group label="State" isRequired>
                    <Form.Input
                      name="state"
                      value={this.state.state}
                      onChange={this.onInputChange}
                      invalid={this.state.stateInvalid} 
                      feedback={this.state.stateErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>

              <Button animated onClick={this.handleSubmit}>
                <Button.Content type="submit" visible>
                  Let's go!
                </Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Form>
          </Container>
        </Container>
      </div>
    );
  }
}

export default Login;
