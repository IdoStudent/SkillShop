// @flow

import * as React from "react";

import ReactDOM from 'react-dom';

import { Container, Card, Dimmer, Icon } from "tabler-react";
import { Button } from "semantic-ui-react";
import axios from "axios";

import NotificationSystem from "react-notification-system";

var jobseekers = [];
var currentCandidatesSkills = [];
var education = [];
var num = 0;

class JobCandidates extends React.Component {
  notificationSystem = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialised: false,
      skillsSet: false,
      experienceSet: false,
      educationSet: false,
      skillsFiltered: false,
      filters: ["Flexibility", "Teamwork"],
      currentCandidatesSkills: [""],
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
        userExperience: [{
          userEmail: "",
          userJobDescription: "",
          userJobEndDate: "",
          userJobLocation: "",
          userJobStartDate: "",
          userJobTitle: "",
        }],
        userEducation: [{
          userEducationEndDate: "",
          userEmail: "",
          userEducationDescription: "",
          userEducationInstitution: "",
          userEducationTitle: "",
          userEducationStartDate: "",
          userEducationLocation: "",
        }],
        userState: " ",
      },
      noCandidates: false,
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
        jobseekers.length = 0;
        for (var i = 0; i < result.length; i++) {
          if (result[i].userType === "jobseeker") {
            jobseekers.push(result[i]);
          }
        }

        // ADD A NEW PROPERTY TO ALL OBJECTS IN THE ARRAY (userSkills)
        jobseekers.forEach(function(element) {
          element.userSkills = [" "];
          element.userExperience = [" "];
          element.userEducation = [" "];
        });

        // (STILL IN THE LOOP)
        // FOR EACH JOBSEEKER IN OUR ARRAY, QUERY THE DATABSAE FOR THEIR SKILLS AND ADD THAT TO THEIR OBJECT IN THE JOBSEEKERS ARRAY
        this.getSkills();
        this.getJobExperience();
        this.getEducation();
        console.log(jobseekers);
      });

    this.setState({
      initialised: true,
    });
  }

  async setFilters() {
    // GET FILTERS FROM LOCAL STORAGE:

    let items = [];

    items = JSON.parse(localStorage.getItem("softSkillsFilter"))
      .concat(JSON.parse(localStorage.getItem("hardSkillsFilter")))
      .concat(JSON.parse(localStorage.getItem("techSkillsFilter")));

    this.setState({
      filters: items,
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

    this.setState({
      skillsSet: true,
    });
  }

  async getJobExperience() {
    // ITERATE THROUGH THE LENGTH OF THE ARRAY, LOOKING UP EACH USERS Job Experience LISTED IN THE DATABASE
    console.log(jobseekers.length);
    for (var i = 0; i < jobseekers.length; i++) {
      // NEED TO USE ASYNC/AWAIT OTHERWISE LOOP WILL JUST BREAK
      await fetch(
        `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata/jobexperience?userEmail=${
          jobseekers[i].userEmail
        }`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result.length + result);
          // IF RESULT.LENGTH == 0 IT MEANS THE USER HAS NO JOBEXPERIENCE INFORMATION IN THE DATABASE SO WE WILL GET AN ERROR IF WE TRY TO ACCESS IT
          if (result.length > 0) {
            for (var i=0; i<result.length; i++){
              jobseekers[i].userExperience = result[i];
            }
          }
        });
    }

    this.setState({
      experienceSet: true,
    });
  }

  async getEducation() {
    // ITERATE THROUGH THE LENGTH OF THE ARRAY, LOOKING UP EACH USERS Job Experience LISTED IN THE DATABASE
    console.log(jobseekers.length);
    for (var i = 0; i < jobseekers.length; i++) {
      // NEED TO USE ASYNC/AWAIT OTHERWISE LOOP WILL JUST BREAK
      await fetch(
        `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata/education?userEmail=${
          jobseekers[i].userEmail
        }`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result.length);
          // IF RESULT.LENGTH == 0 IT MEANS THE USER HAS NO JOBEXPERIENCE INFORMATION IN THE DATABASE SO WE WILL GET AN ERROR IF WE TRY TO ACCESS IT
          if (result.length > 0) {
            for (var i=0; i<result.length; i++){
              jobseekers[i].userEducation = result[i];
            }
          }
        });
    }

    this.setState({
      educationSet: true,
    });
  }

  setCandidate = () => {
    // CHECK IF INITIALISED IS TRUE (MEANING THE END OF getSkills() HAS BEEN REACHED AND ALL THE DATA IS SET)
    if (
      this.state.initialised &&
      this.state.skillsFiltered &&
      this.state.skillsSet &&
      this.state.experienceSet
    ) {
      if (jobseekers[num] != null) {
        // SET OUR STATE currentCandidate TO THE FIRST INDEX OF OUR FILTERED JOBSEEKERS ARRAY
        this.setState({
          currentCandidate: jobseekers[num],
          });
        this.setState({
          currentCandidatesSkills: this.state.currentCandidate.userSkills,
          });

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
    if (this.state.initialised && this.state.skillsSet && this.state.experienceSet) {
      for (var i = 0; i < jobseekers.length; i++) {
        if (
          !this.state.filters.every((r) => jobseekers[i].userSkills.includes(r))
        ) {
          console.log("not a match");
          jobseekers.splice(i, 1);
          i--;
        }
      }
    } else {
      // IF INITIALISED IS FALSE, RECHECK IN 250ms OTHERWISE OUR DATA WILL BE UNDEFINED
      setTimeout(this.filterJobseekers, 250);
    }
    this.setState({
      skillsFiltered: true,
    });
  };

  acceptCandidate = () => {
    if (
      this.state.initialised &&
      this.state.skillsFiltered &&
      this.state.skillsSet &&
      this.state.experienceSet
    ) {
      // Post the match to the databsae
      try {
        const params = {
          userEmail: jobseekers[num].userEmail,
          jobKey: "testJobCandidatesPage",
          matchId: "testMatchIdJobCandidatesPage",
        };
        axios.post(
          "https://ddar54uzr6.execute-api.ap-southeast-2.amazonaws.com/prod/",
          params
        );

        this.likeNotification();
      } catch (err) {
        console.log(`An error has occurred: ${err}`);
      }

      // Increment the current index and check if there are still more candidates to show
      num++;
      if (num >= jobseekers.length) {
        this.setState({noCandidates: true})
      } else {
        this.setState({
          currentCandidate: jobseekers[num],
          currentCandidatesSkills: jobseekers[num].userSkills,
        });
      }
    }
  };

  rejectCandidate = () => {
    if (
      this.state.initialised &&
      this.state.skillsFiltered &&
      this.state.skillsSet &&
      this.state.experienceSet
    ) {
      num++;

      this.passNotification();

      if (num >= jobseekers.length) {
        this.setState({noCandidates: true})
      } else {
        this.setState({
          currentCandidate: jobseekers[num],
          currentCandidatesSkills: jobseekers[num].userSkills,
        });

      }
    }
  };

  likeNotification = () => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message:
        "You matched with " +
        this.state.currentCandidate.userFirstName +
        ". Head to the chat page to start a conversation with them!",
      level: "success",
      position: "br",
    });
  };

  passNotification = () => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message:
        "You passed " +
        this.state.currentCandidate.userFirstName +
        ". They won't be shown to you again for this job profile.",
      level: "error",
      position: "br",
    });
  };

  render() {
    return (
      <Container>
        <NotificationSystem ref={this.notificationSystem} />
        {this.state.initialised &&
        this.state.skillsFiltered &&
        this.state.skillsSet &&
        this.state.experienceSet &&
        this.state.noCandidates === false ? (
          <div>
            <div className="margin1">
              <h1 className="zeroMargin">
                <p>
                  {this.state.currentCandidate.userFirstName}{" "}
                  {this.state.currentCandidate.userLastName}
                </p>
              </h1>
              <Icon prefix="fa" name="map-marker" />
              &nbsp;
              <span>{this.state.currentCandidate.userCity}, Australia</span>
            </div>

            <div className="infoRow">
              <div className="infoLabel">
                <span>ABOUT</span>
              </div>
              <div className="info">
                <span>{this.state.currentCandidate.userAbout}</span>
              </div>
            </div>

            <div className="infoRow">
              <div className="infoLabel">
                <span>TOP SKILLS</span>
              </div>
              <div className="info">
                {
                  this.state.currentCandidatesSkills.map(skill => (
                    <div className="padding">
                      <span className="boxPadding skillBox">{skill}</span>
                    </div>
                  ))
                  }
              </div>
            </div>

            <div className="infoRow">
              <div className="infoLabel">
                <span>EXPERIENCE</span>
              </div>
              <div className="infoExperienceEducation">
                <p><strong>{this.state.currentCandidate.userExperience.userJobTitle}</strong></p>
                <span>{this.state.currentCandidate.userExperience.userJobDescription}</span>
              </div>
              <div className="dateAndLocation">
                <p className="margin2">{this.state.currentCandidate.userExperience.userJobStartDate + "-" + this.state.currentCandidate.userExperience.userJobEndDate}</p>
                <p className="zeroMargin">{this.state.currentCandidate.userExperience.userJobLocation}</p>
              </div>
            </div>

            <div className="infoRow">
              <div className="infoLabel">
                <span>EDUCATION</span>
              </div>
              <div className="infoExperienceEducation">
                <p><strong>{this.state.currentCandidate.userEducation.userEducationTitle}</strong></p>
                <span>{this.state.currentCandidate.userEducation.userEducationDescription}</span>
              </div>
              <div className="dateAndLocation">
                <p className="margin2">{this.state.currentCandidate.userEducation.userEducationStartDate + "-" + this.state.currentCandidate.userEducation.userEducationEndDate}</p>
                <p className="zeroMargin">{this.state.currentCandidate.userEducation.userEducationLocation}</p>
              </div>
            </div>

            <div className="buttonBox buttonBorder">
              <Button
                className="buttonwidth passButton"
                onClick={this.rejectCandidate}
              >
                <Icon prefix="fa" name="times" />
                {""} Pass
                {""}
              </Button>
            </div>
            <div className="buttonBox">
              <Button
                className="buttonwidth likeButton"
                onClick={this.acceptCandidate}
              >
                <Icon prefix="fa" name="check" />
                {""} Like
                {""}
              </Button>
            </div>
          </div>
        ) : this.state.noCandidates ? (
          <p className="noCandidates"> There are no more suitable candidates to show for the selected job profile. If you have filters on, you can try removing some in order to view a broader range of candidates. Otherwise,
          you can check back another time when additional candidates are found for your chosen filters.</p>
        ) : (
          <div id="candidatesLoader">
            <Card.Body>
              <Dimmer active loader />
              <p> Fetching Candidates... </p>
            </Card.Body>
          </div>
        )}
      </Container>
    );
  }
}

export default JobCandidates;
