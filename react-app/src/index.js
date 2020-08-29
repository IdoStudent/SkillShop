// @flow

import React from "react";
import ReactDOM from "react-dom";
import Amplify from 'aws-amplify';
import config from './config';

import "./index.css";
import "./c3jscustom.css";

import App from "./App.react";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.render(<App />, rootElement);
} else {
  throw new Error("Could not find root element to mount to!");
}
