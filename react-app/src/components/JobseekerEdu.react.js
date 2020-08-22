// @flow

import * as React from "react";

import { Container, Grid, Divider, Header } from "semantic-ui-react";

class JobseekerExp extends React.Component {
  render() {
    return (
      <Container>
        <Grid columns={2} padded>
          <Grid.Row>
            <Grid.Column width={10}>
              <Grid.Row>
                <Header size='small'>EDUCATION TITLE</Header>
              </Grid.Row>
              <Grid.Row>
                <Header size='small'>INSTITUTION NAME</Header>
              </Grid.Row>
              <Grid.Row>
                <br />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </Grid.Row>
            </Grid.Column>
            <Grid.Column width={6}>
              <Grid.Row>
                <Container textAlign="right">
                  <Header size='small'>MAR 2016 - JAN 2020</Header>
                </Container>
              </Grid.Row>
              <Grid.Row>
                <Container textAlign="right">
                    <Header size='small'>INSTITUTION LOCATION</Header>
                </Container>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider />
      </Container>
    );
  }
}

export default JobseekerExp;
