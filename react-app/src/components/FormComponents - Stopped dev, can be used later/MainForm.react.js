// MainForm.jsx
import React, { Component } from "react";
import UserDetails from "./UserDetails.react";
import Skills from "./Skills.react";
import Confirmation from "./Confirmation.react";
import Success from "./Success.react";

class MainForm extends Component {
  state = {
    step: 1,

    // Set 1 - Info
    firstname: "",
    middlename: "",
    surname: "",
    city: "",
    postcode: "",
    state: "",
    relocate: false,
    about: "",

    // Set 2 - Skills
    communication: "",
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });

    console.log(event.target.value);
  };

  handleChangeCheckbox(e) {
    let isChecked = e.target.checked;
    // do whatever you want with isChecked value

    console.log(isChecked);
    console.log(this.state.relocate);
  }

  render() {
    const { step } = this.state;
    const {
      firstname,
      middlename,
      surname,
      city,
      postcode,
      state,
      relocate,
      about,
      communication,
    } = this.state;
    const values = {
      firstname,
      middlename,
      surname,
      city,
      postcode,
      state,
      relocate,
      about,
      communication,
    };

    switch (step) {
      case 1:
        return (
          <UserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <Skills
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <Confirmation
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
          />
        );
      case 4:
        return <Success />;
    }
  }
}

export default MainForm;
