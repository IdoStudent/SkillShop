// @flow

import React, { Component } from "react";

import { Accordion } from "semantic-ui-react";
import { Card, Container, Header, Button } from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";

const panels = [
    {
        key: 'help-1',
        title: 'What is SkillShop?',
        content: {
          content: (
            <div>
              <p>
              SkillShop is a web-based job matchmaking application. The idea behind SkillShop comes from the notion that businesses looking for candidates generally take a more passive role 
              in the process, and much of the burden is on the Jobseeker. SkillShop aims to reverse this, placing the responsibility in the hands of the business to actively seek out candidates 
              that would be right for them.
              </p>
            </div>
          ),
        },
      },
    {
        key: 'help-2',
        title: 'Why SkillShop?',
        content: {
          content: (
            <div>
              <p>
              SkillShop aims to reduce the time and resources required for businesses to find their ideal candidate. Instead of posting a job advertisement and then having to 
              sift through hundreds of applications from un-suitable candidates, businesses can directly choose the type of candidate they’re looking for and be presented with the top matches for 
              that role within seconds. For Jobseekers, they no longer need to spend hours and hours applying for jobs, they just setup their profile and SkillShop handles the rest. 
              </p>
              <p>
              SkillShop also provides in-application messaging, making it quick and easy for the both sides of the match to find out more information about one another.
              </p>
            </div>
          ),
        },
      },
    {
      key: 'help-3',
      title: 'How is SkillShop built?',
      content: {
        content: (
          <div>
            <p>
            SkillShop is built using the ReactJS framework for the front-end, and a serverless AWS stack for the back-end. 
            The AWS stack includes the following AWS services; S3, Cognito, DynamoDB, Lambda, and API Gateway. 
            </p>
          </div>
        ),
      },
    },
  ]

class About extends Component {
  render() {
    return (
      <SiteWrapper>
        <div className="spacer" />
        <Container>
        <Header.H1 className="pageHeading">About SkillShop</Header.H1>
          <div className="card">
            <Card.Body>
            <Accordion defaultActiveIndex={0} panels={panels} exclusive={false}/>
            </Card.Body>
          </div>
        </Container>
      </SiteWrapper>
    );
  }
}

export default About;
