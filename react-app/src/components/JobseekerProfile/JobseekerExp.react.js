// @flow

import * as React from "react";

import { Container, Divider, Header, Button, Modal } from "semantic-ui-react";
import { Form, Grid } from "tabler-react";

class JobseekerExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // States from API, default data values. Hardcoded for testing
      title: "test title",
      company: "test company",
      dates: "MAR 2016 - JAN 2020",
      location: "test location",
      desc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

      // States for editable form. Initial values set to the API data. Hardcoded for testing
      formtitle: "test title",
      formcompany: "test company",
      formdates: "MAR 2016 - JAN 2020",
      formlocation: "test location",
      formdesc:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",

      // Modal State
      open: false,
    };
  }

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });

    console.log(event.target.value);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    this.setState((prevState) => ({
      // If submitting new values, update the state to represent the new data
      title: prevState.formtitle,
      company: prevState.formcompany,
      location: prevState.formlocation,
      dates: prevState.formdates,
      desc: prevState.formdesc,
      open: false,
    }));

    // Send the submitted form data to the API
    /*fetch('API URL', {
      method: 'POST',
      body: data,
    });*/
  };

  cancelForm = () => {
    // If cancelling, reset any fields that have been changed to the original values so that when the modal is re-opened, the old values are shown
    this.setState((prevState) => ({
      formtitle: prevState.title,
      formcompany: prevState.company,
      formlocation: prevState.location,
      formdates: prevState.dates,
      formdesc: prevState.desc,
      open: false,
    }));
  };

  openModal = () => {
    this.setState({ open: true });
  };

  render() {
    const {
      title,
      company,
      dates,
      location,
      desc,
      formtitle,
      formcompany,
      formdates,
      formlocation,
      formdesc,
      open,
    } = this.state;

    return (
      <Container>
        <Grid padded>
          <Grid.Row>
            <Grid.Col md={7}>
              <Grid.Row>
                <Header size="small">{title}</Header>
              </Grid.Row>
              <Grid.Row>
                <Header size="small">{company}</Header>
              </Grid.Row>
              <Grid.Row>
                <br />
                <p>{desc}</p>
              </Grid.Row>
            </Grid.Col>
            <Grid.Col md={5}>
              <Grid.Row>
                <Container textAlign="right">
                  <Header size="small">{dates}</Header>
                </Container>
              </Grid.Row>
              <Grid.Row>
                <Container textAlign="right">
                  <Header size="small">{location}</Header>
                </Container>
              </Grid.Row>

              {/* MODAL BUTTON */}
              <Button
                floated="right"
                basic
                icon="pencil"
                type="button"
                onClick={this.openModal}
              />
            </Grid.Col>
          </Grid.Row>
        </Grid>

        <Divider />

        {/* MODAL CONTENT */}
        <Modal
          style={{ position: "relative" }}
          closeOnDimmerClick={false}
          open={open}
        >
          <Modal.Header>Edit Experience Info</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Grid.Row>
                <Grid.Col md={4}>
                  <Form.Group label="Job Title">
                    <Form.Input
                      name="firstname"
                      value={formtitle}
                      onChange={this.handleChange("formtitle")}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={4}>
                  <Form.Group label="Company">
                    <Form.Input
                      name="company"
                      value={formcompany}
                      onChange={this.handleChange("formcompany")}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={4}>
                  <Form.Group label="Location">
                    <Form.Input
                      name="location"
                      value={formlocation}
                      onChange={this.handleChange("formlocation")}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>

              {/* ROW 2 */}
              <Grid.Row>
              <Grid.Col md={3}>
                  <Form.Group label="Current Role">
                    <Form.Checkbox
                      label="I am currently in this role"
                      name="current"
                      // TO DO value=
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={3}>
                <Form.Group label="Starting Month">
                  <Form.MaskedInput
                    placeholder="00/0000"
                    mask={[
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />
                </Form.Group>
                </Grid.Col>
                <Grid.Col md={3}>
                <Form.Group label="End Month">
                  <Form.MaskedInput
                    placeholder="00/0000"
                    mask={[
                      /\d/,
                      /\d/,
                      "/",
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />
                </Form.Group>
                </Grid.Col>
              </Grid.Row>

              {/* ROW 3 */}
              <Grid.Row>
                <Grid.Col md={12}>
                  <Form.Group className="mb=0" label="Job Description">
                    <Form.Textarea
                      name="jobdesc"
                      rows={3}
                      value={formdesc}
                      onChange={this.handleChange("formdesc")}
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
      </Container>
    );
  }
}

export default JobseekerExp;
