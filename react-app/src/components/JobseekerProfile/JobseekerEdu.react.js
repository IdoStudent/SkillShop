// @flow

import * as React from "react";
import axios from "axios";
import { Container, Divider, Header, Button, Modal } from "semantic-ui-react";
import { Form, Grid } from "tabler-react";

class JobseekerEdu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // States from API, default data values. Hardcoded for testing
      title: props.eduinfo.title,
      institution: props.eduinfo.institution,
      startdate: props.eduinfo.startdate,
      enddate: props.eduinfo.enddate,
      location: props.eduinfo.location,
      desc: props.eduinfo.desc,
      current: props.eduinfo.current,

      // States for editable form. Initial values set to the API data. Hardcoded for testing
      formtitle: props.eduinfo.title,
      forminstitution: props.eduinfo.institution,
      formstartdate: props.eduinfo.startdate,
      formenddate: props.eduinfo.enddate,
      formlocation: props.eduinfo.location,
      formdesc: props.eduinfo.desc,

      displaystart: "",
      displayend: "",

      // Modal State
      open: false,

      // Current Role Checkbox
      isChecked: props.eduinfo.current
    };
  }

  componentDidMount() {
    this.convertDate();
  }

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  handleCheckbox = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
      });
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
    if (displayYearStart[0] === "/") {
      displayYearStart =
        displayYearStart[1] +
        displayYearStart[2] +
        displayYearStart[3] +
        displayYearStart[4];
    }

    // IF THE MONTH NUMBER STARTS WITH A 0, REMOVE IT SO THE ARRAY CAN BE PROPERLY INDEXED
    if (displayDateStart[0] === "0") {
      displayDateStart = displayDateStart[1];
    }

    displayDateStart = months[displayDateStart - 1];

    // END DATE
    var displayDateEnd = this.state.enddate.substring(0, 2);
    var displayYearEnd = this.state.enddate.substring(2, 7);

    // IF displayDateEnd (THE MONTH) = 00 (or of for some reason it was stored incorrectly, check if current === true) IT MEANS THE ROLE IS CURRENT, SO DISPLAY THOSE WORDS INSTEAD
    if(displayDateEnd === "00" || this.state.current === true){
      this.setState(() => ({
        displaystart: displayDateStart + " " + displayYearStart,
        displayend: "CURRENT",
      }));
    } else {
      // IF THERE IS A SLASH (FROM FORM INPUT), REMOVE IT
      if (displayYearEnd[0] === "/") {
        displayYearEnd =
          displayYearEnd[1] +
          displayYearEnd[2] +
          displayYearEnd[3] +
          displayYearEnd[4];
      }

      if (displayDateEnd[0] === "0") {
        displayDateEnd = displayDateEnd[1];
      }

      displayDateEnd = months[displayDateEnd - 1];

      this.setState(() => ({
        displaystart: displayDateStart + " " + displayYearStart,
        displayend: displayDateEnd + " " + displayYearEnd,
      }));
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      title: prevState.formtitle,
      institution: prevState.forminstitution,
      location: prevState.formlocation,
      startdate: prevState.formstartdate,
      enddate: prevState.formenddate,
      desc: prevState.formdesc,
      open: false,
      current: prevState.isChecked,
    }), () => {                              
      // Convert the date once state has updated (for front-end display purposes)
      this.convertDate()
    });

    // If role is current role, we don't need an end date so set this to default value for database storarge
    if(this.state.isChecked){
      this.setState({
        // For database
        enddate: "00/0000",

        // For immediate display on front-end
        formenddate: "00/0000"
      }, () => {          
        // Send the data to the database once the date value has been resolved                    
        this.sendData()
      });
    } else {
      this.setState(prevState => ({
        enddate: prevState.formenddate
      }), () => {                              
        // Send the data to the database once the date value has been resolved
        this.sendData()
      });
    }
  };

  sendData = () => {
    const data = [
      this.state.title, 
      this.state.institution,
      this.state.location,
      this.state.startdate,
      this.state.enddate,
      this.state.desc,
      this.state.current
    ]

    //API functionality
    try {
      const params = {
        
        "userEmail": "placeholder",
        "userEducationTitle": this.state.title,
        "userEducationInstitution": this.state.institution,
        "userEducationStartDate": this.state.startdate,
        "userEducationEndDate": this.state.enddate,
        "userEducationLocation": this.state.location,
        "userEducationDescription": this.state.desc
      };
      axios.post('https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata/education/', params);
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  cancelForm = () => {
    // If cancelling, reset any fields that have been changed to the original values so that when the modal is re-opened, the old values are shown
    this.setState((prevState) => ({
      formtitle: prevState.title,
      forminstitution: prevState.institution,
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
      institution,
      displaystart,
      displayend,
      location,
      desc,
      formtitle,
      forminstitution,
      formstartdate,
      formenddate,
      formlocation,
      formdesc,
      open,
      isChecked,
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
                <Header size="small">{institution}</Header>
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
                  <Form.Group label="Institution">
                    <Form.Input
                      name="institution"
                      value={forminstitution}
                      onChange={this.handleChange("forminstitution")}
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
                  <Form.Group label="Current Study">
                    <Form.Checkbox
                      label="I am currently studying"
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
                      disabled={isChecked}
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

export default JobseekerEdu;
