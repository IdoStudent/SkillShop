import * as React from "react";
import { Card, Grid, Container } from "tabler-react";
import { Button, Modal, Icon } from "semantic-ui-react";
import Auth from "@aws-amplify/auth";
import "../../index.css";

class RemoveUser extends React.Component {
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
      userJobStartDate: [],
      userEducationStartDate: "",
      userEducationStartDate1: "",

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
  // get Job date iterate through each education date and add it to an array
  async getJobDate() {
    let email = Auth.user.attributes.email;
    await fetch(
      `https://wrdafek0o6.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` +
        email
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.Item !== undefined)
          console.log(result[0].userJobStartDate + "<-- jobstartDate1");
        for (var i = 0; i < result.length; i++) {
          this.setState({
            userJobStartDate: result[i].userJobStartDate,
          });
        }
      });
  }
  // get Edu date iterate through each education date and add it to an array
  async getEduDate() {
    let email = Auth.user.attributes.email;
    await fetch(
      `https://wrdafek0o6.execute-api.ap-southeast-2.amazonaws.com/prod/getedudate?userEmail=` +
        email
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.Item !== undefined)
          for (var i = 0; i < result.length; i++) {
            this.setState({
              userEducationStartDate: result[i].userEducationStartDate,
            });
          }
      });
  }
  // iterate through each job with email and date and delete from jobexperiance table
  deleteJob = async () => {
    console.log(this.state.userEducationStartDate0 + "job0");
    let email = Auth.user.attributes.email;
    for (var i = 0; i < this.state.userJobStartDate.length; i++) {
      fetch(
        `https://wrdafek0o6.execute-api.ap-southeast-2.amazonaws.com/prod/deletejob?userEmail=` +
          email +
          `&userJobStartDate=` +
          this.state.userJobStartDate
      );
    }
  };
  //  iterate through each edu with email and date and delete from educationexperiance table
  deleteEdu = async () => {
    let email = Auth.user.attributes.email;
    console.log(this.state.userEducationStartDate + `userEducationStartDate`);
    for (var i = 0; i < this.state.userEducationStartDate.length; i++) {
      fetch(
        `https://wrdafek0o6.execute-api.ap-southeast-2.amazonaws.com/prod/deleteedu?userEmail=` +
          email +
          `&userEducationStartDate=` +
          this.state.userEducationStartDate
      );
    }
  };
  // Delete from user table
  deleteUser = async () => {
    let email = Auth.user.attributes.email;
    fetch(
      `https://q32xq9hoif.execute-api.ap-southeast-2.amazonaws.com/prod/delete?userEmail=` +
        email
    );
  };

  async componentDidMount() {
    await this.getJobDate();
    await this.getEduDate();
  }

  handleSubmit = () => {
    this.deleteJob();
    this.deleteEdu();
    this.deleteUser();
    window.location.reload();
    this.setState((prevState) => ({
      open: false,
    }));
  };

  cancelForm = () => {
    // If cancelling, reset any fields that have been changed to the original values so that when the modal is re-opened, the old values are shown
    this.setState((prevState) => ({
      open: false,
    }));
  };
  openModal = () => {
    this.setState({ open: true });
  };

  render() {
    const { open } = this.state;

    return (
      <div className="card" name="generalInfo">
        <Card.Body>
          <Grid>
            <Grid.Row>
              <Grid.Col md={7}>
                <Card.Title>Delete my profile</Card.Title>
              </Grid.Col>
              <Grid.Col md={5}>
                {/* MODAL BUTTON */}
                <Button
                  floated="right"
                  basic
                  icon="trash"
                  type="button"
                  compact
                  onClick={this.openModal}
                />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row />
          </Grid>
        </Card.Body>

        {/* MODAL CONTENT */}
        <Modal
          style={{ position: "relative" }}
          closeOnDimmerClick={false}
          open={open}
        >
          <Modal.Header>Delete Profile</Modal.Header>
          <Modal.Content>
            <p>
              <b>Are you sure you want to delete your profile?</b>{" "}
            </p>
            <p>
              This will completely remove your user account from the system.
              This means that all your information, matches, and chat history
              will be <b>permanently</b> deleted. If you wish to access
              SkillShop again you will need to create a new account and start
              from scratch.{" "}
            </p>
            {Auth.user.attributes["custom:role"] == "employer" ? (
              <p>
                {" "}
                If your business wishes to continue using SkillShop's platform,
                we highly recommend that you transfer ownership of your account
                instead of deleting it.{" "}
              </p>
            ) : (
              <p />
            )}
            <p>Deleting your account is irreversible!</p>
          </Modal.Content>

          {/* ROW 4 - SUBMIT */}
          <Modal.Actions>
            <Container className="modalSubmit">
              <Grid.Row>
                <Grid.Col md={12}>
                  <Button
                    animated
                    className="acceptButton delete"
                    circular
                    onClick={this.handleSubmit}
                  >
                    <Button.Content visible>Delete</Button.Content>
                    <Button.Content hidden>
                      <Icon name="trash" />
                    </Button.Content>
                  </Button>
                  <Button
                    animated
                    className="cancelButton delete"
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

export default RemoveUser;
