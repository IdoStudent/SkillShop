// @flow

import * as React from "react";

import { Container, Button, Dropdown, Modal, Icon } from "semantic-ui-react";
import { Form, Grid } from "tabler-react";

// Define our dropdown options
const softSkillsOptions = [
  { key: "communication", text: "Communication", value: "Communication" },
  { key: "teamwork", text: "Teamwork", value: "Teamwork" },
  { key: "creativity", text: "Creativity", value: "Creativity" },
  { key: "responsible", text: "Responsibility", value: "Responsibility" },
  { key: "timemanagement", text: "Time Management", value: "Time Management" },
  {
    key: "criticalthinking",
    text: "Critical Thinking",
    value: "Criticalthinking",
  },
  { key: "organisation", text: "Organisation", value: "Organisation" },
  {
    key: "emotionalintelligence",
    text: "Emotional Intelligence",
    value: "Emotional Intelligence",
  },
  {
    key: "attdetail",
    text: "Attention to Detail",
    value: "Attention to Detail",
  },
  { key: "flexibility", text: "Flexibility", value: "Flexibility" },
  {
    key: "customerservice",
    text: "Customer Service",
    value: "Customer Service",
  },
];

const hardSkillsOptions = [
  { key: "design", text: "Design", value: "Design" },
  { key: "dataanalysis", text: "Data Analysis", value: "Data Analysis" },
  { key: "mathmetics", text: "Mathmetics", value: "Mathmetics" },
  { key: "copywriting", text: "Copy Writing", value: "Copy Writing" },
  { key: "marketing", text: "Marketing", value: "Marketing" },
  { key: "negotiation", text: "Negotiation", value: "Negotiation" },
  {
    key: "projectmanagement",
    text: "Project Management",
    value: "Project Management",
  },
  { key: "administration", text: "Administration", value: "Administration" },
  { key: "language", text: "Foreign Languages", value: "Foreign Languages" },
];

const techSkillsOptions = [
  { key: "adobephotoshop", text: "Adobe Photoshop", value: "Adobe Photoshop" },
  { key: "adobexd", text: "Adobe XD", value: "Adobe XD" },
  { key: "adobepremier", text: "Adobe Premier", value: "Adobe Premier" },
  { key: "excel", text: "Excel", value: "Excel" },
  {
    key: "microsoftoffice",
    text: "Microsoft Office",
    value: "Microsoft Office",
  },
  { key: "webdevelopment", text: "Web Development", value: "Web Development" },
  { key: "frontend", text: "Front-End", value: "Front-End" },
  { key: "backend", text: "Back-End", value: "Back-End" },
  { key: "javascript", text: "Javascript", value: "Javascript" },
  { key: "php", text: "PHP", value: "PHP" },
  { key: "c++", text: "C++", value: "C++" },
  { key: "java", text: "Java", value: "Java" },
  { key: "cloudcomputing", text: "Cloud Computing", value: "Cloud Computing" },
];

var softSkillsSelected = [];
var hardSkillsSelected = [];
var techSkillsSelected = [];

class JobFiltersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Modal State
      open: false,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  acceptChanges = () => {
    // Store filters in local storage (they will be reset each time the job profile changes)
    // They need to be converted into a JSON array first as localStorage can only take strings
    localStorage.setItem(
      "softSkillsFilter",
      JSON.stringify(softSkillsSelected)
    );
    localStorage.setItem(
      "hardSkillsFilter",
      JSON.stringify(hardSkillsSelected)
    );
    localStorage.setItem(
      "techSkillsFilter",
      JSON.stringify(techSkillsSelected)
    );

    this.props.closeModal();

    this.props.acceptChanges();
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  handleSelectSoft = (e, { value }) => (softSkillsSelected = value);
  handleSelectHard = (e, { value }) => (hardSkillsSelected = value);
  handleSelectTech = (e, { value }) => (techSkillsSelected = value);

  componentDidMount() {
    console.log("Editing filters for " + this.props.data.jobTitle);
  }

  render() {
    return (
      <Modal closeOnDimmerClick={false} open={true}>
        <Modal.Header>
          Changing Filters for {this.props.data.jobTitle}
        </Modal.Header>
        <Modal.Content>
          <Container>
            <Grid.Row>
              <Grid.Col>
                <Form.Group label="Years of Experience">
                  <Form.Ratio
                    value={this.state.experience}
                    onChange={this.handleChange("experience")}
                    max={10}
                    min={0}
                    step={1}
                  />
                </Form.Group>
              </Grid.Col>
              <Grid.Col>
                <Form.Group label="Completed Education">
                  <Form.Select
                    value={this.state.education}
                    onChange={this.handleChange("education")}
                  >
                    <option value="phd">PhD</option>
                    <option value="masters">Masters Degree</option>
                    <option value="bachelors">Bachelor Degree</option>
                    <option value="school">High School</option>
                  </Form.Select>
                </Form.Group>
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col md={12}>
                <Form.Group name="softskills" label="Soft Skills">
                  <Dropdown
                    placeholder="Soft Skills"
                    fluid
                    multiple
                    selection
                    defaultValue={JSON.parse(
                      localStorage.getItem("softSkillsFilter")
                    )}
                    options={softSkillsOptions}
                    onChange={this.handleSelectSoft}
                  />
                </Form.Group>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col md={12}>
                <Form.Group name="hardskills" label="Hard Skills">
                  <Dropdown
                    placeholder="Hard Skills"
                    fluid
                    multiple
                    selection
                    defaultValue={JSON.parse(
                      localStorage.getItem("hardSkillsFilter")
                    )}
                    options={hardSkillsOptions}
                    onChange={this.handleSelectHard}
                  />
                </Form.Group>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col md={12}>
                <Form.Group name="techskills" label="Tech Skills">
                  <Dropdown
                    placeholder="Tech Skills"
                    fluid
                    multiple
                    selection
                    defaultValue={JSON.parse(
                      localStorage.getItem("techSkillsFilter")
                    )}
                    options={techSkillsOptions}
                    onChange={this.handleSelectTech}
                  />
                </Form.Group>
              </Grid.Col>
            </Grid.Row>
          </Container>
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

export default JobFiltersModal;
