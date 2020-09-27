import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Auth } from "aws-amplify";

import {
  Error404,
  ProfilePage,
  LandingPage,
  Login,
  Candidates,
  Signup,
  Chat,
  Help,
} from "./pages";

import "tabler-react/dist/Tabler.css";
import "semantic-ui-css/semantic.min.css";

// type Props = {||};

class App extends React.Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    userHasData: null,
  };

  setAuthStatus = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
    console.log("set auth");
  };

  setUser = (user) => {
    this.setState({ user: user });
    console.log("set user");
  };

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch (error) {
      console.log(error);
    }
    this.setState({ isAuthenticating: false });

    //this.checkUserData(Auth.user.attributes.email)

    //console.log(Auth.user.attributes)
  }

 /*checkUserData = (email) => {
    fetch(
      `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +
        email
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.Item !== undefined) {
          // If the user's first name has a length greater than 0, assume that the user has filled out general information data
          if (result.Item.userFirstName.length > 0) {
            this.setState({userHasData: true})
          }
        }
      });
  };*/

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
    };

    return (
      !this.state.isAuthenticating && (
        <React.StrictMode>
          <Router>
            <Switch>
              {/* NO USER PAGES */}
              <Route
                exact
                path="/"
                render={(props) => <LandingPage {...props} auth={authProps} />}
              />
              <Route
                exact
                path="/login"
                render={(props) => <Login {...props} auth={authProps} />}
              />
              <Route
                exact
                path="/signup"
                render={(props) => <Signup {...props} auth={authProps} />}
              />

              {/* IN PROGRESS */}
              <Route
                exact
                path="/chat"
                render={(props) => <Chat {...props} auth={authProps} />}
              />

              {/* PRIVATE ROUTES (USER NEEDS TO BE AUTHENTICATED) */}
              {/* JOBSEEKER PAGES */}
              <PrivateRoute
                userHasData={this.state.userHasData}
                authed={this.state.isAuthenticated}
                path="/myprofile"
                component={ProfilePage}
              />

              {/* EMPLOYER PAGES */}
              <PrivateRoute
                userHasData={this.state.userHasData}
                authed={this.state.isAuthenticated}
                path="/candidates"
                component={Candidates}
              />

              {/* MISC */}
              <Route
                exact
                path="/help"
                render={(props) => <Help {...props} auth={authProps} />}
              />

              {/* ERROR PAGE (NO VALID ROUTE) */}
              <Route component={Error404} />
            </Switch>
          </Router>
        </React.StrictMode>
      )
    );
  }
}

// Redirect function - redirects to login if user is not authenticated
function PrivateRoute({ userHasData, component: Component, authed, ...rest }) {
  //console.log("user has data", userHasData)
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default App;
