import * as React from "react";
import { Card, Grid, Container } from "tabler-react";
import { Button, Modal, Icon } from "semantic-ui-react";
import Auth from '@aws-amplify/auth';
import '../../index.css';

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
       fetch(`https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/delete?userEmail=` +email)
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
      fetch(`https://q32xq9hoif.execute-api.ap-southeast-2.amazonaws.com/prod/delete?userEmail=` +this.state.email)      
       // body: JSON.stringify({records: id, record, album, artist, date, imageUrl}) - user email
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
                    <Card.Title>Delete my profile</Card.Title>
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
    
                <Grid.Row></Grid.Row>
              </Grid>
            </Card.Body>
    
            {/* MODAL CONTENT */}
            <Modal
              style={{ position: "relative" }}
              closeOnDimmerClick={false}
              open={open}
            >
              <Modal.Header>Delete Profile</Modal.Header>
              <Modal.Content>
                <p><b>Are you sure you want to delete your profile?</b> </p>
                <p>This will completely remove your user account from the system. This means that all your information, matches, and chat history will be <b>permanently</b> deleted. If you wish to access SkillShop again you will
                need to create a new account and start from scratch. </p>
                <p>Deleting your account is irreversible!</p>
              </Modal.Content>
    
              {/* ROW 4 - SUBMIT */}
              <Modal.Actions>
                <Container className="modalSubmit">
                  <Grid.Row>
                    <Grid.Col md={12}>
                      <Button
                        animated
                        className="acceptButton delete"
                        circular
                        onClick={this.handleSubmit}
                      >
                        <Button.Content visible>Delete</Button.Content>
                        <Button.Content hidden>
                          <Icon name="trash" />
                        </Button.Content>
                      </Button>
                      <Button
                        animated
                        className="cancelButton delete"
                        circular
                        onClick={this.cancelForm}
                      >
                        <Button.Content visible>Cancel</Button.Content>
                        <Button.Content hidden>
                          <Icon name="x" />
                        </Button.Content>
                      </Button>
                    </Grid.Col>
                  </Grid.Row>
                </Container>
              </Modal.Actions>
            </Modal>
          </div>
        );
      }
    }
    
export default RemoveUser;