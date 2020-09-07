// @flow

import * as React from "react";

import {Container, Grid, Card, Form, Header} from "tabler-react";
import {Button} from "semantic-ui-react";

import SiteWrapper from "../SiteWrapper.react";

var num = 0;


class JobCandidates extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],

      jobseekers: [],

      finalJobSeekers: [],
    };
  }

  componentDidMount() {
    fetch("https://8tyuiglaca.execute-api.ap-southeast-2.amazonaws.com/prod/")
      .then(res => res.json())
      .then((result) => {

        let items = [];
        for (var i = 0; i < result.length; i++) {
          items.push(result[i]);
        }

          this.setState(
            {
            users: items,
            },
            () => {

              this.getJobseekers();
            }
          );
        },
      )
    }

  getJobseekers() {
    let items = [];

      for (var i = 0; i < this.state.users.length; i++){
       if(this.state.users[i].userType === "jobseeker"){
         items.push(
           <Card>
            <Card.Header>
              <Card.Title>{this.state.users[i].userFirstName} {this.state.users[i].userLastName}</Card.Title>
            </Card.Header>
            <Card.Body>
             <Grid.Row>
               <Grid.Col md={4}>
                 <Form.Group label="First Name">
                   <Form.Input name="firstname" readOnly value={this.state.users[i].userFirstName} />
                 </Form.Group>
               </Grid.Col>
               <Grid.Col md={4}>
                 <Form.Group label="Middle Name">
                   <Form.Input name="middlename" readOnly value={this.state.users[i].userMiddleName} />
                 </Form.Group>
               </Grid.Col>
               <Grid.Col md={4}>
                 <Form.Group label="Surname">
                   <Form.Input name="surname" readOnly value={this.state.users[i].userLastName}/>
                 </Form.Group>
               </Grid.Col>
               <Grid.Col sm={6} md={4}>
                 <Form.Group label="City">
                   <Form.Input name="City" readOnly value={this.state.users[i].userCity}/>
                 </Form.Group>
               </Grid.Col>
               <Grid.Col sm={6} md={3}>
                 <Form.Group label="Post Code">
                   <Form.Input name="Post Code" readOnly value={this.state.users[i].userPostcode}/>
                 </Form.Group>
               </Grid.Col>
               <Grid.Col md={5}>
                 <Form.Group label="Email" >
                   <Form.Input name="Email" readOnly value={this.state.users[i].userEmail}/>
                 </Form.Group>
               </Grid.Col>
               <Grid.Col md={12}>
                 <Form.Group className="mb=0" label="About Me">
                   <Form.Input name="About Me" readOnly value={this.state.users[i].userAbout}/>
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
           );
       }

     this.setState({
       jobseekers: items,
     },
     () => {
       this.chooseToDisplay();
     }
   );
 }
}

chooseToDisplay(){
  let items = [];

   if(num < this.state.jobseekers.length){
     items.push(
       this.state.jobseekers[num]
     );
   }
     this.setState({
       finalJobSeekers: items,
     }
  );
}


 acceptChanges = () => {
   num++;
   console.log(num);
   this.getJobseekers();
 };


  render() {
    return (

        <Container>
          <Header.H1>Candidates</Header.H1>
          {this.state.finalJobSeekers}
        </Container>
    );
  }
}

export default JobCandidates;
