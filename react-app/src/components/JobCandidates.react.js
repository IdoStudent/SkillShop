// @flow

import * as React from "react";

import { Container, Grid, Card, Form, Header } from "tabler-react";
import { Button } from "semantic-ui-react";
import axios from "axios";

var jobseekers = [];
var initialised = false;
var skillsSet = false;
var skillsFiltered = false;

class JobCandidates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      num: 0,
      filters: ["Flexibility", "Teamwork"],
      currentCandidate: {
        userAbout: " ",
        userCity: " ",
        userEmail: " ",
        userFirstName: " ",
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
    this.setFilters();

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
        console.log(jobseekers);
      });

      initialised = true;
  }

  async setFilters(){
    let items = [];
    fetch("https://vsym28sl18.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=test@test.com")
    .then((res) => res.json())
    .then((result) => {
      items = result[0].skillsFilter;

      this.setState(
        {
          filters: items,
        }
      );
    });
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
    skillsSet = true;
  }

  setCandidate = () => {
    // CHECK IF INITIALISED IS TRUE (MEANING THE END OF getSkills() HAS BEEN REACHED AND ALL THE DATA IS SET)
    if (initialised && skillsFiltered && skillsSet) {
      if (jobseekers[this.state.num] != null){
        // SET OUR STATE currentCandidate TO THE FIRST INDEX OF OUR FILTERED JOBSEEKERS ARRAY
        this.setState({ currentCandidate: jobseekers[this.state.num] });
      } else {
        alert("No matches for this search");
      }
    } else {
      // IF INITIALISED IS FALSE, RECHECK IN 250ms OTHERWISE OUR DATA WILL BE UNDEFINED
      setTimeout(this.setCandidate, 250);
    }
  };

  filterJobseekers = () => {
    // WHEN FILTERING, LOOK THROUGH THE JOBSEEKER ARRAY FOR MATCHES. ANYTHING THAT DOESN'T MATCH, YOU CAN REMOVE FROM THE ARRAY USING 'jobseekers.splice(INDEX, 1)'
    // SPLICE SYNTAX IS: splice(position in array, amount of elements to remove)
    // CHECK IF INITIALISED
    if (initialised && skillsSet) {
      for (var i = 0; i < jobseekers.length; i++) {
            console.log(this.state.filters);
        if(!this.state.filters.every(r => jobseekers[i].userSkills.includes(r))){
          console.log("not a match");
          jobseekers.splice(i, 1);
          i--;
        }
      }
    } else {
      // IF INITIALISED IS FALSE, RECHECK IN 250ms OTHERWISE OUR DATA WILL BE UNDEFINED
      setTimeout(this.filterJobseekers, 250);
    }
    skillsFiltered = true;
  };

  acceptCandidate = (event) => {
    if (initialised && skillsFiltered && skillsSet){
      let newNum = this.state.num + 1;

      // If Employer likes candidate then add them to their matches database here

      if (newNum >= jobseekers.length) {
        console.log("no more candidates");
        // CAN ADD IN SOME LOGIC FOR WHAT TO DO WHEN THERE'S NO MORE CANDIDATES (REMOVE INFO AND DISPLAY A MESSAGE, POPUP, ALERT, ETC.)
        alert("No more candidates available at this time");
      } else {
        this.setState({
          num: newNum,
          currentCandidate: jobseekers[newNum],
        }
        )
        try {
          const params = {
            userEmail:  jobseekers[this.state.num].userEmail,
            jobKey: "testJobCandidatesPage",
            matchId: "testMatchIdJobCandidatesPage"
          };
          axios.post(
            "https://ddar54uzr6.execute-api.ap-southeast-2.amazonaws.com/prod/",
            params
          );
        } catch (err) {
          console.log(`An error has occurred: ${err}`);
        };
      }
    }
  };

  rejectCandidate = () => {
    if (initialised && skillsFiltered && skillsSet){
      let newNum = this.state.num + 1;

      if (newNum >= jobseekers.length) {
        console.log("no more candidates");
        // CAN ADD IN SOME LOGIC FOR WHAT TO DO WHEN THERE'S NO MORE CANDIDATES (REMOVE INFO AND DISPLAY A MESSAGE, POPUP, ALERT, ETC.)
        alert("No more candidates available at this time");
      } else {
        this.setState({
          num: newNum,
          currentCandidate: jobseekers[newNum],
        });
      }
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
                  onClick={this.rejectCandidate}
                >
                  {" "}
                  Dislike{" "}
                </Button>
                <Button
                  floated="right"
                  positive
                  type="submit"
                  color="green"
                  onClick={this.acceptCandidate}
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
