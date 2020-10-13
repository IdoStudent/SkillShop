import * as React from "react";
import axios from "axios";
import { Form, Card, Grid } from "tabler-react";
import { Button, Icon } from "semantic-ui-react";
import Auth from "@aws-amplify/auth";

import NotificationSystem from "react-notification-system";

var selectedSkills = [];

var dbSkills = [];

class Skills extends React.Component {
  notificationSystem = React.createRef();

  constructor(props) {
    super(props);

    this.state = {
      showSaveButton: false,
      //showCancelButton: false,
    };
  }
 // GET email for getSecondApi
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

  getSecondApi(email) {
    fetch(`https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata/skills?userEmail=`+email)
      .then((res) => res.json())
      .then((result) => {

        // We can just do a straight copy of the array we received into our var array
        dbSkills = result.Item.userSkills;

        // After the skills are added into the array from the API, we set the state based on the given values
        this.initialiseState();
      });
  }
  // pass before mount
  BeforeDidMount() {
    this.getEmailApi().then((email) => this.getSecondApi(email));
  }

  componentDidMount() {
    this.BeforeDidMount();
    this.getFirstApi();
  }

  initialiseState() {
    for (let i = 0; i < dbSkills.length; i++) {
      this.setState({
        [dbSkills[i]]: true,
      });

      // Copy the dbSkills array to our selectedSkills array to give it its initial value
      selectedSkills = dbSkills;
    }
  }

  onChange = (event) => {
    let name = event.target.name;

    this.setState({
      showSaveButton: true,
      //showCancelButton: true,
      [name]: !this.state[name],
    });

    if (event.target.checked === true) {
      // If the change event was that a skill is being selected, add this skill to our array to keep track of it
      selectedSkills.push(name);
    } else {
      // If the change event was that a skill is being deselected, remove this skill from our array
      selectedSkills = selectedSkills.filter((val) => val !== name);
    }
  };

  /*cancelChanges = () => {
    this.setState({
      showSaveButton: false,
      showCancelButton: false,
    });

    this.initialiseState()
  };*/

  submitChanges = async () => {
    this.setState({
      showSaveButton: false,
      //showCancelButton: false,
    });
    // ADD LOGIC FOR SUBMITTING TO DATABASE, CAN JUST TAKE THE ENTIRE SELECTEDSKILLS ARRAY AND POST IT
    try {
      const params = {
        userEmail:  this.state.email,
        userSkills: selectedSkills,
      };
      await axios.post(
        "https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata/skills",
        params
      );

      this.addSuccessNotification()
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  addSuccessNotification = () => {
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message: "Skills updated successfully",
      level: "success",
      position: "br",
    });
  };

  render() {
    return (
      <div className="card" name="skills" id="skills">
        <NotificationSystem ref={this.notificationSystem} />
        <Card.Body>
          <Card.Title>Top skills</Card.Title>
          <Grid.Row>
            <Grid.Col offset={1} md={10}>
              <Form.Group name="softskills" label="Soft Skills">
                <Form.SelectGroup
                  canSelectMultiple
                  pills
                  onChange={this.onChange}
                >
                  <Form.SelectGroupItem
                    label="Communication"
                    name="communication"
                    value="Communication"
                    checked={this.state.communication}
                  />
                  <Form.SelectGroupItem
                    label="Teamwork"
                    name="teamwork"
                    value="Teamwork"
                    checked={this.state.teamwork}
                  />
                  <Form.SelectGroupItem
                    label="Creativity"
                    name="creativity"
                    value="Creativity"
                    checked={this.state.creativity}
                  />
                  <Form.SelectGroupItem
                    label="Responsibility"
                    name="responsiblility"
                    value="Responsibility"
                    checked={this.state.responsible}
                  />
                  <Form.SelectGroupItem
                    label="Time Management"
                    name="timemanagement"
                    value="Time Management"
                    checked={this.state.timemanagement}
                  />
                  <Form.SelectGroupItem
                    label="Critical Thinking"
                    name="criticalthinking"
                    value="Critical Thinking"
                    checked={this.state.criticalthinking}
                  />
                  <Form.SelectGroupItem
                    label="Organisation"
                    name="organisation"
                    value="Organisation"
                    checked={this.state.organisation}
                  />
                  <Form.SelectGroupItem
                    label="Emotional Intelligence"
                    name="emotionalintelligence"
                    value="Emotional Intelligence"
                    checked={this.state.emotionalintelligence}
                  />
                  <Form.SelectGroupItem
                    label="Attention to Detail"
                    name="attdetail"
                    value="Attention to Detail"
                    checked={this.state.attdetail}
                  />
                  <Form.SelectGroupItem
                    label="Flexibility"
                    name="flexibility"
                    value="Flexibility"
                    checked={this.state.flexibility}
                  />
                  <Form.SelectGroupItem
                    label="Customer Service"
                    name="customerservice"
                    value="Customer Service"
                    checked={this.state.customerservice}
                  />
                </Form.SelectGroup>
              </Form.Group>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col offset={1} md={10}>
              <Form.Group name="hardskills" label="Hard Skills">
                <Form.SelectGroup
                  canSelectMultiple
                  pills
                  onChange={this.onChange}
                >
                  <Form.SelectGroupItem
                    label="Design"
                    name="design"
                    value="Design"
                    checked={this.state.design}
                  />
                  <Form.SelectGroupItem
                    label="Data Analysis"
                    name="dataanalysis"
                    value="Data Analysis"
                    checked={this.state.dataanalysis}
                  />
                  <Form.SelectGroupItem
                    label="Mathmetics"
                    name="mathmetics"
                    value="Mathmetics"
                    checked={this.state.mathmetics}
                  />
                  <Form.SelectGroupItem
                    label="Copy Writing"
                    name="copywriting"
                    value="Copy Writing"
                    checked={this.state.copywriting}
                  />
                  <Form.SelectGroupItem
                    label="Marketing"
                    name="marketing"
                    value="Marketing"
                    checked={this.state.marketing}
                  />
                  <Form.SelectGroupItem
                    label="Negotiation"
                    name="negotiation"
                    value="Negotiation"
                    checked={this.state.negotiation}
                  />
                  <Form.SelectGroupItem
                    label="Project Management"
                    name="projectmanagement"
                    value="Project Management"
                    checked={this.state.projectmanagement}
                  />
                  <Form.SelectGroupItem
                    label="Administration"
                    name="administration"
                    value="Administration"
                    checked={this.state.administration}
                  />
                  <Form.SelectGroupItem
                    label="Foreign Languages"
                    name="language"
                    value="Foreign Languages"
                    checked={this.state.language}
                  />
                </Form.SelectGroup>
              </Form.Group>
            </Grid.Col>
          </Grid.Row>
          <Grid.Row>
            <Grid.Col offset={1} md={10}>
              <Form.Group name="techskills" label="Tech Skills">
                <Form.SelectGroup
                  canSelectMultiple
                  pills
                  onChange={this.onChange}
                >
                  <Form.SelectGroupItem
                    label="Adobe Photoshop"
                    name="adobephotoshop"
                    value="Adobe Photoshop"
                    checked={this.state.adobephotoshop}
                  />
                  <Form.SelectGroupItem
                    label="Adobe XD"
                    name="adobexd"
                    value="Adobe XD"
                    checked={this.state.adobexd}
                  />
                  <Form.SelectGroupItem
                    label="Adobe Premier"
                    name="adobepremier"
                    value="Adobe Premier"
                    checked={this.state.adobepremier}
                  />
                  <Form.SelectGroupItem
                    label="Excel"
                    name="excel"
                    value="Excel"
                    checked={this.state.excel}
                  />
                  <Form.SelectGroupItem
                    label="Microsoft Office"
                    name="microsoftoffice"
                    value="Microsoft Office"
                    checked={this.state.microsoftoffice}
                  />
                  <Form.SelectGroupItem
                    label="Web Development"
                    name="webdevelopment"
                    value="Web Development"
                    checked={this.state.webdevelopment}
                  />
                  <Form.SelectGroupItem
                    label="Front-End"
                    name="frontend"
                    value="Front-End"
                    checked={this.state.frontend}
                  />
                  <Form.SelectGroupItem
                    label="Back-End"
                    name="backend"
                    value="Back-End"
                    checked={this.state.backend}
                  />
                  <Form.SelectGroupItem
                    label="Javascript"
                    name="javascript"
                    value="Javascript"
                    checked={this.state.javascript}
                  />
                  <Form.SelectGroupItem
                    label="PHP"
                    name="php"
                    value="PHP"
                    checked={this.state.php}
                  />
                  <Form.SelectGroupItem
                    label="C++"
                    name="c++"
                    value="C++"
                    checked={this.state.cplusplus}
                  />
                  <Form.SelectGroupItem
                    label="Java"
                    name="java"
                    value="Java"
                    checked={this.state.java}
                  />
                  <Form.SelectGroupItem
                    label="Cloud Computing"
                    name="cloudcomputing"
                    value="Cloud Computing"
                    checked={this.state.cloudcomputing}
                  />
                </Form.SelectGroup>
              </Form.Group>
            </Grid.Col>
          </Grid.Row>

          <Button
            animated
            className="acceptButton white"
            circular
            floated="right"
            onClick={this.submitChanges}
            hidden={this.state.showSaveButton ? "" : "hidden"}
          >
            <Button.Content visible>Accept</Button.Content>
            <Button.Content hidden>
              <Icon name="check" />
            </Button.Content>
          </Button>
        </Card.Body>
      </div>
    );
  }
}

export default Skills;
