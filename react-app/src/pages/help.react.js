// @flow

import React, { Component } from "react";

import { Accordion } from "semantic-ui-react";
import { Card, Container, Header } from "tabler-react";

import SiteWrapper from "../SiteWrapper.react";

const panels = [
    {
        key: 'help-1',
        title: 'What is SkillShop?',
        content: {
          content: (
            <div>
              <p>
              SkillShop is a matchmaking system built to built jobseekers with potential employers. The aim of SkillShop is to remove some of the hardships of finding a job and encourage
              the employers to take on a more pro-active role in the jobseeking process. Jobseekers only need to fill out their profile and SkillShop will place their profile
              in front of relevant businesses! Businesses can 'like' candidates in which case they will match and SkillShop will help to facilitate conversation between the two.
              </p>
            </div>
          ),
        },
      },
    {
        key: 'help-2',
        title: 'Lorem ipsum dolor sit amet',
        content: {
          content: (
            <div>
              <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo 
              inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit 
              aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia 
              dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </p>
              <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat 
              quo voluptas nulla pariatur?
              </p>
            </div>
          ),
        },
      },
    {
      key: 'help-3',
      title: 'Lorem ipsum dolor sit amet',
      content: {
        content: (
          <div>
            <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo 
            inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit 
            aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia 
            dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
            <p>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? 
            Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat 
            quo voluptas nulla pariatur?
            </p>
          </div>
        ),
      },
    },
  ]

class Help extends Component {
  render() {
    return (
      <SiteWrapper>
        <div className="spacer" />
        <Container>
        <Header.H1 className="pageHeading">Help Centre</Header.H1>
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

export default Help;
