// @flow

import * as React from "react";

import { Container, Button, Modal, Icon } from "semantic-ui-react";
import { Form, Grid } from "tabler-react";

class JobEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.data.jobTitle,
      location: props.data.jobLocation,
      about: props.data.jobAbout,
      industry: props.data.jobIndustry,

      newInfo: [],

      titleInvalid: false,
      titleErrorMsg: "",

      aboutInvalid: false,
      aboutErrorMsg: "",
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  acceptChanges = () => {
    // If validate form returns true (meaning there are no input errors), submit the form
    if (this.validateForm()) {
      this.setState(
        {
          newInfo: [
            this.state.title,
            this.state.industry,
            this.state.location,
            this.state.about,
          ],
        },
        () => {
          this.props.acceptChanges(this.state.newInfo);
        }
      );
    }
  };

  validateForm = () => {
    let title = this.state.title;
    let about = this.state.about;

    let validInput = true;

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
    } else {
      this.setState({ titleInvalid: false });
    }

    if (!about) {
      this.setState({
        aboutErrorMsg: "Job description cannot be empty",
        aboutInvalid: true,
      });
      validInput = false;
    } else if (about.length < 100) {
      this.setState({
        aboutErrorMsg:
          "Please enter a more descriptive job description (100+ characters)",
        aboutInvalid: true,
      });
      validInput = false;
    } else {
      this.setState({ aboutInvalid: false });
    }

    // Return the status of valid input. If any of the above error conditions are met, this will return false
    return validInput;
  };

  componentDidMount() {
    console.log(this.state.title);
  }

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  render() {
    return (
      <Modal closeOnDimmerClick={false} open={true}>
        <Modal.Header>
          Editing information for {this.props.data.jobTitle}
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Grid.Row>
              <Grid.Col sm={6} md={6}>
                <Form.Group label="Job Title" isRequired>
                  <Form.Input
                    name="jobtitle"
                    value={this.state.title}
                    onChange={this.handleChange("title")}
                    invalid={this.state.titleInvalid}
                    feedback={this.state.titleErrorMsg}
                  />
                </Form.Group>
              </Grid.Col>
              <Grid.Col>
                <Form.Group label="Industry" isRequired>
                  <Form.Select
                    value={this.state.industry}
                    onChange={this.handleChange("industry")}
                  >
                    <option value="accounting">Accounting</option>
                    <option value="administration">
                      Administration & Office Support
                    </option>
                    <option value="banking">Baking & Financial Services</option>
                    <option value="customeservice">Customer Service</option>
                    <option value="construction">Construction</option>
                    <option value="consulting">Consulting</option>
                    <option value="education">Education</option>
                    <option value="engineering">Engineering</option>
                    <option value="government">Government & Defence</option>
                    <option value="healthcare">Healthcare & Medical</option>
                    <option value="hospitality">Hospitality & Tourism</option>
                    <option value="hr">Human Resources</option>
                    <option value="it">Information Technology</option>
                    <option value="legal">Legal</option>
                    <option value="marketing">Marketing & Communication</option>
                    <option value="retail">Retail</option>
                    <option value="sales">Sales</option>
                  </Form.Select>
                </Form.Group>
              </Grid.Col>
              <Grid.Col sm={6} md={6}>
                <Form.Group label="Location">
                  <Form.Input
                    name="location"
                    placeholder="123 example st, Melbourne"
                    value={this.state.location}
                    onChange={this.handleChange("location")}
                  />
                </Form.Group>
              </Grid.Col>

              <Grid.Col md={12}>
                <Form.Group className="mb=0" label="About the Role" isRequired>
                  <Form.Textarea
                    name="abouttherole"
                    rows={3}
                    value={this.state.about}
                    onChange={this.handleChange("about")}
                    invalid={this.state.aboutInvalid}
                    feedback={this.state.aboutErrorMsg}
                  />
                </Form.Group>
              </Grid.Col>
            </Grid.Row>
          </Form>
        </Modal.Content>

        {/* SUBMIT */}
        <Modal.Actions>
          <Container className="modalSubmit">
            <Grid.Row>
              <Grid.Col md={12}>
                <Button
                  animated
                  className="acceptButton"
                  circular
                  onClick={this.acceptChanges}
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
                  onClick={this.closeModal}
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
    );
  }
}

export default JobEditModal;
