import React, { Component } from "react";
import { Container, Grid, Header, Button } from "tabler-react";
import SiteWrapper from "../SiteWrapper.react";

const DUMMY_DATA = [
    {
        senderID: "Employer",
        text: "Hello, how are you?"
    },
    {
        senderID: "Jobseeker",
        text: "I'm good, thank you!"
    },
    {
        senderID: "Employer",
        text: "I viewed your resume and I was deeply impressed."
    },
    {
        senderID: "Jobseeker",
        text: "That's great to read!"
    },
    {
        senderID: "Employer",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        senderID: "Jobseeker",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        senderID: "Employer",
        text: "You're hired!"
    },
    {
        senderID: "Jobseeker",
        text: "You will not regret this, sir."
    }
]

const DUMMY_EMPLOYERS = [
    {
        name: "Bob",
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
        }
    }

    chooseEmployer = (employer) => {
        //get employer
        console.log('Employer ',{employer},' was chosen');
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
                                <div className="title-text">Employer</div>
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
                                                <button className="my-button-list" onClick={(event) => this.chooseEmployer(event,employer.name)}>
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
                                                <li key={message.id} className={"message-" + message.senderID}>
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
                                {/* Text */}
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