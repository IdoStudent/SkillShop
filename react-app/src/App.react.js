import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from 'aws-amplify';

import {
  Error404,
  ProfilePage,
  ProfileSetup,
  EmployerSetup,
  LandingPage,
  JobseekerRegister,
  EmployerRegister,
  Login,
  Candidates
} from "./pages";

import "tabler-react/dist/Tabler.css";
import "semantic-ui-css/semantic.min.css";

// type Props = {||};

class App extends React.Component {

  state = {
    isAuthenticated: false,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  render(){
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return (
      <React.StrictMode>
        <Router>
          <Switch>
            <Route exact path="/" render={(props) => <ProfilePage {...props} auth={authProps} />} />
            <Route exact path="/setup" render={(props) => <ProfileSetup {...props} auth={authProps} />}  />
            <Route exact path="/candidates" render={(props) => <Candidates {...props} auth={authProps} />}  />
            <Route exact path="/employersetup" render={(props) => <EmployerSetup {...props} auth={authProps} />}  />
            
            <Route exact path="/landingpage" component={LandingPage} />
            <Route exact path="/jobseekerregister" render={(props) => <JobseekerRegister {...props} auth={authProps} />} />
            <Route exact path="/employerregister" render={(props) => <EmployerRegister {...props} auth={authProps} />} />
            <Route exact path="/login" render={(props) => <Login {...props} auth={authProps} />} />
            <Route component={Error404} />
          </Switch>
        </Router>
      </React.StrictMode>
    );
  }
}

export default App;
