// @flow

import * as React from "react";

import { Container, Card, Dimmer, Icon } from "tabler-react";
import { Button } from "semantic-ui-react";
import axios from "axios";

import NotificationSystem from "react-notification-system";

var jobseekers = [];
var num = 0;

class JobCandidates extends React.Component {
  notificationSystem = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      initialised: false,
      skillsSet: false,
      skillsFiltered: false,
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
        jobseekers.length = 0;
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

  setCandidate = () => {
    // CHECK IF INITIALISED IS TRUE (MEANING THE END OF getSkills() HAS BEEN REACHED AND ALL THE DATA IS SET)
    if (
      this.state.initialised &&
      this.state.skillsFiltered &&
      this.state.skillsSet
    ) {
      if (jobseekers[num] != null) {
        // SET OUR STATE currentCandidate TO THE FIRST INDEX OF OUR FILTERED JOBSEEKERS ARRAY
        this.setState({ currentCandidate: jobseekers[num] });
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
    if (this.state.initialised && this.state.skillsSet) {
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
      this.state.skillsSet
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
        console.log("no more candidates");
        // CAN ADD IN SOME LOGIC FOR WHAT TO DO WHEN THERE'S NO MORE CANDIDATES (REMOVE INFO AND DISPLAY A MESSAGE, POPUP, ALERT, ETC.)
        alert("No more candidates available at this time");
      } else {
        this.setState({
          currentCandidate: jobseekers[num],
        });
      }
    }
  };

  rejectCandidate = () => {
    if (
      this.state.initialised &&
      this.state.skillsFiltered &&
      this.state.skillsSet
    ) {
      num++;

      this.passNotification();

      if (num >= jobseekers.length) {
        console.log("no more candidates");
        // CAN ADD IN SOME LOGIC FOR WHAT TO DO WHEN THERE'S NO MORE CANDIDATES (REMOVE INFO AND DISPLAY A MESSAGE, POPUP, ALERT, ETC.)
        alert("No more candidates available at this time");
      } else {
        this.setState({
          currentCandidate: jobseekers[num],
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
        this.state.skillsSet ? (
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
                <p>{this.state.currentCandidate.userSkills}</p>
              </div>
            </div>

            <div className="infoRow">
              <div className="infoLabel">
                <span>JOB EXPERIENCE</span>
              </div>
              <div className="info">
                <p />
              </div>
            </div>

            <div className="infoRow">
              <div className="infoLabel">
                <span>EDUCATION</span>
              </div>
              <div className="info">
                <p />
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
