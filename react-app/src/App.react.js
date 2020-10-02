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
  }

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

              <NoUser
                authed={this.state.isAuthenticated}
                path="/login"
                component={Login}
              />

              <NoUser
                authed={this.state.isAuthenticated}
                path="/signup"
                component={Signup}
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
                authed={this.state.isAuthenticated}
                path="/myprofile"
                component={ProfilePage}
              />

              {/* EMPLOYER PAGES */}
              <PrivateRoute
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
function PrivateRoute({ component: Component, authed, ...rest }) {
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

// Redirect function - redirects to myProfile if user is authenticated
function NoUser({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/myprofile" }} />
        )
      }
    />
  );
}

export default App;
