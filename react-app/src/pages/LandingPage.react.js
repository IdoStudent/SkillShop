import React,{Component} from "react";

import {
    Container,
    Card,
    Form,
    Grid,
    Alert,
    Header,
    Button,
  } from "tabler-react";

import background from '../img/background.png';

class LandingPage extends Component {

    render(){
        return(
            <div style={{ backgroundImage:`url(${background})` }}>
                <Container>
                    <Grid.Row>
                        <div style={{ color:"white",textAlign:"center",margin:"0 auto" }}>
                            <h1 style={{ fontSize:"70px" }}>Welcome to SkillShop</h1>
                            <h3 style={{ fontSize:"40px" }}>Let's get started.</h3>
                        </div>
                    </Grid.Row>
                </Container>
            </div>
        );
    }
}

export default LandingPage