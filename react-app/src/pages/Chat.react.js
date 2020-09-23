import React, { Component } from "react";
import SiteWrapper from "../SiteWrapper.react";
import Auth from "@aws-amplify/auth";

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
            messages: DUMMY_DATA,
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

    componentDidMount() {
        this.getUserType();
        this.getMatches();
    }

    chooseEmployer = (employer) => {
        console.log("Choose Employer");
        console.log("name:",employer.key)
        this.setState({ currentEmployer:employer.key });
        // console.log("User type2",this.state.userType);
    }

    render(){
        return(
            <SiteWrapper>
                <div className="my-body">
                    <div className="container">
                        {/* Header */}
                        <div className="row">
                            {/* JobSeeker Search */}
                            {this.state.userType=="jobseeker" && 
                                <div className="col-3 search">
                                    <input className="input-text-search" type="text" placeholder="Search"></input>
                                </div>
                            }
                            {/* Employer Search */}
                            {this.state.userType=="employer" && 
                                <div className="col-3 search">
                                    implement
                                </div>
                            }
                            {/* Title */}
                            <div className="col-9 title">
                                <div className="title-text">{this.state.currentEmployer}</div>
                            </div>
                        </div>
                        {/* Body */}
                        <div className="row">
                            {/* List */}
                            <div className="col-3 list">
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
                            </div>
                            {/* Chat */}
                            <div className="col-9">
                                {/* Messages */}
                                <div className="row chat-box">
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
                                </div>
                                {/* Input */}
                                <div className="row text-box">
                                    <div className="col-9 col-sm-10 col-md-10 col-lg-11">
                                        <input className="input-text" type="text" placeholder="Type message here..."></input>
                                    </div>
                                    <div className="col-3 col-sm-2 col-md-2 col-lg-1">
                                        <button className="fa fa-send-o my-button">
                                        </button>
                                    </div>
                                </div>   

                            </div>
                        </div>
                                    
                    </div>
                </div>
            </SiteWrapper>
        )
    }
}

export default Chat;