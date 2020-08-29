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

import EmployerRegister from "./EmployerRegister.react";

import background from '../img/background.png';
import logo from '../img/middlelogo.png';

class LandingPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            jobseekerRegisterWindow: "",
            employerRegisterWindow: "",
            loginWindow: false,
        };
    }

    componentDidMount(){
        this.setState({ employerRegisterWindow: false });
    }

    handleJobseekerRegister = () => {
        console.log('jobseeker register')
        this.setState({ jobseekerRegisterWindow: true });
    };

    handleEmployerRegister = () => {
        console.log('employer register')
        console.log(this.employerRegisterWindow)
        this.setState({ employerRegisterWindow: true });
        console.log(this.employerRegisterWindow)
    };

    handleLogin = () => {
        console.log('login')
        this.setState({ loginWindow: true });
    };

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
                    {this.employerRegisterWindow && (<EmployerRegister />)}
                    <div style={{ color:"white",textAlign:"center",margin:"0 auto" }}>
                        <Grid.Row>
                            <Grid.Col>
                                <button onClick={this.handleJobseekerRegister} style={{ marginTop:"290px",backgroundColor:"transparent",color:"white",padding:"12px 30px" }}>Jobseeker</button>
                            </Grid.Col>
                            <Grid.Col>
                                <img src={logo} alt="logo" height="600px" ></img>
                            </Grid.Col>
                            <Grid.Col>
                            <button onClick={this.handleEmployerRegister} style={{ marginTop:"290px",backgroundColor:"transparent",color:"white",padding:"12px 30px" }}>Employer</button>
                            </Grid.Col>
                        </Grid.Row>
                    </div>
                    <div style={{ height:"65px" }}>
                        <Grid.Row>
                            <div style={{ color:"white",position:"absolute",right:"0",bottom:"0",padding:"20px 20px",fontSize:"20px" }}>
                                Already have an account? <button onClick={this.handleLogin} style={{ backgroundColor:"transparent",color:"white",border:"none",textDecoration:"underline" }}>Log in</button>
                            </div>    
                        </Grid.Row>
                    </div>

                </Container>
            </div>
        );
    }
}

export default LandingPage