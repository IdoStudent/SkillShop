// @flow

import * as React from "react";

import { Container, Button, Dropdown } from "semantic-ui-react";
import { Form, Grid } from "tabler-react";

const softSkillsOptions = [
  { key: 'communication', text: 'Communication', value: 'communication' },
  { key: 'teamwork', text: 'Teamwork', value: 'teamwork' },
  { key: 'creativity', text: 'Creativity', value: 'creativity' },
  { key: 'responsible', text: 'Responsibility', value: 'responsible' },
  { key: 'timemanagement', text: 'Time Management', value: 'timemanagement' },
  { key: 'criticalthinking', text: 'Critical Thinking', value: 'criticalthinking' },
  { key: 'organisation', text: 'Organisation', value: 'organisation' },
  { key: 'emotionalintelligence', text: 'Emotional Intelligence', value: 'emotionalintelligence' },
  { key: 'attdetail', text: 'Attention to Detail', value: 'attdetail' },
  { key: 'flexibility', text: 'Flexibility', value: 'flexibility' },
  { key: 'customerservice', text: 'Customer Service', value: 'customerservice' },
]

const hardSkillsOptions = [
  { key: 'design', text: 'Design', value: 'design' },
  { key: 'dataanalysis', text: 'Data Analysis', value: 'dataanalysis' },
  { key: 'mathmetics', text: 'Mathmetics', value: 'mathmetics' },
  { key: 'copywriting', text: 'Copy Writing', value: 'copywriting' },
  { key: 'marketing', text: 'Marketing', value: 'marketing' },
  { key: 'negotiation', text: 'Negotiation', value: 'negotiation' },
  { key: 'projectmanagement', text: 'Project Management', value: 'projectmanagement' },
  { key: 'administration', text: 'Administration', value: 'administration' },
  { key: 'language', text: 'Foreign Languages', value: 'language' },
]

const techSkillsOptions = [
  { key: 'adobephotoshop', text: 'Adobe Photoshop', value: 'adobephotoshop' },
  { key: 'adobexd', text: 'Adobe XD', value: 'adobexd' },
  { key: 'adobepremier', text: 'Adobe Premier', value: 'adobepremier' },
  { key: 'excel', text: 'Excel', value: 'excel' },
  { key: 'microsoftoffice', text: 'Microsoft Office', value: 'microsoftoffice' },
  { key: 'webdevelopment', text: 'Web Development', value: 'webdevelopment' },
  { key: 'frontend', text: 'Front-End', value: 'frontend' },
  { key: 'backend', text: 'Back-End', value: 'backend' },
  { key: 'javascript', text: 'Javascript', value: 'javascript' },
  { key: 'php', text: 'PHP', value: 'php' },
  { key: 'c++', text: 'C++', value: 'c++' },
  { key: 'java', text: 'Java', value: 'java' },
  { key: 'cloudcomputing', text: 'Cloud Computing', value: 'cloudcomputing' },
]

var softSkillsSelected = []
var hardSkillsSelected = []
var techSkillsSelected = []

class JobFiltersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: props.data.experienceFilter,
      education: props.data.educationFilter,

      // Modal State
      open: false,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  acceptChanges = () => {
    let skills = softSkillsSelected.concat(hardSkillsSelected).concat(techSkillsSelected) 

    let filters = {
      skills: skills,
      experience: this.state.experience,
      education: this.state.education
    }

    this.props.acceptChanges(filters)
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  handleSelectSoft = (e, { value }) => softSkillsSelected = value
  handleSelectHard = (e, { value }) => hardSkillsSelected = value
  handleSelectTech = (e, { value }) => techSkillsSelected = value

  componentDidMount() {
    console.log("Editing filters for " + this.props.data.jobTitle);
  }

  render() {
    const { value } = this.state
    return (
      <Container>
        <Grid.Row>
          <Grid.Col>
            <Form.Group label="Years of Experience">
              <Form.Ratio value={this.state.experience} onChange={this.handleChange("experience")} max={10} min={0} step={1} />
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label="Completed Education">
              <Form.Select value={this.state.education} onChange={this.handleChange("education")}>
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
              <Dropdown placeholder='Soft Skills' fluid multiple selection options={softSkillsOptions} onChange={this.handleSelectSoft}/>
              </Form.Group> 
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col md={12}>
              <Form.Group name="hardskills" label="Hard Skills">
              <Dropdown placeholder='Soft Skills' fluid multiple selection options={hardSkillsOptions} onChange={this.handleSelectHard}/>
              </Form.Group>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col md={12}>
              <Form.Group name="techskills" label="Tech Skills">
              <Dropdown placeholder='Soft Skills' fluid multiple selection options={techSkillsOptions} onChange={this.handleSelectTech}/>
              </Form.Group>
            </Grid.Col>
          </Grid.Row>

          {value}

        {/* ROW 4 - SUBMIT */}
        <Grid.Row>
          <Grid.Col md={12}>
            <Button
              floated="left"
              basic
              type="button"
              color="red"
              onClick={this.closeModal}
            >
              {" "}
              Cancel{" "}
            </Button>
            <Button floated="right" basic type="submit" color="green" onClick={this.acceptChanges}>
              {" "}
              Accept Changes{" "}
            </Button>
          </Grid.Col>
        </Grid.Row>
      </Container>
    );
  }
}

export default JobFiltersModal;
