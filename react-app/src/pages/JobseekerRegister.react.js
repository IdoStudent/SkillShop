import React,{Component} from "react";
import { Auth } from "aws-amplify";

import {
    Container,
    Card,
    Form,
    Grid,
    Alert,
    Header,
    Button,
  } from "tabler-react";

class JobseekerRegister extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register');
      };

    render(){
        return(
            <div className="my-3 my-md-5">
            <Container>
              <Grid.Row>
                <Grid.Col lg={12}>
                  <Header.H1>Jobseeker Register</Header.H1>
  
                  {/* Jobseeker General Information Set */}
                  <Form
                    className="card"
                    name="register"
                    onSubmit={this.handleSubmit}
                  >
                    <Card.Body>
                      <Card.Title>
                        Welcome to SkillShop! Let's get you started
                      </Card.Title>
  
                      <Grid.Row>
  
                        <Grid.Col sm={6} md={6}>
                          <Form.Group label="Email" isRequired>
                            <Form.Input name="Email"/>
                          </Form.Group>
                        </Grid.Col>
  
                        <Grid.Col sm={6} md={4}>
                          <Form.Group label="Password" isRequired>
                            <Form.Input name="Password" />
                          </Form.Group>
                        </Grid.Col>
  
                        <Grid.Col sm={6} md={4}>
                          <Form.Group label="Confirm Password" isRequired>
                            <Form.Input name="ConfirmPassword" />
                          </Form.Group>
                        </Grid.Col>
  
                      </Grid.Row>
                    </Card.Body>
  
                    <Button type="submit" color="primary" className="ml-auto">
                      Register
                    </Button>
  
                  </Form>
                </Grid.Col>
              </Grid.Row>
            </Container>
          </div>
        );
    }
}

export default JobseekerRegister