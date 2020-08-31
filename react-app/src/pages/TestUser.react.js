import React,{Component} from "react";
import { Auth } from 'aws-amplify';

import {
    Container,
    Card,
    Form,
    Grid,
    Alert,
    Header,
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
            console.log(result);
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