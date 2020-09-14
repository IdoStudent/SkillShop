import * as React from "react";
import axios from "axios";

import { Card } from "tabler-react";

import { Button, Modal, Segment, Container, Icon } from "semantic-ui-react";
import { Form, Grid } from "tabler-react";

import JobseekerExp from "./JobseekerExp.react";

class JobseekerExpContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: [],

      formtitle: "",
      formcompany: "",
      formstartdate: "",
      formenddate: "",
      formlocation: "",
      formdesc: "",

      // Modal State
      open: false,

      // Current Role Checkbox
      isChecked: false,

      // Form Validation stuff
      titleInvalid: false,
      titleErrorMsg: "",

      companyInvalid: false,
      companyErrorMsg: "",

      startMonthInvalid: false,
      startMonthErrorMsg: "",

      endMonthInvalid: false,
      endMonthErrorMsg: "",

      descInvalid: false,
      descErrorMsg: "",
    };
  }

  componentDidMount() {
    fetch("https://run.mocky.io/v3/ae18d559-f975-494a-94ce-5334637f05d2")
      .then((res) => res.json())
      .then((result) => {
        for (var i = 0; i < result.length; i++) {
          this.setState({
            dataset: this.state.dataset.concat(
              <JobseekerExp key={i} jobinfo={result[i]} />
            ),
          });
        }
      });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    if (this.validateForm()) {
      const jobinfo = {
        title: this.state.formtitle,
        company: this.state.formcompany,
        location: this.state.formlocation,
        startdate: this.state.formstartdate,
        enddate: this.state.formenddate,
        desc: this.state.formdesc,
        current: this.state.isChecked,
      };

      // If role is current role, we don't need an end date so set this to a value that the JobseekerExp component knows to convert to "current"
      if (jobinfo.current === true) {
        jobinfo.enddate = "00/0000";
      }

      this.setState({
        dataset: this.state.dataset.concat(<JobseekerExp jobinfo={jobinfo} />),
        open: false,
      });
    }

    // TO-DO: ADD LOGIC FOR SENDING TO DATABASE
    try {
      const params = {
        userEmail: "placeholder2",
        userJobTitle: this.state.formtitle,
        userJobCompany: this.state.formcompany,
        userJobStartDate: this.state.formstartdate,
        userJobEndDate: this.state.formenddate,
        userJobLocation: this.state.formlocation,
        userJobDescription: this.state.formdesc,
      };
      axios.post(
        "https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata/jobexperience/",
        params
      );
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  validateForm = () => {
    let title = this.state.formtitle;
    let company = this.state.formcompany;
    let startdate = this.state.formstartdate;
    let enddate = this.state.formenddate;
    let desc = this.state.formdesc;

    this.setState({
      titleInvalid: false,
      companyInvalid: false,
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
        titleErrorMsg: "Job title cannot be empty",
        titleInvalid: true,
      });
      validInput = false;
    } else if (title.length < 3) {
      this.setState({
        titleErrorMsg: "Please enter a more descriptive job title",
        titleInvalid: true,
      });
      validInput = false;
    }

    // company
    if (!company) {
      this.setState({
        companyErrorMsg: "Company cannot be empty",
        companyInvalid: true,
      });
      validInput = false;
    }

    /* START DATE BLOCK START */

    if (startDateYear === currentYear) {
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
    if (startdate[0] === 1) {
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
      if (endDateYear === currentYear) {
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
      if (enddate[0] === 1) {
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
      if (startDateYear === endDateYear) {
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
        descErrorMsg: "Job description cannot be empty",
        descInvalid: true,
      });
      validInput = false;
    } else if (desc.length < 100) {
      this.setState({
        descErrorMsg:
          "Please enter a more descriptive job description (100+ characters)",
        descInvalid: true,
      });
      validInput = false;
    }

    // Return the status of valid input. If any of the above error conditions are met, this will return false
    return validInput;
  };

  cancelForm = () => {
    // If cancelling, reset any fields that have been changed to the original values so that when the modal is re-opened, the old values are shown
    this.setState((prevState) => ({
      formtitle: "",
      formcompany: "",
      formlocation: "",
      formstartdate: "",
      formenddate: "",
      formdesc: "",
      open: false,
      titleInvalid: false,
      companyInvalid: false,
      startMonthInvalid: false,
      endMonthInvalid: false,
      descInvalid: false,
    }));
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  openModal = () => {
    this.setState({ open: true });
  };

  handleCheckbox = () => {
    this.setState({
      isChecked: !this.state.isChecked,
      endMonthInvalid: false,
    });
  };

  render() {
    const {
      formtitle,
      formcompany,
      formstartdate,
      formenddate,
      formlocation,
      formdesc,
      open,
      isChecked,
    } = this.state;

    return (
      <div className="card" name="experience">
        <Card.Body>
          <Card.Title>Experience</Card.Title>
          {this.state.dataset}
          <Segment basic textAlign={"center"} size={"mini"}>
            <Button
              basic
              icon="plus"
              type="button"
              compact
              onClick={this.openModal}
            />
          </Segment>
        </Card.Body>

        {/* MODAL CONTENT */}
        <Modal
          style={{ position: "relative" }}
          closeOnDimmerClick={false}
          open={open}
        >
          <Modal.Header>Add new Experience Information</Modal.Header>
          <Modal.Content>
            <Form>
              <Grid.Row>
                <Grid.Col md={4}>
                  <Form.Group label="Job Title" isRequired>
                    <Form.Input
                      name="title"
                      value={formtitle}
                      onChange={this.handleChange("formtitle")}
                      invalid={this.state.titleInvalid}
                      feedback={this.state.titleErrorMsg}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={4}>
                  <Form.Group label="Company" isRequired>
                    <Form.Input
                      name="company"
                      value={formcompany}
                      onChange={this.handleChange("formcompany")}
                      invalid={this.state.companyInvalid}
                      feedback={this.state.companyErrorMsg}
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
                      checked={isChecked}
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
                  <Form.Group
                    className="mb=0"
                    label="Job Description"
                    isRequired
                  >
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

export default JobseekerExpContainer;
