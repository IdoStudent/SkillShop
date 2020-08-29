// Confirmation.jsx
import React, { Component } from "react";
import { Button, Header, Icon, List } from "semantic-ui-react";

class Confirmation extends Component {
  saveAndContinue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const {
      values: {
        firstname,
        middlename,
        surname,
        city,
        postcode,
        state,
        relocate,
        about,
      },
    } = this.props;

    return (
      <div>
        <Header as="h3" dividing>
          Confirm your details
        </Header>
<List>
    <List.Item>Name: {firstname} {middlename} {surname}</List.Item>
    <List.Item>City: {city}</List.Item>
    <List.Item>Postcode: {postcode}</List.Item>
    <List.Item>State: {state}</List.Item>
    <List.Item>Willing to relocate?: {relocate}</List.Item>
    <List.Item>About you: {about}</List.Item>
  </List>

        <Button
          icon
          labelPosition="left"
          onClick={this.back}
          floated="left"
          basic
          color="red"
          size="tiny"
        >
          Back
          <Icon name="long arrow alternate left" basic color="red" />
        </Button>
        <Button
          icon
          labelPosition="right"
          onClick={this.saveAndContinue}
          floated="right"
          basic
          color="green"
          size="tiny"
        >
          Confirm
          <Icon name="long arrow alternate right" basic color="green" />
        </Button>
      </div>
    );
  }
}

export default Confirmation;
