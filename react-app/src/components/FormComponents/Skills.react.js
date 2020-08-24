import React, { Component } from "react";
import { throws } from "assert";

import { Button, Header, Icon } from "semantic-ui-react";

import { Form, Grid, Container } from "tabler-react";

class Skills extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values } = this.props;
    return (
      <Container>
        <Grid>
          <Header as="h3" dividing>
            What are your top skills?
          </Header>
          <Form>
            {/* Row 1 - */}
            <Grid.Row>
              <Grid.Col offset={1} md={10}>
                <Form.Group name="softskills" label="Soft Skills">
                  <Form.SelectGroup canSelectMultiple pills>
                    <Form.SelectGroupItem
                      label="Communication"
                      name="communication"
                      onChange={this.props.handleChange("communication")}
                      value={values.communication}
                    />
                    <Form.SelectGroupItem
                      label="Teamwork"
                      name="teamwork"
                      onChange={this.props.handleChange("teamwork")}
                      defaultValue={values.teamwork}
                    />
                    <Form.SelectGroupItem
                      label="Creativity"
                      name="creativity"
                      onChange={this.props.handleChange("creativity")}
                      defaultValue={values.creativity}
                    />
                    <Form.SelectGroupItem
                      label="Responsible"
                      name="responsible"
                      onChange={this.props.handleChange("responsible")}
                      defaultValue={values.responsible}
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
              <Grid.Col offset={1} md={10}>
                <Form.Group name="hardskills" label="Hard Skills">
                  <Form.SelectGroup canSelectMultiple pills>
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
              <Grid.Col offset={1} md={10}>
                <Form.Group name="techskills" label="Technological Skills">
                  <Form.SelectGroup canSelectMultiple pills>
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
                    <Form.SelectGroupItem
                      label="Java"
                      name="java"
                      value="Java"
                    />
                    <Form.SelectGroupItem
                      label="Cloud Computing"
                      name="cloudcomputing"
                      value="Cloud Computing"
                    />
                  </Form.SelectGroup>
                </Form.Group>
              </Grid.Col>
            </Grid.Row>

            <Button
              icon
              labelPosition="left"
              onClick={this.back}
              floated="left"
              basic
              color="red"
              size="tiny"
            >
              Back
              <Icon name="long arrow alternate left" basic color="red" />
            </Button>
            <Button
              icon
              labelPosition="right"
              onClick={this.saveAndContinue}
              floated="right"
              basic
              color="green"
              size="tiny"
            >
              Continue
              <Icon name="long arrow alternate right" basic color="green" />
            </Button>
          </Form>
        </Grid>
      </Container>
    );
  }
}

export default Skills;
