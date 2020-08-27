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
import logo from '../img/middlelogo.png';

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
                    <div style={{ color:"white",textAlign:"center",margin:"0 auto" }}>
                        <Grid.Row>
                            <Grid.Col>
                                <button style={{ marginTop:"290px",backgroundColor:"transparent",color:"white",padding:"12px 30px" }}>Jobseeker</button>
                            </Grid.Col>
                            <Grid.Col>
                                <img src={logo} alt="logo" height="600px" ></img>
                            </Grid.Col>
                            <Grid.Col>
                            <button style={{ marginTop:"290px",backgroundColor:"transparent",color:"white",padding:"12px 30px" }}>Employer</button>
                            </Grid.Col>
                        </Grid.Row>
                    </div>
                    <div style={{ height:"65px" }}>
                        <Grid.Row>
                            <div style={{ color:"white",position:"absolute",right:"0",bottom:"0",padding:"20px 20px",fontSize:"20px" }}>
                                Already have an account? <button style={{ backgroundColor:"transparent",color:"white",border:"none",textDecoration:"underline" }}>Log in</button>
                            </div>    
                        </Grid.Row>
                    </div>

                </Container>
            </div>
        );
    }
}

export default LandingPage