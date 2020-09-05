import * as React from "react";
import axios from "axios";
import { Form, Card, Grid } from "tabler-react";
import { Button, Modal } from "semantic-ui-react";
import Auth from '@aws-amplify/auth';

import '../../index.css';

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
    };
  }

  getFirstApi() {
    return Auth.currentAuthenticatedUser().then((user) => {
       this.setState({email: user.attributes.email, formemail: user.attributes.email})
     });
  }

 //${encodeURIComponent(data.foo)}
   getSecondApi(email) {
     fetch(`https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?foo=${encodeURIComponent(email)}`)
       .then(res => res.json())
       .then(
         console.log("THIS IS RESULT2 " + email),
         (result) => {
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
           console.log("THIS IS RESULT1 " + result)} ,
       )
   }

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    this.setState((prevState) => ({
      // If submitting new values, update the state to represent the new data
      firstname: prevState.formfirstname,
      middlename: prevState.formmiddlename,
      surname: prevState.formsurname,
      city: prevState.formcity,
      postcode: prevState.formpostcode,
      userState: prevState.formstate,
      about: prevState.formabout,
      open: false,
      
    }))
    try {
      const params = {
        "userEmail": "shaahin@gmail.com",
        "userFirstName": this.state.formfirstname,
        "userMiddleName": this.state.formmiddlename,
        "userLastName": this.state.formsurname,
        "userCity": this.state.formcity,
        "userPostCode": this.state.formpostcode,
        "userState": this.state.formstate,
        "userAbout": this.state.formabout,
        "userType": "jobseeker"
      };
      await axios.post('https://qrg3idkox4.execute-api.ap-southeast-2.amazonaws.com/prod/{userEmail}/', params);
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
  }
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
                  <Form.Input name="firstname" readOnly value={firstname} />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={4}>
                <Form.Group label="Middle Name">
                  <Form.Input name="middlename" readOnly value={middlename} />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={4}>
                <Form.Group label="Surname">
                  <Form.Input name="surname" readOnly value={surname} />
                </Form.Group>
              </Grid.Col>

              {/* ROW 2 */}
              <Grid.Col md={3}>
                <Form.Group label="City">
                  <Form.Input name="city" readOnly value={city} />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={2}>
                <Form.Group label="Post Code">
                  <Form.Input name="postcode" readOnly value={postcode} />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={3}>
                <Form.Group label="State">
                  <Form.Input name="state" readOnly value={state} />
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
          <Modal.Header>Edit Info</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Grid.Row>
                <Grid.Col md={4}>
                  <Form.Group label="First Name">
                    <Form.Input
                      name="firstname"
                      value={formfirstname}
                      onChange={this.handleChange("formfirstname")}
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
                  <Form.Group label="Surname">
                    <Form.Input
                      name="surname"
                      value={formsurname}
                      onChange={this.handleChange("formsurname")}
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
                  <Form.Group label="Post Code">
                    <Form.Input
                      name="postcode"
                      value={formpostcode}
                      onChange={this.handleChange("formpostcode")}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={3}>
                  <Form.Group label="State">
                    <Form.Input
                      name="state"
                      value={formstate}
                      onChange={this.handleChange("formstate")}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>

              {/* ROW 3 */}
              <Grid.Row>
                <Grid.Col md={12}>
                  <Form.Group className="mb=0" label="About Me">
                    <Form.Textarea
                      name="aboutme"
                      rows={3}
                      value={formabout}
                      onChange={this.handleChange("formabout")}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>

              {/* ROW 4 - SUBMIT */}
              <Grid.Row>
                <Grid.Col md={12}>
                  <Button
                    floated="left"
                    basic
                    type="button"
                    color="red"
                    onClick={this.cancelForm}
                  >
                    {" "}
                    Cancel{" "}
                  </Button>
                  <Button floated="right" basic type="submit" color="green">
                    {" "}
                    Accept Changes{" "}
                  </Button>
                </Grid.Col>
              </Grid.Row>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default GeneralInformation;
