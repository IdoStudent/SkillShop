import React, { Component } from 'react';
import { Auth } from "aws-amplify";

import { Header,Form,Button,Grid,Message } from "semantic-ui-react";

class Login extends Component {
  state = {
    username: "",
    password: "",
    role: ""
  };

  handleSubmit = async event => {
    event.preventDefault();

    // AWS Cognito integration here
    try {
      const user = await Auth.signIn(this.state.username, this.state.password);
      this.props.auth.setAuthStatus(true);
      this.props.auth.setUser(user);
      // this.props.history.push("/");

      let role = user.attributes['custom:role'];
      // console.log(role);

      if (role == 'Employer'){
        // console.log('route to employer profile');
        this.props.history.push("/employerSetup");
      } else if (role == 'Jobseeker') {
        // console.log('route to jobseeker profile');
        this.props.history.push("/");
      }

    }catch(error) {
      console.log('Error')
      let err = null;
      !error.message ? err = { "message": error } : err = error;
      this.setState({
        errors: {
          ...this.state.errors,
          cognito: err
        }
      });
    }
  };

  onInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    document.getElementById(event.target.id).classList.remove("is-danger");
  };

  render() {
    return (
      <div>
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h1" size="huge">Login</Header>
              <Form onSubmit={this.handleSubmit}>
                  <Form.Field>
                      <label>Email</label>
                      <input 
                        className="input" 
                        type="text"
                        id="username"
                        aria-describedby="usernameHelp"
                        placeholder="xxxxxxxxxxx@gmail.com"
                        pattern="[A-Za-z0-9]*[@].*"
                        value={this.state.username}
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
                  <Button type='submit'>Submit</Button>
                  <Message>
                      Don't have an account? <a href='/landingpage'>Go Back</a>
                  </Message>
              </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default Login;