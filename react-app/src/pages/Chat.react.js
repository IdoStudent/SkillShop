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

class Chat extends Component {
    constructor(){
        super()
        this.state = {
            // change to DUMMY_DATA for fake result
            messages: [],
            message: "",
            jobTitles: [],
            currentPosition: "",
            chosenUser: "",
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
            Loading: true
        }
    }

    async componentDidMount() {   
        console.log('my email:',Auth.user.attributes.email);
        await this.getUserType();
        console.log('user type:', this.state.userType);

        if(this.state.userType == 'jobseeker'){
            await this.getMatches();
            await this.getEmployersEmail();
            await this.getEmployersNames();
        }
        else if(this.state.userType == 'employer'){
            await this.getJobTitles();
            await this.getJobseekersEmails();
            await this.getJobseekersNames();
            await this.getMatchID();
            await this.getMessages();
            this.setState({ loading : false });
        }

        //finish loading
        this.setState({ loading : false });
    }

    // get user type from user table
    async getUserType() {
        const email =  Auth.user.attributes.email
        await fetch(
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

    // get all matches with userEmail from matches table (jobseeker)
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

    getMatchID = async () => {
        // console.log('getMatchID');

        // console.log('jobseekers email',jobseeker.email);
        // console.log('jobseekers key',jobseeker.key);

        // console.log(`https://ra45wkav0m.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` + jobseeker.email + `idoyaron90@gmail.com&jobKey=` + jobseeker.key);

        for(var i=0;i<this.state.jobseekersEmails.length;i++){
            // console.log(this.state.jobseekersEmails[i]);
            await fetch(
                `https://ra45wkav0m.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` + this.state.jobseekersEmails[i].email 
                + `&jobKey=` + this.state.jobseekersEmails[i].key)
                .then((res) => res.json())
                .then((result) => {
                    // console.log('result:',result[0].matchId);
                    this.state.matchIDs.push({ jobKey : this.state.jobseekersEmails[i].key, email : this.state.jobseekersEmails[i].email , matchID : result[0].matchId });
                })
        }    
    }

    // get messages depending on matchId 
    getMessages = async () => {
        // console.log('get messages');

        for(var i=0;i<this.state.matchIDs.length;i++){
            // console.log(this.state.matchIDs[i]);
            await fetch(`https://rxo4bx6gwa.execute-api.ap-southeast-2.amazonaws.com/prod/?matchId=` + this.state.matchIDs[i].matchID)
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                // this.state.messages.push({ matchID : this.state.matchIDs[i].matchID, chat : result });
                for (var j=0;j<result.length;j++){
                    console.log(result[j]);
                    console.log(result[j].userName);
                    console.log(Auth.user.attributes.email);

                    //get name and role
                    var userName = ""
                    var userRole = ""
                    if(result[j].userName == Auth.user.attributes.email){
                        userName = "You";
                        userRole = "Employer";
                    }else{
                        userName = this.state.jobseekersNames.filter((jobseeker) => jobseeker.key == result[j].userName)[0].name;
                        userRole = "jobseeker";
                    }
                    console.log('name:',userName);
                    console.log('role:',userRole);
                    this.state.messages.push({ matchID : result[j].matchId, chat : result[j].message , name : userName , role : userRole });
                }
            })
        }
    }

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

    getEmployersNames = async () => {
        console.log('getEmployersNames');
        for(var i=0;i<this.state.employersEmails.length;i++){
            await fetch(`https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` + this.state.employersEmails[i].email )
                .then((res) => res.json())
                .then((result) => {
                    if(typeof result.Item !== 'undefined'){
                        console.log('user Name:',result.Item.userFirstName);
                        this.state.employersNames.push({ key : this.state.employersEmails[i].email , name : result.Item.userFirstName });
                    }
                })
        }
    }

    chooseEmployer = (employer) => {
        console.log("Choose Employer");

        console.log("name:",this.state.employersNames.filter((em) => em.key == 
        (this.state.employersEmails.filter((emp) => emp.key == employer.key)[0].email))[0].name);

        this.setState({ chosenUser : this.state.employersNames.filter((em) => em.key == 
            (this.state.employersEmails.filter((emp) => emp.key == employer.key)[0].email))[0].name});
    }

    handleSearchChange = (event) => {
        this.setState({search: event.target.value});
    }

    //get match id with jobkey
    handleDropDownMenu = (event) => {
        this.setState({ currentPosition: event.target.value });
        this.setState({ chosenUser : "" });
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

    getJobTitles = async (event) => {
        // console.log('get job titles');
        const email =  Auth.user.attributes.email
        await fetch(
            `https://vsym28sl18.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` + email)
            .then((res) => res.json())
            .then((result) => {
                for (var i = 0; i < result.length; i++)
                    this.setState({ jobTitles: this.state.jobTitles.concat({jobTitle: result[i].jobTitle, jobKey: result[i].jobKey}) });
                },
            )
    }

    getJobseekersEmails = async () => {
        for(var i=0;i<this.state.jobTitles.length;i++){
            await fetch(`https://q35g00j27k.execute-api.ap-southeast-2.amazonaws.com/prod/?jobKey=` + this.state.jobTitles[i].jobKey )
                .then((res) => res.json())
                .then((result) => {
                    for(var j=0;j<result.length;j++){
                        this.state.jobseekersEmails.push({ key : this.state.jobTitles[i].jobKey, lastUpdate : "1d" , email : result[j].userEmail });
                        this.state.jobSeekersEmailsList.push(result[j].userEmail);
                    }
                })
        }
    }

    getJobseekersNames = async () => {
        for(var i=0;i<this.state.jobSeekersEmailsList.length;i++){
            await fetch(`https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` + this.state.jobSeekersEmailsList[i] )
                .then((res) => res.json())
                .then((result) => {
                    if(typeof result.Item !== 'undefined'){
                        this.state.jobseekersNames.push({ key : this.state.jobSeekersEmailsList[i] , name : result.Item.userFirstName });
                    }
                })
        }
    }

    chooseJobseeker = (jobseeker) => {
        console.log("Choose Jobseeker");

        // console.log(jobseeker);

        //set current match ID
        // console.log('length',this.state.matchIDs.length);
        // console.log(this.state.matchIDs[0].jobKey);
        // console.log(this.state.matchIDs.filter((match) => match.jobKey == jobseeker.key).filter((ID) => ID.email == jobseeker.email)[0]);
        this.setState({ currentMatchID : this.state.matchIDs.filter((match) => match.jobKey == jobseeker.key).filter((ID) => ID.email == jobseeker.email)[0].matchID })

        // console.log("name:",this.state.jobseekersNames.filter((js) => js.key == 
        // (this.state.jobseekersEmails.filter((jsr) => jsr.key == jobseeker.key)[0].email))[0].name);

        // this.getMatchID(jobseeker);
        // this.getMessages();

        this.setState({ chosenUser : this.state.jobseekersNames.filter((js) => js.key == jobseeker.email)[0].name});
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
                                    <input className="input-text-search" type="text" placeholder="Search" value={this.state.search} 
                                        onChange={this.handleSearchChange}></input>
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
                                <div className="title-text">{this.state.chosenUser}</div>
                            </Grid.Col>
                        </Grid.Row>
                        {/* Body */}
                        <Grid.Row className="row">
                            {/* List */}
                            {this.state.search=="" && this.state.userType=="jobseeker" &&
                                <Grid.Col className="col-3 list">
                                    <ul className="emp-list">
                                        {this.state.jobKeys.map(employer => {
                                            return(
                                                <li key={employer.id} className="emp-item">
                                                    <button className="my-button-list" onClick={() => this.chooseEmployer(employer)}>
                                                        <div className="last-update">{employer.lastUpdate}</div>
                                                        {this.state.loading == false ? <div className="button-text">
                                                            {this.state.employersNames.filter((em) => em.key == 
                                                            (this.state.employersEmails.filter((emp) => emp.key == employer.key)[0].email))[0].name}
                                                        </div> : 'Loading...'}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Grid.Col>
                            }
                            {/* list post search */}
                            {this.state.search!="" && this.state.userType=="jobseeker" &&
                                <Grid.Col className="col-3 list">
                                    <ul className="emp-list">
                                        {this.state.jobKeys.filter(k => this.state.employersNames.filter((em) => em.key ==
                                        (this.state.employersEmails.filter((emp) => emp.key == k.key)[0].email))[0].name.toLowerCase()
                                        .indexOf(this.state.search.toLowerCase()) > -1).map(employer => {
                                            return(
                                                <li key={employer.id} className="emp-item">
                                                    <button className="my-button-list" onClick={() => this.chooseEmployer(employer)}>
                                                        <div className="last-update">{employer.lastUpdate}</div>
                                                        {this.state.loading == false ? <div className="button-text">
                                                            {this.state.employersNames.filter((em) => em.key == 
                                                            (this.state.employersEmails.filter((emp) => emp.key == employer.key)[0].email))[0].name}
                                                        </div> : 'Loading...'}
                                                    </button>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Grid.Col>
                            }
                            {/* employer side list */}
                            {this.state.loading == false ? (this.state.userType=="employer" ? (this.state.currentPosition !== "" ? 
                                (<Grid.Col className="col-3 list">
                                    <ul className="emp-list">
                                        {this.state.jobseekersEmails.filter((jse) => jse.key == this.state.currentPosition)
                                        .map(jobseeker => {
                                                return(
                                                    <li key={jobseeker.id} className="emp-item">
                                                        <button className="my-button-list" onClick={() => this.chooseJobseeker(jobseeker)}>
                                                            <div className="last-update">{jobseeker.lastUpdate}</div>
                                                            <div className="button-text">{
                                                                this.state.jobseekersNames.filter((jsn) => jsn.key == jobseeker.email)[0].name
                                                            }</div>
                                                        </button>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </Grid.Col>)
                            :
                            (<Grid.Col className="col-3 list">
                                <ul className="emp-list">
                                    
                                </ul>
                            </Grid.Col>))        
                            : console.log("huh?")) : 
                            (<Grid.Col className="col-3 list">
                                <ul className="emp-list">
                                    loading...
                                </ul>
                            </Grid.Col>)  }
                            {/* Chat */}
                            <Grid.Col className="col-9">
                                {/* Messages */}
                                <Grid.Row className="row chat-box">
                                    <ul className="message-list">
                                        {this.state.loading == false ? 
                                        this.state.currentMatchID !== "" ? 
                                        this.state.messages.filter((m) => m.matchID == this.state.currentMatchID).map(message => {
                                            return(
                                                <li key={message.id} className={"message-" + message.role}>
                                                    <div>
                                                        {message.name}
                                                    </div>
                                                    <div>
                                                        {message.chat}
                                                    </div>
                                                    <div className="divider">empty</div>
                                                </li>
                                            )
                                        })
                                         : console.log('waiting...')
                                         : <div>Loading...</div>}
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