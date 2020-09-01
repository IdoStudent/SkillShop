// @flow

import * as React from "react";

import { Container, Header, Button, Modal } from "semantic-ui-react";
import { Form, Grid, Card } from "tabler-react";

class JobFiltersModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experience: props.data.experience,
      education: props.data.education,

      softskills: props.data.softskills,
      hardskills: props.data.hardskills,
      techskills: props.data.techskills,

      // Modal State
      open: false,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  componentDidMount() {
    console.log("Editing filters for " + this.props.data.title);
  }

  render() {
    return (
      <Container>
        <Grid.Row>
          <Grid.Col>
            <Form.Group label="Years of Experience">
              <Form.Ratio defaultValue={this.state.experience} max={10} min={0} step={1} />
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
            <Grid.Col md={11}>
              <Form.Group name="softskills" label="Soft Skills">
                <Form.SelectGroup canSelectMultiple pills onChange={this.onChange}>
                  <Form.SelectGroupItem
                    label="Communication"
                    name="communication"
                    value="Communication"
                    checked='true'
                  />
                  <Form.SelectGroupItem
                    label="Teamwork"
                    name="teamwork"
                    value="Teamwork"
                  />
                  <Form.SelectGroupItem
                    label="Creativity"
                    name="creativity"
                    value="Creativity"
                  />
                  <Form.SelectGroupItem
                    label="Responsible"
                    name="responsible"
                    value="Responsible"
                  />
                  <Form.SelectGroupItem
                    label="Time Management"
                    name="timemanagement"
                    value="Time Management"
                  />
                  <Form.SelectGroupItem
                    label="Critical Thinking"
                    name="criticalthinking"
                    value="Critical Thinking"
                  />
                  <Form.SelectGroupItem
                    label="Organisation"
                    name="organisation"
                    value="Organisation"
                  />
                  <Form.SelectGroupItem
                    label="Emotional Intelligence"
                    name="emotionalintelligence"
                    value="Emotional Intelligence"
                  />
                  <Form.SelectGroupItem
                    label="Attention to Detail"
                    name="attdetail"
                    value="Attention to Detail"
                  />
                  <Form.SelectGroupItem
                    label="Flexibility"
                    name="flexibility"
                    value="Flexibility"
                  />
                  <Form.SelectGroupItem
                    label="Customer Service"
                    name="customerservice"
                    value="Customer Service"
                  />
                </Form.SelectGroup>
              </Form.Group>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col md={11}>
              <Form.Group name="hardskills" label="Hard Skills">
                <Form.SelectGroup canSelectMultiple pills onChange={this.onChange}>
                  <Form.SelectGroupItem
                    label="Design"
                    name="design"
                    value="Design"
                  />
                  <Form.SelectGroupItem
                    label="Data Analysis"
                    name="dataanalysis"
                    value="Data Analysis"
                  />
                  <Form.SelectGroupItem
                    label="Mathmetics"
                    name="mathmetics"
                    value="Mathmetics"
                  />
                  <Form.SelectGroupItem
                    label="Copy Writing"
                    name="copywriting"
                    value="Copy Writing"
                  />
                  <Form.SelectGroupItem
                    label="Marketing"
                    name="marketing"
                    value="Marketing"
                  />
                  <Form.SelectGroupItem
                    label="Negotiation"
                    name="negotiation"
                    value="Negotiation"
                  />
                  <Form.SelectGroupItem
                    label="Project Management"
                    name="projectmanagement"
                    value="Project Management"
                  />
                  <Form.SelectGroupItem
                    label="Administration"
                    name="administration"
                    value="Administration"
                  />
                  <Form.SelectGroupItem
                    label="Foreign Languages"
                    name="language"
                    value="Foreign Languages"
                  />
                </Form.SelectGroup>
              </Form.Group>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col md={11}>
              <Form.Group name="techskills" label="Tech Skills">
                <Form.SelectGroup canSelectMultiple pills onChange={this.onChange}>
                  <Form.SelectGroupItem
                    label="Adobe Photoshop"
                    name="adobephotoshop"
                    value="Adobe Photoshop"
                  />
                  <Form.SelectGroupItem
                    label="Adobe XD"
                    name="adobexd"
                    value="Adobe XD"
                  />
                  <Form.SelectGroupItem
                    label="Adobe Premier"
                    name="adobepremier"
                    value="Adobe Premier"
                  />
                  <Form.SelectGroupItem
                    label="Excel"
                    name="excel"
                    value="Excel"
                  />
                  <Form.SelectGroupItem
                    label="Microsoft Office"
                    name="microsoftoffice"
                    value="Microsoft Office"
                  />
                  <Form.SelectGroupItem
                    label="Web Development"
                    name="webdevelopment"
                    value="Web Development"
                  />
                  <Form.SelectGroupItem
                    label="Front-End"
                    name="frontend"
                    value="Front-End"
                  />
                  <Form.SelectGroupItem
                    label="Back-End"
                    name="backend"
                    value="Back-End"
                  />
                  <Form.SelectGroupItem
                    label="Javascript"
                    name="javascript"
                    value="Javascript"
                  />
                  <Form.SelectGroupItem label="PHP" name="php" value="PHP" />
                  <Form.SelectGroupItem label="C++" name="c++" value="C++" />
                  <Form.SelectGroupItem label="Java" name="java" value="Java" />
                  <Form.SelectGroupItem
                    label="Cloud Computing"
                    name="cloudcomputing"
                    value="Cloud Computing"
                  />
                </Form.SelectGroup>
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
              onClick={this.closeModal}
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
      </Container>
    );
  }
}

export default JobFiltersModal;
