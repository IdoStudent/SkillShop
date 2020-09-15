import * as React from "react";
import axios from "axios";
import { Form, Card, Grid } from "tabler-react";
import { Button, Modal, Icon, Container } from "semantic-ui-react";
import Auth from "@aws-amplify/auth";

import "../../index.css";

//const config = require('../config.json');

class GeneralInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // States from API
      firstname: "",
      middlename: "",
      surname: "",
      city: "",
      postcode: "",
      state: "",
      email: "",
      about: "",

      // States for editable form
      formfirstname: "",
      formmiddlename: "",
      formsurname: "",
      formcity: "",
      formpostcode: "",
      formstate: "",
      formabout: "",

      // Modal State
      open: false,

      // Form Validation stuff
      fNameInvalid: false,
      fNameErrorMsg: "",

      surnameInvalid: false,
      surnameErrorMsg: "",

      postcodeInvalid: false,
      postcodeErrorMsg: "",

      stateInvalid: false,
      stateErrorMsg: "",

      aboutInvalid: false,
      aboutErrorMsg: "",
    };
  }
  // GET email for getSecondApi
  getEmailApi() {
    return Auth.currentAuthenticatedUser().then((user) => {
      const { attributes = {} } = user;
      let email =  attributes['email']
      return email
    })}
  // GET email for form
  getFirstApi() {
    return Auth.currentAuthenticatedUser().then((user) => {
      this.setState({
        email: user.attributes.email,
        formemail: user.attributes.email,
      });
    });
  }
  // GET user data
  async getSecondApi(email) {
    fetch(
      `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +
        email )
      .then((res) => res.json())
      .then((result) => {
        if (result.Item !== undefined)
        // If length is undefined, that means for some reason it's not returning data at all, so dont try and access fields that dont exist
          this.setState({
            firstname: result.Item.userFirstName,
            middlename: result.Item.userMiddleName,
            surname: result.Item.userLastName,
            city: result.Item.userCity,
            postcode: result.Item.userPostcode,
            state: result.Item.userState,
            about: result.Item.userAbout,

            formfirstname: result.Item.userFirstName,
            formmiddlename: result.Item.userMiddleName,
            formsurname: result.Item.userLastName,
            formcity: result.Item.userCity,
            formpostcode: result.postcode,
            formstate: result.Item.userState,
            formabout: result.Item.userAbout,        
          });
          console.log() },
      )
  }
  // pass before mount
  BeforeDidMount() {
    this.getEmailApi().then((email) => this.getSecondApi(email));
  }

  componentDidMount() {
    this.BeforeDidMount();
    this.getFirstApi();
  }

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmit = async (event, email) => {
    event.preventDefault();

    if (this.validateForm()) {
      this.setState((prevState) => ({
        // If submitting new values, update the state to represent the new data
        firstname: prevState.formfirstname,
        middlename: prevState.formmiddlename,
        surname: prevState.formsurname,
        city: prevState.formcity,
        postcode: prevState.formpostcode,
        email: this.state.formemail,
        state: prevState.formstate,
        about: prevState.formabout,
        open: false,
      }));

      try {
        const params = {
          userEmail: this.state.formemail,
          userFirstName: this.state.formfirstname,
          userMiddleName: this.state.formmiddlename,
          userLastName: this.state.formsurname,
          userCity: this.state.formcity,
          userPostCode: this.state.formpostcode,
          userState: this.state.formstate,
          userAbout: this.state.formabout,
          userType: "jobseeker",
        };

        await axios.post(
          "https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata",
          params
        );
        console.log(`EMAIL:  ` + this.state.formemail);
      } catch (err) {
        console.log(`An error has occurred: ${err}`);
      }
    }
  };

  validateForm = () => {
    let fName = this.state.formfirstname;
    let surname = this.state.formsurname;
    let postcode = this.state.formpostcode;
    let state = this.state.formstate;
    let about = this.state.formabout;

    this.setState({
      fNameInvalid: false,
      surnameInvalid: false,
      postcodeInvalid: false,
      stateInvalid: false,
      aboutInvalid: false,
    });

    let validInput = true;

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

    if (!about) {
      this.setState({
        aboutErrorMsg: "Description cannot be empty",
        aboutInvalid: true,
      });
      validInput = false;
    } else if (about.length < 100) {
      this.setState({
        aboutErrorMsg: "Tell us more about you! (100+ characters)",
        aboutInvalid: true,
      });
      validInput = false;
    }

    // Return the status of valid input. If any of the above error conditions are met, this will return false
    return validInput;
  };

  cancelForm = () => {
    // If cancelling, reset any fields that have been changed to the original values so that when the modal is re-opened, the old values are shown
    this.setState((prevState) => ({
      formfirstname: prevState.firstname,
      formmiddlename: prevState.middlename,
      formsurname: prevState.surname,
      formcity: prevState.city,
      formpostcode: prevState.postcode,
      formstate: prevState.state,
      formabout: prevState.about,
      open: false,

      fNameInvalid: false,
      surnameInvalid: false,
      postcodeInvalid: false,
      stateInvalid: false,
      aboutInvalid: false,
    }));
  };

  openModal = () => {
    this.setState({ open: true });
  };

  render() {
    const {
      firstname,
      middlename,
      surname,
      city,
      postcode,
      state,
      email,
      about,
      formfirstname,
      formmiddlename,
      formsurname,
      formcity,
      formpostcode,
      formstate,
      formabout,
      open,
    } = this.state;

    return (
      <div className="card" name="generalInfo">
        <Card.Body>
          <Grid>
            <Grid.Row>
              <Grid.Col md={7}>
                <Card.Title>General Information</Card.Title>
              </Grid.Col>
              <Grid.Col md={5}>
                {/* MODAL BUTTON */}
                <Button
                  floated="right"
                  basic
                  icon="pencil"
                  type="button"
                  compact
                  onClick={this.openModal}
                />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              {/* ROW 1 */}
              <Grid.Col md={4}>
                <Form.Group label="First Name">
                  <Form.Input name="firstname" disabled value={firstname} />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={4}>
                <Form.Group label="Middle Name">
                  <Form.Input name="middlename" disabled value={middlename} />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={4}>
                <Form.Group label="Surname">
                  <Form.Input name="surname" disabled value={surname} />
                </Form.Group>
              </Grid.Col>

              {/* ROW 2 */}
              <Grid.Col md={3}>
                <Form.Group label="City">
                  <Form.Input name="city" disabled value={city} />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={2}>
                <Form.Group label="Post Code">
                  <Form.Input name="postcode" disabled value={postcode} />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={3}>
                <Form.Group label="State">
                  <Form.Input name="state" disabled value={state} />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={4}>
                <Form.Group label="Email">
                  <Form.Input name="email" disabled value={email} />
                </Form.Group>
              </Grid.Col>

              {/* ROW 3 */}
              <Grid.Col md={12}>
                <Form.Group className="mb=0" label="About Me">
                  <Form.Textarea
                    name="aboutme"
                    rows={3}
                    disabled
                    readOnly
                    value={about}
                  />
                </Form.Group>
              </Grid.Col>
            </Grid.Row>
          </Grid>
        </Card.Body>

        {/* MODAL CONTENT */}
        <Modal
          style={{ position: "relative" }}
          closeOnDimmerClick={false}
          open={open}
        >
          <Modal.Header>Editing General Information</Modal.Header>
          <Modal.Content>
            <Form>
              <Grid.Row>
                <Grid.Col md={4}>
                  <Form.Group label="First Name" isRequired>
                    <Form.Input
                      name="firstname"
                      value={formfirstname}
                      onChange={this.handleChange("formfirstname")}
                      invalid={this.state.fNameInvalid}
                      feedback={this.state.fNameErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={4}>
                  <Form.Group label="Middle Name">
                    <Form.Input
                      name="middlename"
                      value={formmiddlename}
                      onChange={this.handleChange("formmiddlename")}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={4}>
                  <Form.Group label="Surname" isRequired>
                    <Form.Input
                      name="surname"
                      value={formsurname}
                      onChange={this.handleChange("formsurname")}
                      invalid={this.state.surnameInvalid}
                      feedback={this.state.surnameErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>

              {/* ROW 2 */}
              <Grid.Row>
                <Grid.Col md={3}>
                  <Form.Group label="City">
                    <Form.Input
                      name="city"
                      value={formcity}
                      onChange={this.handleChange("formcity")}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={2}>
                  <Form.Group label="Post Code" isRequired>
                    <Form.Input
                      name="postcode"
                      value={formpostcode}
                      onChange={this.handleChange("formpostcode")}
                      invalid={this.state.postcodeInvalid}
                      feedback={this.state.postcodeErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={3}>
                  <Form.Group label="State" isRequired>
                    <Form.Input
                      name="state"
                      value={formstate}
                      onChange={this.handleChange("formstate")}
                      invalid={this.state.stateInvalid}
                      feedback={this.state.stateErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>

              {/* ROW 3 */}
              <Grid.Row>
                <Grid.Col md={12}>
                  <Form.Group className="mb=0" label="About Me" isRequired>
                    <Form.Textarea
                      name="aboutme"
                      rows={3}
                      value={formabout}
                      onChange={this.handleChange("formabout")}
                      invalid={this.state.aboutInvalid}
                      feedback={this.state.aboutErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>
            </Form>
          </Modal.Content>

          {/* ROW 4 - SUBMIT */}
          <Modal.Actions>
            <Container className="modalSubmit">
              <Grid.Row>
                <Grid.Col md={12}>
                  <Button
                    animated
                    className="acceptButton"
                    circular
                    onClick={this.handleSubmit}
                  >
                    <Button.Content visible>Accept</Button.Content>
                    <Button.Content hidden>
                      <Icon name="check" />
                    </Button.Content>
                  </Button>
                  <Button
                    animated
                    className="cancelButton"
                    circular
                    onClick={this.cancelForm}
                  >
                    <Button.Content visible>Cancel</Button.Content>
                    <Button.Content hidden>
                      <Icon name="x" />
                    </Button.Content>
                  </Button>
                </Grid.Col>
              </Grid.Row>
            </Container>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default GeneralInformation;
