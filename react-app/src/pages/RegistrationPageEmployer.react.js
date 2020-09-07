import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import { Header,Form,Button,Grid,Message } from "semantic-ui-react";

class RegistrationPageEmployer extends Component {
    state = {
        username : "",
        email: "",
        password: "",
        confirmpassword: "",
        role: "Employer",
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        // console.log(document.getElementById('password').value)
        // console.log(document.getElementById('confirmpassword').value)
        if(document.getElementById('password').value == document.getElementById('confirmpassword').value){
            // AWS Cognito registration
            this.state.username = this.state.email;
            const { username, email, password } = this.state;
            try{
                const signUpResponse = await Auth.signUp({
                    username,
                    password,
                    attributes: {
                        email: email,
                        'custom:role': this.state.role
                    }
                });
                console.log(signUpResponse);
                this.props.history.push("/login");
            }catch(error){
                console.log('Error')
            }
        }

    };

    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
    }

    confirmPassword = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");

        if (document.getElementById('password').value ==
            document.getElementById('confirmpassword').value) {
            document.getElementById('message').style.color = 'green';
            document.getElementById('message').innerHTML = 'matching';
        } else {
            document.getElementById('message').style.color = 'red';
            document.getElementById('message').innerHTML = 'Passwords are not matching!';
        }
    }

    render(){
        return(
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h1" size="huge">Employer Registration</Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Email</label>
                                <input 
                                    className="input" 
                                    type="email"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="xxxxxxxxxxx@gmail.com"
                                    pattern="[A-Za-z0-9]*[@].*"
                                    value={this.state.email}
                                    onChange={this.onInputChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input 
                                    className="input" 
                                    type="password"
                                    id="password"
                                    placeholder="Minimum length of 8 characters"
                                    minLength = "8"
                                    value={this.state.password}
                                    onChange={this.onInputChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password</label>
                                <input 
                                    className="input" 
                                    type="password"
                                    id="confirmpassword"
                                    placeholder="Confirm password"
                                    value={this.state.confirmpassword}
                                    onChange={this.confirmPassword}
                                />
                                <span id="message"></span>
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                            <Message>
                                Already have an account? <a href='/landingpage'>Go Back</a>
                            </Message>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default RegistrationPageEmployer;