// @flow

import React from "react";

import { Container, Grid, Card, Form, Header } from "tabler-react";

import { Button, Modal } from "semantic-ui-react";

import SiteWrapper from "../SiteWrapper.react";

import JobEditModal from "../components/JobEditModal.react";
import JobFiltersModal from "../components/JobFiltersModal.react";
import JobNewModal from "../components/JobNewModal.react";

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

  componentDidMount() {
    fetch("https://run.mocky.io/v3/289c10f5-da75-41b1-aa2e-116c2757fd1b")
      .then((res) => res.json())
      .then((result) => {
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
          {this.state.data[i].title}
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
  };

  acceptChangesInfo = (newInfo) => {
    let tmpdata = [...this.state.data];

    tmpdata[this.state.selectValue].title = newInfo[0];
    tmpdata[this.state.selectValue].industry = newInfo[1];
    tmpdata[this.state.selectValue].location = newInfo[2];
    tmpdata[this.state.selectValue].about = newInfo[3];

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

    // After the above code has been executed, the new data needs to be sent to the database to update the record for the job profile
    // Can use either the state data or the newInfo data, it will be the same
  };

  createNewProfile = (newInfo) => {
    // This can be done in a few ways but I think the best way (in terms of reliability) would be to first send the data to the database, and then just force a reload of this component so it does a new API call and collects the newly created data
    // I think if we append the data to the state directly it leaves too many possibilities for a mistmatch between what is on the front-end and what's on the database
    // It's doable both ways though so doesn't really matter

    console.log(newInfo)

    this.setState({openNew: false})
  };

  setFilters = (filters) => {
    // filters will return an object with all the filters
    // access individual filters like: filters.experience, filters.education, filters.skills
    // filters.skills is an array of skills (strings). anything in the array has been selected
 

    // Probably need to post this info to the database otherwise I don't see a feasible way to store the information

  };

  render() {
    return (
      <SiteWrapper>
        <div className="my-3 my-md-5">
          <Container>
            <Grid.Row>
              <Grid.Col lg={12}>
                <Header.H1>Find Candidates</Header.H1>

                {/* Job profile selection */}
                <Container className="card" name="generalInfo">
                  <Card.Body>
                    <Grid.Row>
                      <Grid.Col md={4}>
                        <Form.Group label="Current Job Profile">
                          <Form.Select
                            id="profile"
                            onChange={this.handleSelect}
                            value={this.state.selectValue}
                          >
                            {this.state.selectItems}
                          </Form.Select>
                        </Form.Group>
                      </Grid.Col>
                      <Grid.Col offset={4} md={4}>
                        <Button
                          floated="right"
                          basic
                          icon="filter"
                          type="button"
                          onClick={this.openModalFilter}
                        />
                        <Button
                          floated="right"
                          basic
                          icon="pencil"
                          type="button"
                          onClick={this.openModalInfo}
                        />
                      </Grid.Col>
                    </Grid.Row>
                    <Button
                      floated="right"
                      basic
                      icon="plus"
                      type="button"
                      onClick={this.openModalNew}
                    />
                  </Card.Body>
                </Container>

                {/* Candidate Info */}
                <Container className="card" name="generalInfo">
                  <Card.Body>{/* Insert candidate info component */}</Card.Body>
                </Container>
              </Grid.Col>
            </Grid.Row>
          </Container>

          {/* Edit Job Info */}
          <Modal
            style={{ position: "relative" }}
            closeOnDimmerClick={false}
            open={this.state.openInfo}
          >
            <Modal.Header>Edit Job Profile Info</Modal.Header>
            <Modal.Content>
              <JobEditModal
                closeModal={this.closeModalInfo}
                acceptChanges={this.acceptChangesInfo}
                data={this.state.data[this.state.selectValue]}
              />
            </Modal.Content>
          </Modal>

          {/* Edit Filters */}
          <Modal
            style={{ position: "relative", overflow: "visible" }}
            closeOnDimmerClick={false}
            open={this.state.openFilter}
          >
            <Modal.Header>Change Filters</Modal.Header>
            <Modal.Content>
              <JobFiltersModal
                closeModal={this.closeModalFilter}
                data={this.state.data[this.state.selectValue]}
                acceptChanges={this.setFilters}
              />
            </Modal.Content>
          </Modal>

          {/* Create New Profile*/}
          <Modal
            style={{ position: "relative" }}
            closeOnDimmerClick={false}
            open={this.state.openNew}
          >
            <Modal.Header>Create a new Job Profile</Modal.Header>
            
            <Modal.Content>
              <JobNewModal
                closeModal={this.closeModalNew}
                acceptChanges={this.createNewProfile}
              />
            </Modal.Content>
          </Modal>
        </div>
      </SiteWrapper>
    );
  }
}

export default Candidates;
