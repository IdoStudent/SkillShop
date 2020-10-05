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
            // change to DUMMY_DATA for fake result
            messages: DUMMY_DATA,
            message: "",
            jobTitles: [],
            currentPosition: "",
            currentEmployer: "",
            userType: "",
            jobKeys: [],
            employersList: [],
            search: "",
            matchId: "abcdefg",
            employersEmails: [],
            Loading: true
        }
    }

    async componentDidMount() {   
        await this.getMatches();
        this.getJobTitles();
        this.getUserType();
        this.getMatchId();
        this.getMessage();
        await this.getEmployersEmail();
        
        //test
        console.log('my email:',Auth.user.attributes.email);
        console.log('user type:', this.state.userType);

        this.setState({ loading : false });
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

    async getUserName(email){
        console.log('Get User Name for email:',email);
        console.log( await fetch( `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` + email )
            .then((res) => res.json())
            .then((result) => {
                console.log('result',result.Item.userFirstName);
                return result.Item.userFirstName;
            })
        )
    }

    // get all matches with userEmail from matches table
    async getMatches() {
        const email =  Auth.user.attributes.email
        await fetch(
            `https://ddar54uzr6.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` + email )
            .then((res) => res.json())
            .then((result) => {
                for (var i = 0; i < result.length; i++){
                    this.state.jobKeys.push({ key : result[i].jobKey , lastUpdate : "1d" , email : result[i].userEmail });
                }
            })
    }

    // get just matchID for email
    getMatchId() {
        const email =  Auth.user.attributes.email
        fetch(
            `https://ddar54uzr6.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` +
              email )
            .then((res) => res.json())
            .then((result) => {
                console.log('result length',result.length);
                    // this.setState({     
                    //     matchId: result[0].matchId
                    // });
                },
            )
      }

    // get messages depending on matchId 
    async  getMessage() {
        const matchId = this.state.matchId;
        console.log("matchId in message: " + matchId)
        fetch(
            `https://rxo4bx6gwa.execute-api.ap-southeast-2.amazonaws.com/prod/?matchId=1` )
            .then((res) => res.json())
            .then((result) => {
                for (var i = 0; i < result.length; i++)
                    this.state.messages.push({ messages: result[i].messages , lastUpdate : "1d" });
                },
            )
    }

    // getEmployersEmail(key){
    //     console.log('getEmployersEmail');
    //     console.log('key:',key);

    //     // var email = "ido";

    //     fetch(
    //         `https://s38llqiaed.execute-api.ap-southeast-2.amazonaws.com/prod/?jobKey=` + key )
    //         .then((res) => res.json())
    //         .then((result) => {
    //             console.log('result:',result[0].userEmail);
    //             // this.email = result[0].userEmail;
    //             this.setState({ employersEmail: result[0].userEmail });
    //         },)

    //     console.log('this email:',this.state.employersEmail);
    //     return this.state.employersEmail
    // }

    getEmployersEmail = async () => {
        console.log('getEmployersEmail');
        console.log('jobKeys length:',this.state.jobKeys.length);
        for(var i=0;i<this.state.jobKeys.length;i++){
            console.log('jobKey',this.state.jobKeys[i]);

            await fetch(`https://s38llqiaed.execute-api.ap-southeast-2.amazonaws.com/prod/?jobKey=` + this.state.jobKeys[i].key )
                .then((res) => res.json())
                .then((result) => {
                    console.log('Result:',result[0].userEmail);
                    this.state.employersEmails.push({ key : this.state.jobKeys[i].key , email : result[0].userEmail });
                })
        }

        console.log('length of employers',this.state.employersEmails.length);
        for(var i=0;i<this.state.employersEmails.length;i++){
            console.log('employer Email:',this.state.employersEmails[i]);
        }
    }

    chooseEmployer = (employer) => {
        console.log("Choose Employer");
        console.log("name:",employer.key)
        

    }

    handleSearchChange = (event) => {
        // console.log("event:",event.target.value);
        this.setState({search: event.target.value});
        // console.log("search value:",this.state.search);
    }

    //get match id with jobkey
    handleDropDownMenu = (event) => {
        // console.log('get match id: ' + this.state.matchId);
        // console.log('get message: ' + this.state.messages);

        // console.log(event.target.value);

        // console.log(this.state.jobTitles[0].jobKey);
        this.setState({ currentPosition: event.target.value });
        console.log('current position:',this.state.currentPosition);
    }

    handleMessageChange = (event) => {
        this.setState({message: event.target.value});
    }
    
    handleMessageSubmit = async (event) => {
        
        var date = new Date();
        var time = date.getTime();

        try {
            const params = {
              matchId:  "abcdefghi",
              messageTime: time,
              message: this.state.message,
              userName: Auth.user.attributes.email
            };
            await axios.post(
              "https://rxo4bx6gwa.execute-api.ap-southeast-2.amazonaws.com/prod",
              params
            );
          } catch (err) {
            console.log(`An error has occurred: ${err}`);
          }

          this.setState({message: ""});
    };

    getJobTitles = (event) => {
        console.log('get job titles');
        const email =  Auth.user.attributes.email
        fetch(
            `https://vsym28sl18.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` + email)
            .then((res) => res.json())
            .then((result) => {
                for (var i = 0; i < result.length; i++)
                    this.setState({ jobTitles: this.state.jobTitles.concat({jobTitle: result[i].jobTitle, jobKey: result[i].jobKey}) });
                },
            )
    }

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
                                            <select className="dropdown" onChange={this.handleDropDownMenu}>
                                                <option disabled selected value> -- select a position -- </option>
                                                {this.state.jobTitles.map(jobTitle => {
                                                    return(
                                                        <option value={jobTitle.jobKey}>{jobTitle.jobTitle}</option>
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
                            {this.state.search=="" && this.state.userType=="jobseeker" &&
                                <Grid.Col className="col-3 list">
                                    <ul className="emp-list">
                                        {this.state.jobKeys.map(employer => {
                                            // console.log('length of employers render',this.state.employersEmails.length);
                                            // console.log('is it true?',employer.key == this.state.employersEmails[0].key);
                                            return(
                                                <li key={employer.id} className="emp-item">
                                                    <button className="my-button-list" onClick={() => this.chooseEmployer(employer)}>
                                                        <div className="last-update">{employer.lastUpdate}</div>
                                                        {/* {this.state.employersEmails[0] ? <div className="button-text">{this.state.employersEmails
                                                        .filter((emp) => emp.key == employer.key).email}</div> : 'ido'} */}
                                                        {this.state.loading == false ? <div className="button-text">{this.state.employersEmails
                                                        .filter((emp) => emp.key == employer.key)[0].email}</div> : 'Loading...'}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Grid.Col>
                            }
                            {this.state.search!="" && this.state.userType=="jobseeker" &&
                                <Grid.Col className="col-3 list">
                                    <ul className="emp-list">
                                        {this.state.jobKeys.filter(k => k.key.indexOf(this.state.search) > -1).map(employer => {
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
                            {/* employer side list */}
                            {this.state.search=="" && this.state.userType=="employer" &&
                                <Grid.Col className="col-3 list">
                                    <ul className="emp-list">
                                        {this.state.jobKeys.map(employer => {
                                            return(
                                                <li key={employer.id} className="emp-item">
                                                    <button className="my-button-list" onClick={() => this.chooseEmployer(employer)}>
                                                        <div className="last-update">{employer.lastUpdate}</div>
                                                        <div className="button-text">{employer.email}</div>
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
                                            <input className="input-text" type="text" placeholder="Type message here..." name="message" value={this.state.message} onChange={this.handleMessageChange}></input>
                                        </Grid.Col>
                                        <Grid.Col className="col-3 col-sm-2 col-md-2 col-lg-1">
                                            <button className="my-button fa fa-send-o" onClick={this.handleMessageSubmit}></button>
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