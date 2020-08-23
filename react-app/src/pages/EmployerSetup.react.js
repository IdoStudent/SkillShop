// @flow

import React from "react";

import {
  Container,
  Grid,
  Card,
  Form,
  Header,
  Alert,
  Button,
} from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";

function EmployerSetup() {

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

            <Header.H1>Creat a new Job profile</Header.H1>
          {/* New Job Information */}
            <Form className="card" name="generalInfo">
              <Card.Body>
                <Card.Title>General Information</Card.Title>
                <Grid.Row>
                  <Grid.Col sm={6} md={6}>
                    <Form.Group label="Job Title" isRequired>
                      <Form.Input name="jobtitle" />
                    </Form.Group>
                  </Grid.Col>
                  <Grid.Col>
                  <Form.Group label="Industry" isRequired>
                    <Form.Select>
                      <option>
                        Marketing & communication
                      </option>
                      <option>
                        Banking & finance
                      </option>
                      <option>
                        Building, metal & civil construction industries
                      </option>
                      <option>
                        Commercial sales
                      </option>
                      <option>
                        Educational services
                      </option>
                      <option>
                        Fast food industry
                      </option>
                      <option>
                        Graphic arts
                      </option>
                      <option>
                        Journalism
                      </option>
                    </Form.Select>
                  </Form.Group>
                  </Grid.Col>
                  <Grid.Col>
                  <Form.Group label="Sub-Category">
                    <Form.Select>
                      <option>
                        Research & annalysis
                      </option>
                      <option>
                        ...
                      </option>
                    </Form.Select>
                  </Form.Group>
                  </Grid.Col>
                  <Grid.Col sm={6} md={6}>
                  <Form.Group label="Location">
                    <Form.Input
                      name="location"
                      placeholder="123 example st, Melbourne"
                    />
                  </Form.Group>
                  </Grid.Col>

                  <Grid.Col md={12}>
                    <Form.Group className="mb=0" label="About the Role" isRequired>
                      <Form.Textarea
                        name="abouttherole"
                        rows={3}
                        placeholder="Enter a short description about the role..."
                      />
                    </Form.Group>
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Form>

          {/* Who are you looking for card */}
            <Form className="card" name="skills">
              <Card.Body>
                <Card.Title>Who are you looking for?</Card.Title>
                  <Grid.Row>
                  <Grid.Col>
                      <Form.Group label="Years of Experience">
                        <Form.Ratio
                          defaultValue={5}
                          max={10}
                          min={0}
                          step={1}
                        />
                      </Form.Group>
                    </Grid.Col>
                  <Grid.Col>
                  <Form.Group label="Completed Education">
                    <Form.Select>
                      <option>
                        Bachelor Degree
                      </option>
                      <option>
                        High school deploma
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Grid.Col>
                <Grid.Col>
                  <Form.Group label="Skills">
                    <Form.SelectGroup
                      canSelectMultiple
                      pills
                    >
                      <Form.SelectGroupItem
                        label="Content Writing"
                        name="language"
                        value="Content Writing"
                      />
                      <Form.SelectGroupItem
                        label="Communication"
                        name="language"
                        value="Communication"
                      />
                      <Form.SelectGroupItem
                        label="Attention to detail"
                        name="language"
                        value="Attention to detail"
                      />
                    </Form.SelectGroup>
                  </Form.Group>
                  </Grid.Col>
                </Grid.Row>
              </Card.Body>
            </Form>

            <Button color="primary">
              Create Job
            </Button>
          </Grid.Col>
        </Grid.Row>

      </Container>
    </div>
    </SiteWrapper>
  );
}

export default EmployerSetup;
