import * as React from "react";

import { Form, Card, Button } from "tabler-react";

import JobseekerEdu from "./JobseekerEdu.react";

class JobseekerEduContainer extends React.Component {
    state = { dataset: [ <JobseekerEdu /> ] }

    addData = () => {
        this.setState({
            dataset: this.state.dataset.concat(<JobseekerEdu />)
          })
    }

    render() {
      return (
              <Form className="card" name="experience">
                <Card.Body>
                  <Card.Title>Education</Card.Title>
                  {this.state.dataset}

                  <Button color="secondary" icon="plus-circle" onClick={this.addData} type="button" />

                </Card.Body>
              </Form>
      );
    }
}

export default JobseekerEduContainer;