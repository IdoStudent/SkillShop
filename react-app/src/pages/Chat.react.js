import React, { Component } from "react";
import { Container, Grid } from "tabler-react";
import SiteWrapper from "../SiteWrapper.react";
import Auth from "@aws-amplify/auth";
import axios from "axios";

const DUMMY_DATA = [
    {
        senderID: "Employer's Name",
        senderRole: "Employer",
        text: "Hello, how are you?"
    },
    {
        senderID: "You",
        senderRole: "jobseeker",
        text: "I'm good, thank you!"
    },
    {
        senderID: "Employer's Name",
        senderRole: "Employer",
        text: "I viewed your resume and I was deeply impressed."
    },
    {
        senderID: "You",
        senderRole: "jobseeker",
        text: "That's great to read!"
    },
    {
        senderID: "Employer's Name",
        senderRole: "Employer",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        senderID: "You",
        senderRole: "jobseeker",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        senderID: "Employer's Name",
        senderRole: "Employer",
        text: "You're hired!"
    },
    {
        senderID: "You",
        senderRole: "jobseeker",
        text: "You will not regret this, sir."
    }
]

const JOB_POSITIONS_DUMMY_DATA = [
    {
        jobTitle: "Driver"
    },
    {
        jobTitle: "Programmer"
    },
    {
        jobTitle: "Manager"
    }
]

class Chat extends Component {
    constructor(){
        super()
        this.state = {
            messages: DUMMY_DATA,
            jobTitles: JOB_POSITIONS_DUMMY_DATA,
            currentEmployer: "",
            userType: "",
            jobKey: [],
            search: ""
        }
    }
    // get user type from user table
    getUserType() {
        const email =  Auth.user.attributes.email
        console.log("email: ",email);
        fetch(
            `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +
                email )
            .then((res) => res.json())
            .then((result) => {
                if (result.Item !== undefined)
                    this.setState({     
                        userType: result.Item.userType
                    });
                },
            )
      }
    // get all matches with userEmail from matches table
    getMatches() {
        const email =  Auth.user.attributes.email
        console.log("get matches",email);
        fetch(
            `https://ddar54uzr6.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` +
              email )
            .then((res) => res.json())
            .then((result) => {
                for (var i = 0; i < result.length; i++)
                    this.state.jobKey.push({ key : result[i].jobKey , lastUpdate : "1d" });
                },
            )
    }


    getMessage() {
        const matchId =  Auth.user.attributes.email
        fetch(
            `https://rxo4bx6gwa.execute-api.ap-southeast-2.amazonaws.com/prod/?matchId=` +
              matchId )
            .then((res) => res.json())
            .then((result) => {
                for (var i = 0; i < result.length; i++)
                    this.state.jobKey.push({ key : result[i].jobKey , lastUpdate : "1d" });
                },
            )
    }

    componentDidMount() {
        this.getUserType();
        this.getMatches();
        this.getMessage();
    }

    chooseEmployer = (employer) => {
        console.log("Choose Employer");
        console.log("name:",employer.key)
        this.setState({ currentEmployer:employer.key });
        // console.log("User type2",this.state.userType);
    }

    handleSearchChange = (event) => {
        // console.log("event:",event.target.value);
        this.setState({search: event.target.value});
        // console.log("search value:",this.state.search);
    }

    handleMessageSubmit = async (event) => {
        
        try {
            const params = {
              matchId:  "abc",
              messageTime: 123456789,
              message: "test",
              userName: "test"
            };
            await axios.post(
              "https://rxo4bx6gwa.execute-api.ap-southeast-2.amazonaws.com/prod",
              params
            );
          } catch (err) {
            console.log(`An error has occurred: ${err}`);
          }
        };
    

    render(){
        return(
            <SiteWrapper>
                <div className="my-body">
                    <Container className="container">
                        {/* Header */}
                        <Grid.Row className="row">
                            {/* JobSeeker Search */}
                            {this.state.userType=="jobseeker" && 
                                <Grid.Col className="col-3 search">
                                    <input className="input-text-search" type="text" placeholder="Search" value={this.state.search} onChange={this.handleSearchChange}></input>
                                </Grid.Col>
                            }
                            {/* Employer drop down menu */}
                            {this.state.userType=="employer" && 
                                <Grid.Col className="col-3 search">
                                    <div>
                                        <form>
                                            <select className="dropdown">
                                                {this.state.jobTitles.map(jobTitle => {
                                                    return(
                                                        <option value={jobTitle.jobTitle} onChange="">{jobTitle.jobTitle}</option>
                                                    )
                                                })}
                                            </select>
                                        </form>
                                    </div>        
                                </Grid.Col>
                            }
                            {/* Title */}
                            <Grid.Col className="col-9 title">
                                <div className="title-text">{this.state.currentEmployer}</div>
                            </Grid.Col>
                        </Grid.Row>
                        {/* Body */}
                        <Grid.Row className="row">
                            {/* List */}
                            {this.state.search=="" &&
                                <Grid.Col className="col-3 list">
                                    <ul className="emp-list">
                                        {this.state.jobKey.map(employer => {
                                            return(
                                                <li key={employer.id} className="emp-item">
                                                    <button className="my-button-list" onClick={() => this.chooseEmployer(employer)}>
                                                        <div className="last-update">{employer.lastUpdate}</div>
                                                        <div className="button-text">{employer.key}</div>
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Grid.Col>
                            }
                            {this.state.search!="" &&
                                <Grid.Col className="col-3 list">
                                    <ul className="emp-list">
                                        {this.state.jobKey.filter(k => k.key.indexOf(this.state.search) > -1).map(employer => {
                                            return(
                                                <li key={employer.id} className="emp-item">
                                                    <button className="my-button-list" onClick={() => this.chooseEmployer(employer)}>
                                                        <div className="last-update">{employer.lastUpdate}</div>
                                                        <div className="button-text">{employer.key}</div>
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Grid.Col>
                            }
                            {/* Chat */}
                            <Grid.Col className="col-9">
                                {/* Messages */}
                                <Grid.Row className="row chat-box">
                                    <ul className="message-list">
                                        {this.state.messages.map(message => {
                                            return(
                                                <li key={message.id} className={"message-" + message.senderRole}>
                                                    <div>
                                                        {message.senderID}
                                                    </div>
                                                    <div>
                                                        {message.text}
                                                    </div>
                                                    <div className="divider">empty</div>
                                                </li>
                                            )
                                        })}
                                    </ul>      
                                </Grid.Row>
                                {/* Input */}
                                <Grid.Row className="row text-box">
                                    <Grid.Col className="col-9 col-sm-10 col-md-10 col-lg-11">
                                        <input className="input-text" type="text" placeholder="Type message here..."></input>
                                    </Grid.Col>
                                    <Grid.Col className="col-3 col-sm-2 col-md-2 col-lg-1">
                                        <button className="fa fa-send-o my-button" onClick={this.handleMessageSubmit}>
                                        </button>
                                    </Grid.Col>
                                </Grid.Row>   

                            </Grid.Col>
                        </Grid.Row>
                                    
                    </Container>
                </div>
            </SiteWrapper>
        )
    }
}

export default Chat;