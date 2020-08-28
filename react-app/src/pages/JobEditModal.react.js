// @flow

import * as React from "react";

import { Container, Header, Button, Modal } from "semantic-ui-react";
import { Form, Grid, Card } from "tabler-react";

class JobEditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        title: props.data.title,
        location: props.data.location,
        about: props.data.about,
        industry: props.data.industry,
        

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
                <option value="marketing">Marketing & communication</option>
                <option value="banking">Banking & finance</option>
                <option value="building">Building, metal & civil construction industries</option>
                <option value="sales">Commercial sales</option>
                <option value="education">Educational services</option>
                <option value="hospitality">Hospitality</option>
                <option value="service">Service</option>
                <option value="art">Graphic arts</option>
                <option value="journalism">Journalism</option>
              </Form.Select>
            </Form.Group>
          </Grid.Col>
          <Grid.Col>
            <Form.Group label="Sub-Category" >
              <Form.Select>
                <option>Research & annalysis</option>
                <option>...</option>
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

export default JobEditModal;
