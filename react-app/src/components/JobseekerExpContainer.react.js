import * as React from "react";

import { Form, Card, Button } from "tabler-react";

import JobseekerExp from "./JobseekerExp.react";

class JobseekerExpContainer extends React.Component {
    state = { dataset: [ <JobseekerExp /> ] }

    addData = () => {
        this.setState({
            dataset: this.state.dataset.concat(<JobseekerExp />)
          })
    }

    render() {
      return (
              <Form className="card" name="experience">
                <Card.Body>
                  <Card.Title>Experience</Card.Title>
                  {this.state.dataset}

                  <Button color="secondary" icon="plus-circle" onClick={this.addData} type="button" />

                </Card.Body>
              </Form>
      );
    }
}

export default JobseekerExpContainer;