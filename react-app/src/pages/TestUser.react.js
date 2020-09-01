import React,{Component} from "react";
//import { auth } from 'aws-amplify';

import {
    Button,
  } from "tabler-react";

class TestUser extends Component {
    state = {
        user: this.props.auth.user
    }

    doSomething = () => {
        this.props.auth.user.getUserAttributes(function(err, result) {
            if (err) {
                alert(err);
                return;
            }
            console.log(result[2].getValue());
        });
    }
    render() {
        return (
            <div>
                <Button onClick={this.doSomething}>button</Button>
            </div>
        );
    }
}

export default TestUser;