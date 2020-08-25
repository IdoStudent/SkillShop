// @flow

import * as React from "react";

import { Container, Divider, Header, Button, Modal } from "semantic-ui-react";
import { Form, Grid } from "tabler-react";

class JobseekerExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // States from API, default data values. Hardcoded for testing
      title: props.jobinfo.title,
      company: props.jobinfo.company,
      startdate: props.jobinfo.startdate,
      enddate: props.jobinfo.enddate,
      location: props.jobinfo.location,
      desc: props.jobinfo.desc,

      // States for editable form. Initial values set to the API data. Hardcoded for testing
      formtitle: props.jobinfo.title,
      formcompany: props.jobinfo.company,
      formstartdate: props.jobinfo.startdate,
      formenddate: props.jobinfo.enddate,
      formlocation: props.jobinfo.location,
      formdesc: props.jobinfo.desc,

      displaystart: "",
      displayend: "",

      // Modal State
      open: false,

      // Current Role Checkbox
      isChecked: false,

      // End Month (Disabled if current role is ticked)
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.convertDate();
  }

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });

    console.log(event.target.value);
  };

  handleCheckbox = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
      },
      this.disableDateField
    );
  };

  disableDateField = () => {
    if (this.state.isChecked) {
      this.setState({
        isDisabled: true,
      });
    } else {
      this.setState({
        isDisabled: false,
      });
    }
  };

  convertDate = () => {
    var months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];

    // START DATE
    var displayDateStart = this.state.startdate.substring(0, 2);
    var displayYearStart = this.state.startdate.substring(2, 7);

    // IF THERE IS A SLASH (FROM FORM INPUT), REMOVE IT SO IT WILL NOT DISPLAY
    if (displayYearStart[0] == "/") {
      displayYearStart =
        displayYearStart[1] +
        displayYearStart[2] +
        displayYearStart[3] +
        displayYearStart[4];
    }

    // IF THE MONTH NUMBER STARTS WITH A 0, REMOVE IT SO THE ARRAY CAN BE PROPERLY INDEXED
    if (displayDateStart[0] == 0) {
      displayDateStart = displayDateStart[1];
    }

    displayDateStart = months[displayDateStart - 1];

    // END DATE
    var displayDateEnd = this.state.enddate.substring(0, 2);
    var displayYearEnd = this.state.enddate.substring(2, 7);

    // IF THERE IS A SLASH (FROM FORM INPUT), REMOVE IT
    if (displayYearEnd[0] == "/") {
      displayYearEnd =
        displayYearEnd[1] +
        displayYearEnd[2] +
        displayYearEnd[3] +
        displayYearEnd[4];
    }

    if (displayDateEnd[0] == 0) {
      displayDateEnd = displayDateEnd[1];
    }

    displayDateEnd = months[displayDateEnd - 1];

    this.setState(() => ({
      displaystart: displayDateStart + " " + displayYearStart,
      displayend: displayDateEnd + " " + displayYearEnd,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    console.log(this.state.title);

    this.setState(
      (prevState) => ({
        // If submitting new values, update the state to represent the new data
        title: prevState.formtitle,
        company: prevState.formcompany,
        location: prevState.formlocation,
        startdate: prevState.formstartdate,
        enddate: prevState.formenddate,
        desc: prevState.formdesc,
        open: false,
      }),
      this.convertDate
    );

    console.log(this.state.title);

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
      formstartdate: prevState.startdate,
      formenddate: prevState.enddate,
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
      displaystart,
      displayend,
      location,
      desc,
      formtitle,
      formcompany,
      formstartdate,
      formenddate,
      formlocation,
      formdesc,
      open,
      isDisabled,
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
            <Grid.Col md={4}>
              <Grid.Row>
                <Container textAlign="right">
                  <Header size="small">
                    {displaystart} - {displayend}
                  </Header>
                </Container>
              </Grid.Row>
              <Grid.Row>
                <Container textAlign="right">
                  <Header size="small">{location}</Header>
                </Container>
              </Grid.Row>
            </Grid.Col>
            <Grid.Col md={1}>
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
                      checked="true"
                      checked={this.state.isChecked}
                      onChange={this.handleCheckbox}
                      // TO DO value=
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={3}>
                  <Form.Group label="Starting Month">
                    <Form.MaskedInput
                      placeholder="00/0000"
                      name="startdate"
                      mask={[/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                      value={formstartdate}
                      onChange={this.handleChange("formstartdate")}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={3}>
                  <Form.Group label="End Month">
                    <Form.MaskedInput
                      placeholder="00/0000"
                      name="enddate"
                      mask={[/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                      value={formenddate}
                      onChange={this.handleChange("formenddate")}
                      disabled={isDisabled}
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
