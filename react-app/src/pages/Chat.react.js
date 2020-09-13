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
        text: "blah blah blah blah blah blah"
    },
    {
        senderID: "Jobseeker",
        text: "Yes, blah blah blah blah blah blah"
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

class Chat extends Component {
    constructor(){
        super()
        this.state = {
            messages: DUMMY_DATA,
        }
    }

    render(){
        return(
            <SiteWrapper>
                <div className="my-body">
                    <div className="container"> 
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
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className="row text-box">
                            <div className="col-9 col-sm-10 col-md-10 col-lg-11">
                                <input className="input-text" type="text" placeholder="Enter your message here"></input>
                            </div>
                            <div className="col-3 col-sm-2 col-md-2 col-lg-1">
                                <button className="my-button">
                                    SEND
                                </button>
                            </div>
                            
                        </div>               
                    </div>
                </div>
                
            </SiteWrapper>
        )
    }
}

export default Chat;