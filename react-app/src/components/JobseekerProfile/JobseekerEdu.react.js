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
      isChecked: props.eduinfo.current,
      
      // Form Validation stuff
      titleInvalid: false,
      titleErrorMsg: "",

      institutionInvalid: false,
      institutionErrorMsg: "",

      startMonthInvalid: false,
      startMonthErrorMsg: "",

      endMonthInvalid: false,
      endMonthErrorMsg: "",

      descInvalid: false,
      descErrorMsg: "",
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
        endMonthInvalid: false,
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

    if (this.validateForm()) {
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
  }
  };

  validateForm = () => {
    let title = this.state.formtitle;
    let institution = this.state.forminstitution;
    let startdate = this.state.formstartdate;
    let enddate = this.state.formenddate;
    let desc = this.state.formdesc;

    this.setState({
      titleInvalid: false,
      institutionInvalid: false,
      startMonthInvalid: false,
      endMonthInvalid: false,
      descInvalid: false,
    });

    let validInput = true;

    // Get the current month and year so we can compare the input
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;
    currentMonth = ("0" + currentMonth).slice(-2);

    // Seperate the date inputs in month / year for comparison
    var startDateMonth = startdate.substring(0, 2);
    var startDateYear = startdate.substring(2, 7);
    if (startDateYear[0] === "/") {
      startDateYear =
        startDateYear[1] +
        startDateYear[2] +
        startDateYear[3] +
        startDateYear[4];
    }

    if (!this.state.isChecked) {
      var endDateMonth = enddate.substring(0, 2);
      var endDateYear = enddate.substring(2, 7);
      if (endDateYear[0] === "/") {
        endDateYear =
          endDateYear[1] + endDateYear[2] + endDateYear[3] + endDateYear[4];
      }
    }

    // title
    if (!title) {
      this.setState({
        titleErrorMsg: "Title cannot be empty",
        titleInvalid: true,
      });
      validInput = false;
    } else if (title.length < 3) {
      this.setState({
        titleErrorMsg: "Please enter a more descriptive title",
        titleInvalid: true,
      });
      validInput = false;
    }

    // // institution
    // if (!institution) {
    //   this.setState({
    //     institutionErrorMsg: "Institution cannot be empty",
    //     institutionInvalid: true,
    //   });
    //   validInput = false;
    // }

    /* START DATE BLOCK START */

    if (startDateYear == currentYear) {
      if (startDateMonth > currentMonth) {
        this.setState({
          startMonthErrorMsg: "Month cannot be in the future!",
          startMonthInvalid: true,
        });
        validInput = false;
      }
    } else if (startDateYear > currentYear) {
      this.setState({
        startMonthErrorMsg: "Year cannot be in the future!",
        startMonthInvalid: true,
      });
      validInput = false;
    }
    // IF THE MONTH DOES NOT START WITH 0 OR 1, IT IS INVALID
    if (startdate[0] > 1) {
      this.setState({
        startMonthErrorMsg: "Please enter a valid month",
        startMonthInvalid: true,
      });
      validInput = false;
    }
    // IF THE MONTH STARTS WITH 1, CHECK THAT THE SECOND VALUE IS NOT > 2, OTHERWISE THAT IS INVALID
    if (startdate[0] == 1) {
      if (startdate[1] > 2) {
        this.setState({
          startMonthErrorMsg: "Please enter a valid month",
          startMonthInvalid: true,
        });
        validInput = false;
      }
    }
    if (!startdate) {
      this.setState({
        startMonthErrorMsg: "Date cannot be empty",
        startMonthInvalid: true,
      });
      validInput = false;
    }
    // IF DATE INCLUDES _ IT MEANS THE WHOLE DATE HAS NOT BEEN FILLED OUT
    if (startdate.includes("_")) {
      this.setState({
        startMonthErrorMsg: "Please fill out the full date",
        startMonthInvalid: true,
      });
      validInput = false;
    }
    /* START DATE BLOCK END */

    /* END DATE BLOCK START */
    if (!this.state.isChecked) {
      if (endDateYear == currentYear) {
        if (endDateMonth > currentMonth) {
          this.setState({
            endMonthErrorMsg: "Month cannot be in the future!",
            startMonthInvalid: true,
          });
          validInput = false;
        }
      } else if (endDateYear > currentYear) {
        this.setState({
          endMonthErrorMsg: "Year cannot be in the future!",
          endMonthInvalid: true,
        });
        validInput = false;
      }
      // IF THE MONTH DOES NOT START WITH 0 OR 1, IT IS INVALID
      if (enddate[0] > 1) {
        this.setState({
          endMonthErrorMsg: "Please enter a valid month",
          endMonthInvalid: true,
        });
        validInput = false;
      }
      // IF THE MONTH STARTS WITH 1, CHECK THAT THE SECOND VALUE IS NOT > 2, OTHERWISE THAT IS INVALID
      if (enddate[0] == 1) {
        if (enddate[1] > 2) {
          this.setState({
            endMonthErrorMsg: "Please enter a valid month",
            endMonthInvalid: true,
          });
          validInput = false;
        }
      }
      if (!enddate) {
        this.setState({
          endMonthErrorMsg: "Date cannot be empty",
          endMonthInvalid: true,
        });
        validInput = false;
      }
      // IF DATE INCLUDES _ IT MEANS THE WHOLE DATE HAS NOT BEEN FILLED OUT
      if (enddate.includes("_")) {
        this.setState({
          endMonthErrorMsg: "Please fill out the full date",
          endMonthInvalid: true,
        });
        validInput = false;
      }
      // IF THE YEARS ARE THE SAME, MAKE SURE THE START MONTH IS BEFORE THE END MONTH
      if (startDateYear == endDateYear) {
        if (startDateMonth >= endDateMonth) {
          this.setState({
            endMonthErrorMsg: "End date must be after start date",
            endMonthInvalid: true,
          });
          validInput = false;
        }
      }
      // IF THE START YEAR IS BEFORE THE END YEAR
      if (startDateYear > endDateYear) {
        this.setState({
          endMonthErrorMsg: "End date must be after start date",
          endMonthInvalid: true,
        });
        validInput = false;
      }
    }
    /* END DATE BLOCK END */

    // desc
    if (!desc) {
      this.setState({
        descErrorMsg: "Description cannot be empty",
        descInvalid: true,
      });
      validInput = false;
    } else if (desc.length < 50) {
      this.setState({
        descErrorMsg:
          "Please enter a more descriptive description (50+ characters)",
        descInvalid: true,
      });
      validInput = false;
    }

    // Return the status of valid input. If any of the above error conditions are met, this will return false
    return validInput;
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
        
        "userEmail": "placeholder2",
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
      titleInvalid: false,
      institutionInvalid: false,
      startMonthInvalid: false,
      endMonthInvalid: false,
      descInvalid: false,
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
          <Modal.Header>Edit Education Info</Modal.Header>
          <Modal.Content>
            <Form>
              <Grid.Row>
                <Grid.Col md={4}>
                  <Form.Group label="Job Title" isRequired>
                    <Form.Input
                      name="firstname"
                      value={formtitle}
                      onChange={this.handleChange("formtitle")}
                      invalid={this.state.titleInvalid}
                      feedback={this.state.titleErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={4}>
                  <Form.Group label="Institution" isRequired>
                    <Form.Input
                      name="institution"
                      value={forminstitution}
                      onChange={this.handleChange("forminstitution")}
                      invalid={this.state.institutionInvalid}
                      feedback={this.state.institutionErrorMsg}
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
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={3}>
                  <Form.Group label="Starting Month" isRequired>
                    <Form.MaskedInput
                      placeholder="00/0000"
                      name="startdate"
                      mask={[/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                      value={formstartdate}
                      onChange={this.handleChange("formstartdate")}
                      invalid={this.state.startMonthInvalid}
                      feedback={this.state.startMonthErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={3}>
                  <Form.Group label="End Month" isRequired={!isChecked}>
                    <Form.MaskedInput
                      placeholder="00/0000"
                      name="enddate"
                      mask={[/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                      value={formenddate}
                      onChange={this.handleChange("formenddate")}
                      disabled={isChecked}
                      invalid={this.state.endMonthInvalid}
                      feedback={this.state.endMonthErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
              </Grid.Row>

              {/* ROW 3 */}
              <Grid.Row>
                <Grid.Col md={12}>
                  <Form.Group className="mb=0" label="Job Description" isRequired>
                    <Form.Textarea
                      name="jobdesc"
                      rows={3}
                      value={formdesc}
                      onChange={this.handleChange("formdesc")}
                      invalid={this.state.descInvalid}
                      feedback={this.state.descErrorMsg}
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
                  <Button floated="right" basic type="button" color="green" onClick={this.handleSubmit}>
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
