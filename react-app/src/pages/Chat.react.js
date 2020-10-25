import React, { Component } from "react";
import { Container, Grid, Header, Form, Dimmer, Card } from "tabler-react";
import { Button, Icon } from "semantic-ui-react";
import SiteWrapper from "../SiteWrapper.react";
import Auth from "@aws-amplify/auth";
import axios from "axios";

function compare(a, b) {
  //split numbers and letters
  var pattern1 = /[0-9]/g;
  var pattern2 = /[a-zA-Z]/g;
  var lettersA = a.lastUpdate.match(pattern2);
  var numbersA = a.lastUpdate.match(pattern1);
  var lettersB = b.lastUpdate.match(pattern2);
  var numbersB = b.lastUpdate.match(pattern1);

  let comparison = 0;
  if (lettersA == "y") {
    if (
      lettersB == "w" ||
      lettersB == "d" ||
      lettersB == "h" ||
      lettersB == "m" ||
      lettersB == "s"
    ) {
      comparison = 1;
    } else {
      if (numbersA > numbersB) {
        comparison = 1;
      } else {
        comparison = -1;
      }
    }
  }
  if (lettersA == "w") {
    if (
      lettersB == "d" ||
      lettersB == "h" ||
      lettersB == "m" ||
      lettersB == "s"
    ) {
      comparison = 1;
    } else if (lettersB == "y") {
      comparison = -1;
    } else {
      if (numbersA > numbersB) {
        comparison = 1;
      } else {
        comparison = -1;
      }
    }
  }
  if (lettersA == "d") {
    if (lettersB == "h" || lettersB == "m" || lettersB == "s") {
      comparison = 1;
    } else if (lettersB == "y" || lettersB == "w") {
      comparison = -1;
    } else {
      if (numbersA > numbersB) {
        comparison = 1;
      } else {
        comparison = -1;
      }
    }
  }
  if (lettersA == "h") {
    if (lettersB == "m" || lettersB == "s") {
      comparison = 1;
    } else if (lettersB == "y" || lettersB == "w" || lettersB == "d") {
      comparison = -1;
    } else {
      if (numbersA > numbersB) {
        comparison = 1;
      } else {
        comparison = -1;
      }
    }
  }
  if (lettersA == "m") {
    if (lettersB == "s") {
      comparison = 1;
    } else if (
      lettersB == "y" ||
      lettersB == "w" ||
      lettersB == "d" ||
      lettersB == "h"
    ) {
      comparison = -1;
    } else {
      if (numbersA > numbersB) {
        comparison = 1;
      } else {
        comparison = -1;
      }
    }
  }
  if (lettersA == "s") {
    if (
      lettersB == "w" ||
      lettersB == "d" ||
      lettersB == "h" ||
      lettersB == "m" ||
      lettersB == "y"
    ) {
      comparison = -1;
    } else {
      if (numbersA > numbersB) {
        comparison = 1;
      } else {
        comparison = -1;
      }
    }
  }
  return comparison;
}

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      message: "",
      jobTitles: [],
      currentPosition: "",
      chosenUser: "",
      chosenUserEmail: "",
      userType: "",
      jobKeys: [],
      employersList: [],
      search: "",
      matchId: "abcdefg",
      employersEmails: [],
      employersNames: [],
      jobseekersEmails: [],
      jobSeekersEmailsList: [],
      jobseekersNames: [],
      currentMatchID: "",
      matchIDs: [],
      loading: true,
    };
  }

  async componentDidMount() {
    console.log("my email:", Auth.user.attributes.email);
    await this.getUserType();
    console.log("user type:", this.state.userType);

    if (this.state.userType == "jobseeker") {
      await this.getMatches();
      await this.getEmployersEmail();
      await this.getEmployersNames();
      await this.getSeekMatchID();
      await this.getSeekMessages();
    } else if (this.state.userType == "employer") {
      await this.getJobTitles();
      await this.getJobseekersEmails();
      await this.getJobseekersNames();
      await this.getEmpMatchID();
      await this.getEmpMessages();
      this.setState({ loading: false });
    }

    //finish loading
    this.setState({ loading: false });
  }

  /* GENERAL */

  // get user type from user table
  async getUserType() {
    const email = Auth.user.attributes.email;
    await fetch(
      `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +
        email
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.Item !== undefined)
          this.setState({
            userType: result.Item.userType,
          });
      });
  }

  /* JOBSEEKER */

  // get all matches with userEmail from matches table (jobseeker)
  async getMatches() {
    const email = Auth.user.attributes.email;
    await fetch(
      `https://ddar54uzr6.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` +
        email
    )
      .then((res) => res.json())
      .then((result) => {
        for (var i = 0; i < result.length; i++) {
          //get last updated
          var timeFrame = "s";
          var date = new Date();
          var time = date.getTime();
          var timeDifference = time - result[i].lastUpdated;
          var lastUpdated = timeDifference / 1000; //to seconds
          if (lastUpdated > 60) {
            lastUpdated = lastUpdated / 60; //to minutes
            timeFrame = "m";
            if (lastUpdated > 60) {
              lastUpdated = lastUpdated / 60; //to hours
              timeFrame = "h";
              if (lastUpdated > 24) {
                lastUpdated = lastUpdated / 24; //to days
                timeFrame = "d";
                if (lastUpdated > 7) {
                  lastUpdated = lastUpdated / 7; //to weeks
                  timeFrame = "w";
                  if (lastUpdated > 52) {
                    lastUpdated = lastUpdated / 52; //to years
                    timeFrame = "y";
                  }
                }
              }
            }
          }
          lastUpdated = Math.round(lastUpdated);
          lastUpdated = lastUpdated + timeFrame;
          // console.log('lastUpdate:',lastUpdated);

          this.state.jobKeys.push({
            key: result[i].jobKey,
            lastUpdate: lastUpdated,
            email: result[i].userEmail,
          });
        }
      });
  }

  getEmployersEmail = async () => {
    for (var i = 0; i < this.state.jobKeys.length; i++) {
      await fetch(
        `https://s38llqiaed.execute-api.ap-southeast-2.amazonaws.com/prod/?jobKey=` +
          this.state.jobKeys[i].key
      )
        .then((res) => res.json())
        .then((result) => {
          this.state.employersEmails.push({
            key: this.state.jobKeys[i].key,
            email: result[0].userEmail,
          });
        });
    }
  };

  getEmployersNames = async () => {
    for (var i = 0; i < this.state.employersEmails.length; i++) {
      await fetch(
        `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +
          this.state.employersEmails[i].email
      )
        .then((res) => res.json())
        .then((result) => {
          if (typeof result.Item !== "undefined") {
            this.state.employersNames.push({
              key: this.state.employersEmails[i].email,
              name: result.Item.userFirstName,
            });
          }
        });
    }
  };

  getSeekMatchID = async () => {
    for (var i = 0; i < this.state.jobKeys.length; i++) {
      await fetch(
        `https://ra45wkav0m.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` +
          this.state.jobKeys[i].email +
          `&jobKey=` +
          this.state.jobKeys[i].key
      )
        .then((res) => res.json())
        .then((result) => {
          this.state.matchIDs.push({
            jobKey: this.state.jobKeys[i].key,
            email: this.state.jobKeys[i].email,
            matchID: result[0].matchId,
          });
        });
    }
  };

  // get messages depending on matchId
  getSeekMessages = async () => {
    for (var i = 0; i < this.state.matchIDs.length; i++) {
      // console.log(this.state.matchIDs[i]);
      await fetch(
        `https://rxo4bx6gwa.execute-api.ap-southeast-2.amazonaws.com/prod/?matchId=` +
          this.state.matchIDs[i].matchID
      )
        .then((res) => res.json())
        .then((result) => {
          for (var j = 0; j < result.length; j++) {
            //get name and role
            var userName = "";
            var userRole = "";
            if (result[j].userName == Auth.user.attributes.email) {
              userName = "You";
              userRole = "jobseeker";
            } else {
              userName = this.state.employersNames.filter(
                (emp) => emp.key == result[j].userName
              )[0].name;
              userRole = "Employer";
            }
            this.state.messages.push({
              matchID: result[j].matchId,
              chat: result[j].message,
              name: userName,
              role: userRole,
            });
          }
        });
    }
  };

  chooseEmployer = (employer) => {
    //set current position
    this.setState({ currentPosition: employer.key });

    //set current match id
    this.setState({
      currentMatchID: this.state.matchIDs
        .filter((match) => match.jobKey == employer.key)
        .filter((ID) => ID.email == employer.email)[0].matchID,
    });

    this.setState({
      chosenUser: this.state.employersNames.filter(
        (em) =>
          em.key ==
          this.state.employersEmails.filter((emp) => emp.key == employer.key)[0]
            .email
      )[0].name,
    });
  };

  updateSeekMatches = async () => {
    var date = new Date();
    var time = date.getTime();

    try {
      const params = {
        jobKey: this.state.currentPosition,
        userEmail: Auth.user.attributes.email,
        matchId: this.state.currentMatchID,
        lastUpdated: time,
      };
      await axios.post(
        "https://ddar54uzr6.execute-api.ap-southeast-2.amazonaws.com/prod/",
        params
      );
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  /* EMPLOYER */

  getJobTitles = async (event) => {
    const email = Auth.user.attributes.email;
    await fetch(
      `https://vsym28sl18.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` +
        email
    )
      .then((res) => res.json())
      .then((result) => {
        for (var i = 0; i < result.length; i++)
          this.setState({
            jobTitles: this.state.jobTitles.concat({
              jobTitle: result[i].jobTitle,
              jobKey: result[i].jobKey,
            }),
          });
      });
  };

  getJobseekersEmails = async () => {
    for (var i = 0; i < this.state.jobTitles.length; i++) {
      await fetch(
        `https://q35g00j27k.execute-api.ap-southeast-2.amazonaws.com/prod/?jobKey=` +
          this.state.jobTitles[i].jobKey
      )
        .then((res) => res.json())
        .then((result) => {
          for (var j = 0; j < result.length; j++) {
            console.log("lastUpdated:", result[j]);

            //get last updated
            var timeFrame = "s";
            var date = new Date();
            var time = date.getTime();
            var timeDifference = time - result[j].lastUpdated;
            var lastUpdated = timeDifference / 1000; //to seconds
            if (lastUpdated > 60) {
              lastUpdated = lastUpdated / 60; //to minutes
              timeFrame = "m";
              if (lastUpdated > 60) {
                lastUpdated = lastUpdated / 60; //to hours
                timeFrame = "h";
                if (lastUpdated > 24) {
                  lastUpdated = lastUpdated / 24; //to days
                  timeFrame = "d";
                  if (lastUpdated > 7) {
                    lastUpdated = lastUpdated / 7; //to weeks
                    timeFrame = "w";
                    if (lastUpdated > 52) {
                      lastUpdated = lastUpdated / 52; //to years
                      timeFrame = "y";
                    }
                  }
                }
              }
            }
            lastUpdated = Math.round(lastUpdated);
            lastUpdated = lastUpdated + timeFrame;

            this.state.jobseekersEmails.push({
              key: this.state.jobTitles[i].jobKey,
              lastUpdate: lastUpdated,
              email: result[j].userEmail,
            });
            this.state.jobSeekersEmailsList.push(result[j].userEmail);
          }
        });
    }
  };

  getJobseekersNames = async () => {
    for (var i = 0; i < this.state.jobSeekersEmailsList.length; i++) {
      await fetch(
        `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +
          this.state.jobSeekersEmailsList[i]
      )
        .then((res) => res.json())
        .then((result) => {
          if (typeof result.Item !== "undefined") {
            this.state.jobseekersNames.push({
              key: this.state.jobSeekersEmailsList[i],
              name: result.Item.userFirstName,
            });
          }
        });
    }
  };

  getEmpMatchID = async () => {
    for (var i = 0; i < this.state.jobseekersEmails.length; i++) {
      await fetch(
        `https://ra45wkav0m.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` +
          this.state.jobseekersEmails[i].email +
          `&jobKey=` +
          this.state.jobseekersEmails[i].key
      )
        .then((res) => res.json())
        .then((result) => {
          this.state.matchIDs.push({
            jobKey: this.state.jobseekersEmails[i].key,
            email: this.state.jobseekersEmails[i].email,
            matchID: result[0].matchId,
          });
        });
    }
  };

  // get messages depending on matchId
  getEmpMessages = async () => {
    for (var i = 0; i < this.state.matchIDs.length; i++) {
      await fetch(
        `https://rxo4bx6gwa.execute-api.ap-southeast-2.amazonaws.com/prod/?matchId=` +
          this.state.matchIDs[i].matchID
      )
        .then((res) => res.json())
        .then((result) => {
          for (var j = 0; j < result.length; j++) {
            //get name and role
            var userName = "";
            var userRole = "";
            if (result[j].userName == Auth.user.attributes.email) {
              userName = "You";
              userRole = "Employer";
            } else {
              userName = this.state.jobseekersNames.filter(
                (jobseeker) => jobseeker.key == result[j].userName
              )[0].name;
              userRole = "jobseeker";
            }
            this.state.messages.push({
              matchID: result[j].matchId,
              chat: result[j].message,
              name: userName,
              role: userRole,
            });
          }
        });
    }
  };

  chooseJobseeker = (jobseeker) => {
    this.setState({ chosenUserEmail: jobseeker.email });

    //set current match ID
    this.setState({
      currentMatchID: this.state.matchIDs
        .filter((match) => match.jobKey == jobseeker.key)
        .filter((ID) => ID.email == jobseeker.email)[0].matchID,
    });
    this.setState({
      chosenUser: this.state.jobseekersNames.filter(
        (js) => js.key == jobseeker.email
      )[0].name,
    });
  };

  updateEmpMatches = async () => {
    console.log("update employer matches");

    var date = new Date();
    var time = date.getTime();

    try {
      const params = {
        jobKey: this.state.currentPosition,
        userEmail: this.state.chosenUserEmail,
        matchId: this.state.currentMatchID,
        lastUpdated: time,
      };
      await axios.post(
        "https://ddar54uzr6.execute-api.ap-southeast-2.amazonaws.com/prod/",
        params
      );
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  /* HANDLERS */

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  };

  //get match id with jobkey
  handleDropDownMenu = (event) => {
    this.setState({ currentPosition: event.target.value });
    this.setState({ chosenUser: "" });
    console.log("current position:", this.state.currentPosition);
  };

  handleMessageSubmit = async (event) => {
    var date = new Date();
    var time = date.getTime();

    //update matches
    if (this.state.userType == "jobseeker") {
      await this.updateSeekMatches();
    } else {
      await this.updateEmpMatches();
    }

    if (this.state.currentMatchID !== "") {
      try {
        const params = {
          matchId: this.state.currentMatchID,
          messageTime: time,
          message: this.state.message,
          userName: Auth.user.attributes.email,
        };
        await axios.post(
          "https://rxo4bx6gwa.execute-api.ap-southeast-2.amazonaws.com/prod",
          params
        );
      } catch (err) {
        console.log(`An error has occurred: ${err}`);
      }
    } else {
    }

    this.setState({ message: "" });
    this.setState({ loading: true });
    this.setState({ messages: [] });
    if (this.state.userType == "employer") {
      await this.getEmpMessages();
    } else {
      await this.getSeekMessages();
    }
    this.setState({ loading: false });
  };

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value });
  };

  /* DISPLAY */

  render() {
    return (
      <div className="test">
        <SiteWrapper>
          <div className="spacer" />
          <Header.H1 className="pageHeading">Your Matches</Header.H1>
          <div className="my-body">
            {this.state.loading ? (
              <Container className="card">
                <div id="chatLoader">
                  <Dimmer active loader />
                  <p> Loading your matches and chat... </p>
                </div>
              </Container>
            ) : (
              <Container className="card">
                {/* Header */}
                <Grid.Row className="row">
                  {/* JobSeeker Search */}
                  {this.state.userType == "jobseeker" && (
                    <Grid.Col className="col-3 search">
                      <Form.Input
                        className="input-text-search"
                        type="text"
                        placeholder="Search..."
                        position="append"
                        icon="search"
                        value={this.state.search}
                        onChange={this.handleSearchChange}
                      />
                    </Grid.Col>
                  )}
                  {/* Employer drop down menu */}
                  {this.state.userType == "employer" && (
                    <Grid.Col className="col-3 search">
                      <Form.Select
                        id="profile"
                        onChange={this.handleDropDownMenu}
                      >
                        <option value="" disabled selected hidden>
                          Select a job profile
                        </option>
                        {this.state.jobTitles.map((jobTitle) => {
                          return (
                            <option value={jobTitle.jobKey}>
                              {jobTitle.jobTitle}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Grid.Col>
                  )}
                  {/* Title */}
                  <Grid.Col className="col-9 title">
                    <div className="title-text">{this.state.chosenUser}</div>
                  </Grid.Col>
                </Grid.Row>
                {/* Body */}
                <Grid.Row className="row">
                  {/* List */}
                  {this.state.search == "" &&
                    this.state.userType == "jobseeker" && (
                      <Grid.Col className="col-3 list">
                        <ul className="emp-list">
                          {this.state.jobKeys.sort(compare).map((employer) => {
                            return (
                              <li key={employer.id} className="emp-item">
                                <button
                                  className="my-button-list"
                                  onClick={() => this.chooseEmployer(employer)}
                                >
                                  <div className="last-update">
                                    {employer.lastUpdate}
                                  </div>
                                  {this.state.loading == false ? (
                                    <div className="button-text">
                                      {
                                        this.state.employersNames.filter(
                                          (em) =>
                                            em.key ==
                                            this.state.employersEmails.filter(
                                              (emp) => emp.key == employer.key
                                            )[0].email
                                        )[0].name
                                      }
                                    </div>
                                  ) : (
                                    "Loading..."
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </Grid.Col>
                    )}
                  {/* list post search */}
                  {this.state.search != "" &&
                    this.state.userType == "jobseeker" && (
                      <Grid.Col className="col-3 list">
                        <ul className="emp-list">
                          {this.state.jobKeys
                            .filter(
                              (k) =>
                                this.state.employersNames
                                  .filter(
                                    (em) =>
                                      em.key ==
                                      this.state.employersEmails.filter(
                                        (emp) => emp.key == k.key
                                      )[0].email
                                  )[0]
                                  .name.toLowerCase()
                                  .indexOf(this.state.search.toLowerCase()) > -1
                            )
                            .sort(compare)
                            .map((employer) => {
                              return (
                                <li key={employer.id} className="emp-item">
                                  <button
                                    className="my-button-list"
                                    onClick={() =>
                                      this.chooseEmployer(employer)
                                    }
                                  >
                                    <div className="last-update">
                                      {employer.lastUpdate}
                                    </div>
                                    {this.state.loading == false ? (
                                      <div className="button-text">
                                        {
                                          this.state.employersNames.filter(
                                            (em) =>
                                              em.key ==
                                              this.state.employersEmails.filter(
                                                (emp) => emp.key == employer.key
                                              )[0].email
                                          )[0].name
                                        }
                                      </div>
                                    ) : (
                                      "Loading..."
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                        </ul>
                      </Grid.Col>
                    )}
                  {/* employer side list */}
                  {this.state.loading == false ? (
                    this.state.userType == "employer" ? (
                      this.state.currentPosition !== "" ? (
                        <Grid.Col className="col-3 list">
                          <ul className="emp-list">
                            {this.state.jobseekersEmails
                              .filter(
                                (jse) => jse.key == this.state.currentPosition
                              )
                              .sort(compare)
                              .map((jobseeker) => {
                                return (
                                  <li key={jobseeker.id} className="emp-item">
                                    <button
                                      className="my-button-list"
                                      onClick={() =>
                                        this.chooseJobseeker(jobseeker)
                                      }
                                    >
                                      <div className="last-update">
                                        {jobseeker.lastUpdate}
                                      </div>
                                      <div className="button-text">
                                        {
                                          this.state.jobseekersNames.filter(
                                            (jsn) => jsn.key == jobseeker.email
                                          )[0].name
                                        }
                                      </div>
                                    </button>
                                  </li>
                                );
                              })}
                          </ul>
                        </Grid.Col>
                      ) : (
                        <Grid.Col className="col-3 list">
                          <ul className="emp-list" />
                        </Grid.Col>
                      )
                    ) : (
                      console.log("waiting...")
                    )
                  ) : (
                    <div className="alert">loading...</div>
                  )}
                  {/* Chat */}
                  <Grid.Col className="col-9">
                    {/* Messages */}
                    <Grid.Row className="row chat-box">
                      <ul className="message-list">
                        {this.state.loading == false
                          ? this.state.currentMatchID !== ""
                            ? this.state.messages
                                .filter(
                                  (m) => m.matchID == this.state.currentMatchID
                                )
                                .map((message) => {
                                  return (
                                    <li
                                      key={message.id}
                                      className={"message-" + message.role}
                                    >
                                      <div>{message.name}</div>
                                      <div>{message.chat}</div>
                                    </li>
                                  );
                                })
                            : console.log("waiting...")
                          : console.log("loading...")}
                      </ul>
                    </Grid.Row>
                    {/* Input */}
                    <Grid.Row className="row text-box" id="textBox">
                      <Grid.Col className="col-9 col-sm-10 col-md-10 col-lg-11">
                        <Form.Textarea
                          className="input-text"
                          type="text"
                          placeholder="Type message here..."
                          name="message"
                          value={this.state.message}
                          onChange={this.handleMessageChange}
                        />
                      </Grid.Col>
                      <Grid.Col className="col-3 col-sm-2 col-md-2 col-lg-1">
                        <Button
                          className="acceptButton sendButton"
                          circular
                          onClick={this.handleMessageSubmit}
                        >
                          <Icon name="send" />
                        </Button>
                      </Grid.Col>
                    </Grid.Row>
                  </Grid.Col>
                </Grid.Row>
              </Container>
            )}
          </div>
        </SiteWrapper>
      </div>
    );
  }
}

export default Chat;
