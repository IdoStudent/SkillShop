import React, { Component } from "react";
import { Container, Grid, Header, Button } from "tabler-react";
import SiteWrapper from "../SiteWrapper.react";

class Chat extends Component {
    render(){
        return(
            <SiteWrapper>
                <div className="my-body">
                    <div className="container"> 
                        <div className="row my-row chat-box">
                            <div className="col my-col">
                                IDO
                            </div>
                            <div className="col my-col">
                                YARON
                            </div>
                        </div>
                        <div className="row text-box">
                            <div className="col-11">
                                <input className="input-text" type="text" placeholder="Enter your message here"></input>
                            </div>
                            <div className="col-1">
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