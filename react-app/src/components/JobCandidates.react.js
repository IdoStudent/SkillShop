// @flow

import * as React from "react";
import $ from "jquery";

import {Container, Grid, Card, Form, Header} from "tabler-react";
import {Button} from "semantic-ui-react";

import SiteWrapper from "../SiteWrapper.react";


var users = [];
var jobseeker = [];
var skill = [];
var filters = ["PHP"];


class JobCandidates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      num: 0,
      jobseekers: [],
      skills: [],
      filters: ["PHP"],
    };
  }

  componentDidMount() {
    this.getJobseekers();
    }

    getJobseekers(){
      fetch("https://8tyuiglaca.execute-api.ap-southeast-2.amazonaws.com/prod/")
        .then(res => res.json())
        .then((result) => {

          let items = [];
          for (var i = 0; i < result.length; i++){
           if(result[i].userType === "jobseeker"){
             items.push(result[i]);
             }
           }

           this.setState(
             {
               jobseekers: items,
             },
             () => {
               this.getBySkills();
             }
           );
          },
        )
    }


// code to pull users skills (based off user email) from the database

getBySkills(){

  let items = [];
  for (var i = 0; i < jobseeker.length; i++){

  fetch(`https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata/skills?userEmail=${jobseeker[i].userEmail}`)
    .then(res => res.json())
    .then((result) => {

    items.push(result.Item);

      }
    )
  }

  this.setState(
    {
      skills: items,
    },
    () => {
      this.filterJobseekers();
    }
  );
}


filterJobseekers(){

  // if(this.state.filters.every(r => this.state.skills.Item.userSkills.includes(r))){
  //   items.push(result.Item);
  //
}


 acceptChanges = () => {
   this.state.num++;
   console.log(this.state.num);
   this.forceUpdate();
 };


  render() {


    return (

        <Container>
        <Card>
         <Card.Header>
           <Card.Title>{this.state.filters[this.state.num]} {this.state.num}</Card.Title>
         </Card.Header>
         <Card.Body>
          <Grid.Row>
            <Grid.Col md={4}>
              <Form.Group label="First Name">
                <Form.Input name="firstname" readOnly value={this.state.jobseekers.userFirstName} />
              </Form.Group>
            </Grid.Col>
            <Grid.Col md={4}>
              <Form.Group label="Middle Name">
                <Form.Input name="middlename" readOnly value={this.state.jobseekers.userMiddleName} />
              </Form.Group>
            </Grid.Col>
            <Grid.Col md={4}>
              <Form.Group label="Surname">
                <Form.Input name="surname" readOnly value={this.state.jobseekers.userLastName}/>
              </Form.Group>
            </Grid.Col>
            <Grid.Col sm={6} md={4}>
              <Form.Group label="City">
                <Form.Input name="City" readOnly value={this.state.jobseekers.userCity}/>
              </Form.Group>
            </Grid.Col>
            <Grid.Col sm={6} md={3}>
              <Form.Group label="Post Code">
                <Form.Input name="Post Code" readOnly value={this.state.jobseekers.userPostcode}/>
              </Form.Group>
            </Grid.Col>
            <Grid.Col md={5}>
              <Form.Group label="Email" >
                <Form.Input name="Email" readOnly value={this.state.jobseekers.userEmail}/>
              </Form.Group>
            </Grid.Col>
            <Grid.Col md={12}>
              <Form.Group className="mb=0" label="About Me">
                <Form.Input name="About Me" readOnly value={this.state.jobseekers.userAbout}/>
              </Form.Group>
            </Grid.Col>
            <Grid.Col md={12}>
              <Form.Group className="mb=0" label="Skills">
                <Form.Input name="Skills" readOnly value={this.state.skills}/>
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
              <Button floated="right" positive type="submit" color="green" onClick={this.acceptChanges}>
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
