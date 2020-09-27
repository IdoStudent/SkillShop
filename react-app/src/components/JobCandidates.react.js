// @flow

import * as React from "react";

import { Container, Grid, Card, Form, Header } from "tabler-react";
import { Button } from "semantic-ui-react";

var jobseekers = [];
var initialised = false;

class JobCandidates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      currentCandidate: {
        userAbout: " ",
        userCity: " ",
        userEmail: " ",
        userFirstName: " test ",
        userLastName: " ",
        userMiddleName: " ",
        userPhoneNumber: " ",
        userPostcode: " ",
        userSkills: " ",
        userState: " ",
      },
    };
  }

  componentDidMount() {
    this.configureCandidates();
  }

  configureCandidates() {
    this.getJobseekers();

    // need to filter in between here
    this.filterJobseekers();

    // AFTER WE HAVE GOTTEN ALL THE CANDIDATES WE WANT, SET THE FIRST CANDIDATE TO DISPLAY
    this.setCandidate();
  }

  async getJobseekers() {
    // FETCH ALL USERS FROM DATABASE
    await fetch(
      "https://8tyuiglaca.execute-api.ap-southeast-2.amazonaws.com/prod/"
    )
      .then((res) => res.json())
      .then((result) => {
        // FOR EACH USER, CHECK USER TYPE AND ADD TO ARRAY IF THEY'RE A JOBSEEKER
        for (var i = 0; i < result.length; i++) {
          if (result[i].userType === "jobseeker") {
            jobseekers.push(result[i]);
          }
        }

        // ADD A NEW PROPERTY TO ALL OBJECTS IN THE ARRAY (userSkills)
        jobseekers.forEach(function(element) {
          element.userSkills = [" "];
        });

        // (STILL IN THE LOOP) 
        // FOR EACH JOBSEEKER IN OUR ARRAY, QUERY THE DATABSAE FOR THEIR SKILLS AND ADD THAT TO THEIR OBJECT IN THE JOBSEEKERS ARRAY
        this.getSkills();
      });

    initialised = true;
  }

  async getSkills() {
    // ITERATE THROUGH THE LENGTH OF THE ARRAY, LOOKING UP EACH USERS SKILLS LISTED IN THE DATABASE
    for (var i = 0; i < jobseekers.length; i++) {
      // NEED TO USE ASYNC/AWAIT OTHERWISE LOOP WILL JUST BREAK
      await fetch(
        `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata/skills?userEmail=${
          jobseekers[i].userEmail
        }`
      )
        .then((res) => res.json())
        .then((result) => {
          // IF RESULT.ITEM === UNDEFINED IT MEANS THE USER HAS NO SKILLS INFORMATION IN THE DATABASE SO WE WILL GET AN ERROR IF WE TRY TO ACCESS IT
          if (result.Item !== undefined) {
            jobseekers[i].userSkills = result.Item.userSkills;
          }
        });
    }
  }

  setCandidate = () => {
    // CHECK IF INITIALISED IS TRUE (MEANING THE END OF getSkills() HAS BEEN REACHED AND ALL THE DATA IS SET)
    if (initialised) {
      // SET OUR STATE currentCandidate TO THE FIRST INDEX OF OUR FILTERED JOBSEEKERS ARRAY
      this.setState({ currentCandidate: jobseekers[this.state.num] });
    } else {
      // IF INITIALISED IS FALSE, RECHECK IN 250ms OTHERWISE OUR DATA WILL BE UNDEFINED
      setTimeout(this.setCandidate, 250);
    }
  };

  filterJobseekers = () => {
    // WHEN FILTERING, LOOK THROUGH THE JOBSEEKER ARRAY FOR MATCHES. ANYTHING THAT DOESN'T MATCH, YOU CAN REMOVE FROM THE ARRAY USING 'jobseekers.splice(INDEX, 1)'
    // SPLICE SYNTAX IS: splice(position in array, amount of elements to remove)

    // CHECK IF INITIALISED
    if (initialised) {
      console.log("length", jobseekers.length)
    } else {
      // IF INITIALISED IS FALSE, RECHECK IN 250ms OTHERWISE OUR DATA WILL BE UNDEFINED
      setTimeout(this.filterJobseekers, 250);
    }
  };

  acceptChanges = () => {
    let newNum = this.state.num + 1;

    if (newNum >= jobseekers.length) {
      console.log("no more candidates");
      // CAN ADD IN SOME LOGIC FOR WHAT TO DO WHEN THERE'S NO MORE CANDIDATES (REMOVE INFO AND DISPLAY A MESSAGE, POPUP, ALERT, ETC.)
    } else {
      this.setState({
        num: newNum,
        currentCandidate: jobseekers[newNum],
      });
    }
  };

  render() {
    return (
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>
              {this.state.currentCandidate.userFirstName}
              &nbsp;
              {this.state.currentCandidate.userLastName}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Grid.Row>
              <Grid.Col md={4}>
                <Form.Group label="First Name">
                  <Form.Input
                    name="firstname"
                    readOnly
                    value={this.state.currentCandidate.userFirstName}
                  />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={4}>
                <Form.Group label="Middle Name">
                  <Form.Input
                    name="middlename"
                    readOnly
                    value={this.state.currentCandidate.userMiddleName}
                  />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={4}>
                <Form.Group label="Surname">
                  <Form.Input
                    name="surname"
                    readOnly
                    value={this.state.currentCandidate.userLastName}
                  />
                </Form.Group>
              </Grid.Col>
              <Grid.Col sm={6} md={4}>
                <Form.Group label="City">
                  <Form.Input
                    name="City"
                    readOnly
                    value={this.state.currentCandidate.userCity}
                  />
                </Form.Group>
              </Grid.Col>
              <Grid.Col sm={6} md={3}>
                <Form.Group label="Post Code">
                  <Form.Input
                    name="Post Code"
                    readOnly
                    value={this.state.currentCandidate.userPostcode}
                  />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={5}>
                <Form.Group label="Email">
                  <Form.Input
                    name="Email"
                    readOnly
                    value={this.state.currentCandidate.userEmail}
                  />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={12}>
                <Form.Group className="mb=0" label="About Me">
                  <Form.Input
                    name="About Me"
                    readOnly
                    value={this.state.currentCandidate.userAbout}
                  />
                </Form.Group>
              </Grid.Col>
              <Grid.Col md={12}>
                <Form.Group className="mb=0" label="Skills">
                  <Form.Input
                    name="Skills"
                    readOnly
                    value={this.state.currentCandidate.userSkills}
                  />
                </Form.Group>
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col md={12}>
                <Button
                  floated="left"
                  negative
                  type="button"
                  color="red"
                  onClick={this.acceptChanges}
                >
                  {" "}
                  Dislike{" "}
                </Button>
                <Button
                  floated="right"
                  positive
                  type="submit"
                  color="green"
                  onClick={this.acceptChanges}
                >
                  {" "}
                  Like{" "}
                </Button>
              </Grid.Col>
            </Grid.Row>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default JobCandidates;
