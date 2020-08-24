// UserDetails.jsx
import React, { Component } from "react";
import { Button, Header, Icon } from "semantic-ui-react";

import { Form, Grid, Container } from "tabler-react";

class UserDetails extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values } = this.props;
    return (
      <Container>
        <Grid>
          <Header as="h3" dividing>
            Tell us about yourself
          </Header>
          <Form>
            {/* Row 1 - NAME*/}
            <Grid.Row>
              <Grid.Col md={4}>
                <Form.Group label="First Name" isRequired>
                  <Form.Input
                    name="firstname"
                    onChange={this.props.handleChange("firstname")}
                    value={values.firstname}
                  />
                </Form.Group>
              </Grid.Col>

              <Grid.Col md={4}>
                <Form.Group label="Middle Name">
                  <Form.Input
                    name="middlename"
                    onChange={this.props.handleChange("middlename")}
                    value={values.middlename}
                  />
                </Form.Group>
              </Grid.Col>

              <Grid.Col md={4}>
                <Form.Group label="Surname" isRequired>
                  <Form.Input
                    name="surname"
                    onChange={this.props.handleChange("surname")}
                    value={values.surname}
                  />
                </Form.Group>
              </Grid.Col>
            </Grid.Row>

            {/* Row 2 - LOCATION*/}
            <Grid.Row>
              <Grid.Col md={3}>
                <Form.Group label="City">
                  <Form.Input
                    name="city"
                    onChange={this.props.handleChange("city")}
                    value={values.city}
                  />
                </Form.Group>
              </Grid.Col>

              <Grid.Col md={2}>
                <Form.Group label="Postcode">
                  <Form.MaskedInput
                    placeholder=""
                    mask={[/\d/, /\d/, /\d/, /\d/]}
                    name="postcode"
                    onChange={this.props.handleChange("postcode")}
                    value={values.postcode}
                  />
                </Form.Group>
              </Grid.Col>

              <Grid.Col md={2}>
                <Form.Group label="State" isRequired>
                  <Form.Input
                    name="state"
                    onChange={this.props.handleChange("state")}
                    value={values.state}
                  />
                </Form.Group>
              </Grid.Col>

              <Grid.Col md={4}>
                <Form.Group label="Are you willing to relocate for an opportunity?">
                  <Form.Checkbox
                    label="Yes"
                    name="relocate"
                    onClick={this.props.handleChangeCheckbox}
                    //value={values.relocate}
                  />
                </Form.Group>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Form.Label>
                Your city and postcode is not required, but a more accurate
                location will help us find better opportunities for you!
              </Form.Label>
            </Grid.Row>

            {/* Row 3 - ABOUT ME*/}

            <Grid.Row>
              <Grid.Col md={12}>
                <Form.Group className="mb=0" label="About Me" isRequired>
                  <Form.Textarea
                    name="about"
                    rows={3}
                    placeholder="Enter a short description about yourself..."
                    onChange={this.props.handleChange("about")}
                    value={values.about}
                  />
                </Form.Group>
              </Grid.Col>
            </Grid.Row>

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

export default UserDetails;
