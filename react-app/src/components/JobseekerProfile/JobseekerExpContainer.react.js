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

      
      // End Month (Disabled if current role is ticked)
      isDisabled: false,
    };
  }

  componentDidMount() {
    fetch("https://run.mocky.io/v3/ae835888-7d45-43e3-a245-70a5fc104260")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.length)
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
    const data = new FormData(event.target);

    const jobinfo = {
      title: data.get('title'),
      company: data.get('company'),
      location: data.get('location'),
      startdate: data.get('startdate'),
      enddate: data.get('enddate'),
      desc: data.get('jobdesc'),
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

    console.log(event.target.value);
  };

  openModal = () => {
    this.setState({ open: true });
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

  render() {
    const {
      formtitle,
      formcompany,
      formstartdate,
      formenddate,
      formlocation,
      formdesc,
      open,
      isDisabled
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
      </div>
    );
  }
}

export default JobseekerExpContainer;
