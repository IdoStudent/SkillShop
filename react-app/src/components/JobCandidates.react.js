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

      candidates: [],

      filteredCandidates: [],

      jobExperience: [],

      education: [],

      skills: {
        "userEmail": "testUser1@gmail.com",
        "userSkills": [
          "teamwork",
          "Responsibility",
          "Flexibility",
          "Administration",
          "Adobe Photoshop",
          "Adobe XD",
          "Adobe Premier",
          "Excel",
          "Microsoft Office"
        ]
      },

      filters: [
        "teamwork",
        "Responsibility",
        "Excel",
        "Microsoft Office"
      ],

    };
  }

  componentDidMount() {
    this.getAllUsers();
    }

    getAllUsers(){
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
    // console.log(this.state.users)
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
       candidates: items,
     },
     () => {
       this.filteredCandidates();
     }
   );
 }
}

//    code for fetching filters from the database once the API is set up
//
// addFilters(){
//   fetch(`https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/skillsFilter`)
//     .then(res => res.json())
//     .then((result) => {
//         this.setState(
//           {
//           filters: result,
//           }
//         );
//       },
//     )
// }



// code to pull users skills (based off user email) from the database once the API is working

// addSkills(){
//   fetch(`https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata/skills?userEmail=${this.state.users[num].userEmail}`)
//     .then(res => res.json())
//     .then((result) => {
//
//        let items = [];
//        items.push(result[i].userSkills);
//       }
//
//         this.setState(
//           {
//           skills: items,
//           }
//         );
//       },
//     )
// }

filteredCandidates(){
  let items = [];

   if(num < this.state.candidates.length && this.state.filters.every(r => this.state.skills.userSkills.includes(r))){
     items.push(
       this.state.candidates[num]
     );
   } else {
     items.push(
      <Card>
        <Card.Body>
          <Header.H5>No More Candidates At This Time</Header.H5>
        </Card.Body>
      </Card>
     );
   }
     this.setState({
       filteredCandidates: items,
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
          {this.state.filteredCandidates}
        </Container>
    );
  }
}

export default JobCandidates;
