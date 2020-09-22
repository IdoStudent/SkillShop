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

const DUMMY_EMPLOYERS = [
    {
        name: "Fred",
        lastUpdate: "1d"
    },
    {
        name: "Sheryl",
        lastUpdate: "1d"
    },
    {
        name: "Yaki",
        lastUpdate: "1d"
    },
    {
        name: "Condoleezza",
        lastUpdate: "1d"
    },
    {
        name: "Guru",
        lastUpdate: "1d"
    },
    {
        name: "Stella",
        lastUpdate: "1d"
    },
    {
        name: "Bobo",
        lastUpdate: "1d"
    },
    {
        name: "Annie",
        lastUpdate: "1d"
    },
    {
        name: "Hugo",
        lastUpdate: "1d"
    },
    {
        name: "Fatima",
        lastUpdate: "1d"
    },
]

class Chat extends Component {
    constructor(){
        super()
        this.state = {
            messages: DUMMY_DATA,
            employers: DUMMY_EMPLOYERS,
            currentEmployer: "Fred",
        }
    }
// get user type from user table
    getUserType() {
        const email =  Auth.user.attributes.email
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
        fetch(
            `https://ddar54uzr6.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=` +
              email )
            .then((res) => res.json())
            .then((result) => {
              if (result.Item !== undefined)
                this.setState({     
                    jobKey: result.Item.jobKey
                });
               },
            )
        }

        componentDidMount() {
            this.getUserType();
            this.getMatches();
        }

    chooseEmployer = (employer) => {
        // console.log('Employer ',employer.name,' was chosen');
        this.setState({ currentEmployer:employer.name });
    }

    render(){
        return(
            <SiteWrapper>
                <div className="my-body">
                    <div className="container">
                        {/* Header */}
                        <div className="row">
                            {/* Search */}
                            <div className="col-3 search">
                                <input className="input-text-search" type="text" placeholder="Search"></input>
                            </div>
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
                                    {this.state.employers.map(employer => {
                                        return(
                                            <li key={employer.id} className="emp-item">
                                                <button className="my-button-list" onClick={() => this.chooseEmployer(employer)}>
                                                    <div className="last-update">{employer.lastUpdate}</div>
                                                    <div className="button-text">{employer.name}</div>
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