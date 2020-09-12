import * as React from "react";
import { Form, Card, Grid } from "tabler-react";
import { Button, Modal } from "semantic-ui-react";
import Auth from '@aws-amplify/auth';
import '../../index.css';
import axios from "axios";
class RemoveUser extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // States from API
        firstname: "",
        middlename: "",
        surname: "",
        city: "",
        postcode: "",
        state: "",
        about: "",
  
        // States for editable form
        formfirstname: "",
        formmiddlename: "",
        formsurname: "",
        formcity: "",
        formpostcode: "",
        formstate: "",
        formabout: "",
  
        // Modal State
        open: false,
      };
    }

    getEmailApi() {
      return Auth.currentAuthenticatedUser().then((user) => {
         const { attributes = {} } = user;
         let email =  attributes['email']
         return email
       })}
     // GET email for form
    getFirstApi() {
      return Auth.currentAuthenticatedUser().then((user) => {
         this.setState({email: user.attributes.email, formemail: user.attributes.email})
       });
    }
    // GET user data 
     async getSecondApi(email) {
       fetch(`https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +email)
         .then(res => res.json())
         .then(
           (result) => {
             this.setState({
         
             });
             } ,
         )
     }
     // pass before mount
     BeforDidMount() { 
      this.getEmailApi().then(email => this.handleSubmit(email)); }
   
     componentDidMount() {
       this.BeforDidMount();
       this.getFirstApi();  
     }

    handleSubmit = (event, email) => {
      console.log("LINE 68 REMOVE EMAIL CHECK: " + this.state.email);
      fetch(`https://q32xq9hoif.execute-api.ap-southeast-2.amazonaws.com/prod/deleteUser?userEmail=` +email, {
        method: 'DELETE',
        headers: {
        "X-Requested-With": '*',
        "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Requested-With',
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": 'GET, OPTIONS',
        "Access-Control-Allow-Credentials": true,// Required for cookies, authorization headers with HTTPS ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },      
       // body: JSON.stringify({records: id, record, album, artist, date, imageUrl}) - user email
        });
      this.setState((prevState) => ({
        open: false,
      }));
    };
  
    cancelForm = () => {
        // If cancelling, reset any fields that have been changed to the original values so that when the modal is re-opened, the old values are shown
        this.setState((prevState) => ({
          open: false,
        }));
      };
    openModal = () => {
      this.setState({ open: true });
    };
  
    render() {
        const {
          open,
        } = this.state;
    
        return (
          <div className="card" name="generalInfo">
            <Card.Body>
              <Grid>
                <Grid.Row>
                  <Grid.Col md={7}>
                    <Card.Title>Delete User</Card.Title>
                  </Grid.Col>
                  <Grid.Col md={5}>
                    {/* MODAL BUTTON */}
                    <Button
                      floated="right"
                      basic
                      icon="trash"
                      type="button"
                      compact
                      onClick={this.openModal}
                    />
                  </Grid.Col>
                </Grid.Row>
    
                <Grid.Row>
                 
                </Grid.Row>
              </Grid>
            </Card.Body>
    
            {/* MODAL CONTENT */}
            <Modal
              style={{ position: "relative" }}
              closeOnDimmerClick={false}
              open={open}
            >
              <Modal.Header>Delete User</Modal.Header>
              <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
    
                  {/* ROW 3 */}
                  <Grid.Row>
                    <Grid.Col md={12}>
                      <Form.Group className="mb=0" label="Are you sure you want to completely remove your profile ?">    
                      </Form.Group>
                    </Grid.Col>
                  </Grid.Row>
    
                  {/* ROW 4 - SUBMIT */}
                  <Grid.Row>
                    <Grid.Col md={12}>
                      <Button
                        floated="left"
                        basic
                        type="button"
                        color="red"
                        onClick={this.cancelForm}
                      >
                        {" "}
                        Cancel{" "}
                      </Button>
                      <Button floated="right" basic type="submit" color="red">
                        {" "}
                        Delete User{" "}
                      </Button>
                    </Grid.Col>
                  </Grid.Row>
                </Form>
              </Modal.Content>
            </Modal>
          </div>
        );
      }
    }
    
export default RemoveUser;