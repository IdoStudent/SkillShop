import * as React from "react";

import { Card } from "tabler-react";

import { Button, Modal, Segment } from "semantic-ui-react";
import { Form, Grid } from "tabler-react";

import JobseekerExp from "./JobseekerExp.react";

class JobseekerExpContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      dataset: [ ],

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
    };
  }

  componentDidMount() {
    fetch("https://run.mocky.io/v3/ae18d559-f975-494a-94ce-5334637f05d2")
      .then(res => res.json())
      .then(
        (result) => {
          for(var i = 0; i < result.length; i++) {
            this.setState({
              dataset: this.state.dataset.concat(<JobseekerExp jobinfo={result[i]} />),
            });
          }
        },
      )
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const jobinfo = {
      title: this.state.formtitle,
      company: this.state.formcompany,
      location: this.state.formlocation,
      startdate: this.state.formstartdate,
      enddate: this.state.formenddate,
      desc: this.state.formdesc,
      current: this.state.isChecked
    }
    
    // If role is current role, we don't need an end date so set this to a value that the JobseekerExp component knows to convert to "current"
    if(jobinfo.current == true){
      jobinfo.enddate = "00/0000"
    }

    this.setState({
      dataset: this.state.dataset.concat(<JobseekerExp jobinfo={jobinfo}/>),
      open: false
    });

    // ALSO NEED TO ADD LOGIC FOR SENDING TO DATABASE
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
    }));
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  openModal = () => {
    this.setState({ open: true });
  };

  handleCheckbox = () => {
    this.setState(
      {
        isChecked: !this.state.isChecked,
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
      isChecked
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
          <Modal.Header>Edit Experience Info</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Grid.Row>
                <Grid.Col md={4}>
                  <Form.Group label="Job Title">
                    <Form.Input
                      name="title"
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
                      mask={[/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                      name="startdate"
                      value={formstartdate}
                      onChange={this.handleChange("formstartdate")}
                    />
                  </Form.Group>
                </Grid.Col>
                <Grid.Col md={3}>
                  <Form.Group label="End Month">
                    <Form.MaskedInput
                      placeholder="00/0000"
                      mask={[/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                      name="enddate"
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
      </div>
    );
  }
}

export default JobseekerExpContainer;
