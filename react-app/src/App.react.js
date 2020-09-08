import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from 'aws-amplify';

import {
  Error404,
  ProfilePage,
  LandingPage,
  Login,
  Candidates,
  TestUser,
  RegistrationPageEmployer,
  RegistrationPageJobseeker
} from "./pages";

import "tabler-react/dist/Tabler.css";
import "semantic-ui-css/semantic.min.css";

// type Props = {||};

class App extends React.Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
    console.log('set auth');
  }

  setUser = user => {
    this.setState({ user: user });
    console.log('set user');
  }

  async componentDidMount() {
    try {
    const session = await Auth.currentSession();
    this.setAuthStatus(true);
    console.log(session);
    const user = await Auth.currentAuthenticatedUser();
    this.state.setUser(user);
    }catch(error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });
  }
  render(){
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }

    return (
      !this.state.isAuthenticating &&
      <React.StrictMode>     
        <Router>
          <Switch>

            {/* NO USER PAGES */}
            <Route exact path="/" render={(props) => <LandingPage {...props} auth={authProps} />} />
            <Route exact path="/login" render={(props) => <Login {...props} auth={authProps} />} />
            <Route exact path="/registrationpageemployer" render={(props) => <RegistrationPageEmployer {...props} auth={authProps} />} />
            <Route exact path="/registrationpagejobseeker" render={(props) => <RegistrationPageJobseeker {...props} auth={authProps} />} />

            {/* JOBSEEKER PAGES */}
            <Route exact path="/myprofile" render={(props) => <ProfilePage {...props} auth={authProps} />} />

            {/* EMPLOYER PAGES */}
            <Route exact path="/candidates" render={(props) => <Candidates {...props} auth={authProps} />}  />

            <Route exact path="/testuser" render={(props) => <TestUser {...props} auth={authProps} />} />

            {/* ERROR PAGE (NO VALID ROUTE) */}
            <Route component={Error404} />
          </Switch>
        </Router>
      </React.StrictMode>
    );
  }
}

export default App;
