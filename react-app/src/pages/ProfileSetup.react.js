// @flow

import React from "react";

import {
  Container,
  Card,
  Form,
  Grid,
  Alert,
  Header,
  Button,
} from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";

class ProfileSetup extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  };

  render() {
    return (
      <SiteWrapper>
        <Alert type="warning" isDismissible>
          <center>
            All information on your profile is publically available to potential
            employers.
          </center>
        </Alert>
        <div className="my-3 my-md-5">
          <Container>
            <Grid.Row>
              <Grid.Col lg={12}>
                <Header.H1>Your Profile</Header.H1>

                {/* Jobseeker General Information Set */}
                <Form
                  className="card"
                  name="generalInfo"
                  onSubmit={this.handleSubmit}
                >
                  <Card.Body>
                    <Card.Title>
                      Welcome to SkillShop! Let's get you started
                    </Card.Title>

                    <Grid.Row>

                      <Grid.Col sm={6} md={6}>
                        <Form.Group label="First Name" isRequired>
                          <Form.Input name="firstname" />
                        </Form.Group>
                      </Grid.Col>

                      <Grid.Col sm={6} md={6}>
                        <Form.Group label="Surname" isRequired>
                          <Form.Input name="surname" />
                        </Form.Group>
                      </Grid.Col>

                      <Grid.Col sm={6} md={4}>
                        <Form.Group label="City">
                          <Form.Input name="city" />
                        </Form.Group>
                      </Grid.Col>
                      
                      <Grid.Col sm={6} md={3}>
                        <Form.Group label="Post Code" isRequired>
                          <Form.MaskedInput
                            name="postcode"
                            mask={[/\d/, /\d/, /\d/, /\d/]}
                          />
                        </Form.Group>
                      </Grid.Col>

                      <Grid.Col sm={6} md={5}>
                        <Form.Group label="State" isRequired>
                          <Form.MaskedInput
                            name="state"
                          />
                        </Form.Group>
                      </Grid.Col>

                      <Grid.Col md={12}>
                        <Form.Group className="mb=0" label="About Me">
                          <Form.Textarea
                            name="aboutme"
                            rows={3}
                            placeholder="Enter a short description about yourself..."
                          />
                        </Form.Group>
                      </Grid.Col>
                    </Grid.Row>
                  </Card.Body>

                  <Button type="submit" color="primary" className="ml-auto">
                    Submit
                  </Button>


                </Form>
              </Grid.Col>
            </Grid.Row>
          </Container>
        </div>
      </SiteWrapper>
    );
  }
}

export default ProfileSetup;
