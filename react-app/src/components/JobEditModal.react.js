// @flow

import * as React from "react";

import { Container, Button } from "semantic-ui-react";
import { Form, Grid } from "tabler-react";

class JobEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title: props.data.title,
        location: props.data.location,
        about: props.data.about,
        industry: props.data.industry,

        newInfo: [],
        

      // Modal State
      open: false,
    };
  }

  closeModal = () => {
    this.props.closeModal();
  };

  acceptChanges = () => {
    this.setState({ 
      newInfo: [this.state.title, this.state.industry, this.state.location, this.state.about]
    }, () => {                              
      this.props.acceptChanges(this.state.newInfo);
    });
    
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  componentDidMount() {
    console.log("Editing info for " + this.props.data.title)
  }


  render() {
    return (
      <Container>
        <Grid.Row>
          <Grid.Col sm={6} md={6}>
            <Form.Group label="Job Title" isRequired>
              <Form.Input name="jobtitle" value={this.state.title} onChange={this.handleChange("title")}/>
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label="Industry" isRequired>
              <Form.Select value={this.state.industry} onChange={this.handleChange("industry")}>
                <option value="accounting">Accounting</option>
                <option value="administration">Administration & Office Support</option>
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
            <Form.Group label="Location" >
              <Form.Input
                name="location"
                placeholder="123 example st, Melbourne"
                value={this.state.location}
                onChange={this.handleChange("location")}
              />
            </Form.Group>
          </Grid.Col>

          <Grid.Col md={12}>
            <Form.Group className="mb=0" label="About the Role" isRequired >
              <Form.Textarea
                name="abouttherole"
                rows={3}
                value={this.state.about}
                onChange={this.handleChange("about")}
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

export default JobEditModal;
