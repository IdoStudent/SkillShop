// @flow
import React from "react";
import axios from "axios";
import { Container, Grid, Card, Form, Header } from "tabler-react";
import Auth from "@aws-amplify/auth";
import { Button } from "semantic-ui-react";
import SiteWrapper from "../SiteWrapper.react";
import JobEditModal from "../components/JobEditModal.react";
import JobFiltersModal from "../components/JobFiltersModal.react";
import JobNewModal from "../components/JobNewModal.react";
import JobCandidates from "../components/JobCandidates.react";

const uuidv4 = require("uuid/v4")

class Candidates extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // data[] is all our job profiles for the current user account, and their individual values
      // We can use this to pass the entire dataset of a profile to other components, such as the modal for editing the information, simply by typing {this.state.data[this.state.selectValue]} to get the current profile data
      data: [],

      // selectItems[] holds an array of our dropdown options to display to the user. The value and key of these options corresponds to their index in the data array.
      // Their display value is the job title, therefore indicated by data[i].title
      selectItems: [],

      // Select value defines what option is currently selected, based on the array of data. We can get information about the current selection by indexing the array and accessing the value we want
      // For example, if the first job profile in the list is selected, our value will be 0 (index 0). If we want to get the industry of this job profile, we can do so by typing: {this.state.data[this.state.selectValue].industry}
      selectValue: 0,

      // Modal State for information edit
      openInfo: false,

      // Modal State for filters edit
      openFilter: false,
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
      this.setState({
        email: user.attributes.email,
        formemail: user.attributes.email,
      });
    });
  }
  // GET user data
  async getSecondApi(email) {
    fetch(
      `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +
        email )
      .then((res) => res.json())
      .then((result) => {
        if (result.Item !== undefined)
        // If length is undefined, that means for some reason it's not returning data at all, so dont try and access fields that dont exist
          this.setState({
            firstname: result.Item.userFirstName,
            middlename: result.Item.userMiddleName,
            surname: result.Item.userLastName,
            city: result.Item.userCity,
            postcode: result.Item.userPostcode,
            state: result.Item.userState,
            about: result.Item.userAbout,

            formfirstname: result.Item.userFirstName,
            formmiddlename: result.Item.userMiddleName,
            formsurname: result.Item.userLastName,
            formcity: result.Item.userCity,
            formpostcode: result.postcode,
            formstate: result.Item.userState,
            formabout: result.Item.userAbout,
          });
          console.log() },
      )
  }
  // pass before mount
  BeforeDidMount() {
    this.getEmailApi().then((email) => this.getSecondApi(email));
    this.getEmailApi().then((email) => this.getThirdApi(email));
  }

 async getThirdApi(email){
    console.log(email)
    fetch('https://vsym28sl18.execute-api.ap-southeast-2.amazonaws.com/prod/?userEmail=' + email)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // Create a temporary array to hold our individual items (job profiles)
        let items = [];
        for (var i = 0; i < result.length; i++) {
          items.push(result[i]);
        }

        // Once we've iterated through the whole list, copy the value of our temporary array to our state array
        this.setState(
          {
            data: items,
          },
          () => {
            // Once the state has updated, create our dropdown list items
            this.createSelectItems();
          }
        );
      });
  }
  componentDidMount() {
    this.BeforeDidMount();
  }
  openModalInfo = () => {
    this.setState({ openInfo: true });
  };

  openModalFilter = () => {
    this.setState({ openFilter: true });
  };

  closeModalInfo = () => {
    this.setState({ openInfo: false });
  };

  closeModalFilter = () => {
    this.setState({ openFilter: false });
  };

  openModalNew = () => {
    this.setState({ openNew: true });
  };

  closeModalNew = () => {
    this.setState({ openNew: false });
  };

  createSelectItems() {
    let items = [];
    for (var i = 0; i < this.state.data.length; i++) {
      items.push(
        <option key={i} value={i}>
          {this.state.data[i].jobTitle}
        </option>
      );
    }

    this.setState({
      selectItems: items,
    });
  }

  handleSelect = (event) => {
    this.setState({
      selectValue: event.target.value,
    });

    // Reset the filters in local storage (because they're only applicable for the job profile that was selected when they were added to storage)
    localStorage.setItem('softSkillsFilter', JSON.stringify([ ]))
    localStorage.setItem('hardSkillsFilter', JSON.stringify([ ]))
    localStorage.setItem('techSkillsFilter', JSON.stringify([ ]))
  };

  acceptChangesInfo = (newInfo) => {
    let tmpdata = [...this.state.data];

    tmpdata[this.state.selectValue].jobTitle = newInfo[0];
    tmpdata[this.state.selectValue].jobIndustry = newInfo[1];
    tmpdata[this.state.selectValue].jobLocation = newInfo[2];
    tmpdata[this.state.selectValue].jobAbout = newInfo[3];

    console.log(tmpdata);

    this.setState(
      {
        openInfo: false,
        data: tmpdata,
      },
      () => {
        console.log(this.state.data);
        this.createSelectItems();
      }
    );

    // Get current profile information so we can save the filters
    let currentProfile = this.state.data[this.state.selectValue];
    try {
      const params = {
        userEmail: currentProfile.userEmail,
        jobKey: currentProfile.jobKey,
        jobTitle: newInfo[0],
        jobLocation: newInfo[1],
        jobIndustry: newInfo[2],
        jobAbout: newInfo[3],
        educationFilter: currentProfile.educationFilter,
        experienceFilter: currentProfile.experienceFilter,
        skillsFilter: currentProfile.skillsFilter,
      };
      axios.post(
        "https://vsym28sl18.execute-api.ap-southeast-2.amazonaws.com/prod",
        params
      );
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  createNewProfile = (newInfo, email) => {
    // Generate a unique id
    let jobKey = uuidv4()
        // Get current profile information
    try {
      const params = {
        userEmail: Auth.user.attributes.email,
        jobKey: jobKey,
        jobTitle: newInfo[0],
        jobLocation: newInfo[1],
        jobIndustry: newInfo[2],
        jobAbout: newInfo[3],
      };
      axios.post(
        "https://vsym28sl18.execute-api.ap-southeast-2.amazonaws.com/prod",
        params
      );
      console.log("post new profile")
      console.log("new profile email", Auth.user.attributes.email)
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }

    console.log(newInfo);

    this.setState({ openNew: false });
  };

  render() {
    return (
      <SiteWrapper>
        <div className="my-3 my-md-5">
        <div className="spacer" />
          <Container>
            <Grid.Row>
              <Grid.Col lg={12}>
                <Header.H1 className="pageHeading">Find Candidates</Header.H1>

                {/* Job profile selection */}
                <div id="jobprofile">
                <Container className="card thin" name="jobProfile">
                  <Card.Body>
                    <Grid.Row>
                      <Grid.Col md={4}>
                        <Form.Group label="Current Job Profile">
                          <Form.Select
                            id="profile"
                            onChange={this.handleSelect}
                            value={this.state.selectValue}
                            disabled={this.state.data.length > 0 ? ( false ) : ( true )}
                          >
                            {this.state.selectItems}
                          </Form.Select>
                        </Form.Group>
                      </Grid.Col>
                      {
                          this.state.data.length > 0 ? (
                            <Grid.Col offset={4} md={4}>

                            <Button
                              floated="right"
                              basic
                              icon="plus"
                              type="button"
                              onClick={this.openModalNew}
                            />
                            <Button
                              floated="right"
                              basic
                              icon="filter"
                              type="button"
                              onClick={this.openModalFilter}
                            />
                            <Button
                              floated="right"
                              icon="pencil"
                              type="button"
                              basic
                              onClick={this.openModalInfo}
                            />
                          </Grid.Col>
                          ) : (
                            <Grid.Col offset={4} md={4}>
                            <Button
                              floated="right"
                              basic
                              icon="plus"
                              type="button"
                              onClick={this.openModalNew}
                            />
                          </Grid.Col>
                          )
                        }
                     
                    </Grid.Row>
                  </Card.Body>
                </Container>
                </div>

                {/* Candidate Info */}
                <Container className="card" name="candidateInfo">
                  <Card.Body>
                    {
                      this.state.data.length > 0 ? 
                      ( <JobCandidates /> ) 
                      :
                      ( <p> You don't have any existing job profiles. Create one to start finding candidates! </p> ) 
                    }
                    
                  </Card.Body>
                </Container>
              </Grid.Col>
            </Grid.Row>
          </Container>

          {this.state.openInfo ? (
            <JobEditModal
              closeModal={this.closeModalInfo}
              acceptChanges={this.acceptChangesInfo}
              data={this.state.data[this.state.selectValue]}
            />
          ) : null}

          {this.state.openFilter ? (
            <JobFiltersModal
              closeModal={this.closeModalFilter}
              data={this.state.data[this.state.selectValue]}
            />
          ) : null}

          {this.state.openNew ? (
            <JobNewModal
              closeModal={this.closeModalNew}
              acceptChanges={this.createNewProfile}
            />
          ) : null}
        </div>
      </SiteWrapper>
    );
  }
}

export default Candidates;
