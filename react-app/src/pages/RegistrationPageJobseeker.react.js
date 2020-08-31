import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

import { Header,Form,Button,Grid,Message } from "semantic-ui-react";

class RegistrationPageJobseeker extends Component {
    state = {
        username : "",
        email: "",
        password: "",
        confirmpassword: "",
        role: "Jobseeker",
    }

    handleSubmit = async event => {
        event.preventDefault();
    
        // AWS Cognito integration here
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
    };

    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
    }

    render(){
        return(
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as="h1" size="huge">Jobseeker Registration</Header>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Email</label>
                                <input 
                                    className="input" 
                                    type="email"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
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
                                    placeholder="Password"
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
                                    onChange={this.onInputChange}
                                />
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

export default RegistrationPageJobseeker;