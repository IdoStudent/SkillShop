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
  About,
  ProfileSetup
} from "./pages";

import "tabler-react/dist/Tabler.css";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    userHasData: null,
  };

  setAuthStatus = (authenticated) => {
    this.setState({ isAuthenticated: authenticated });
  };

  setUser = (user) => {
    this.setState({ user: user });
  };

  isUserAuthenticated = () => {
    let isAuthenticated = true;
    if(Auth.user === null) {
      isAuthenticated = false;
    }

    return isAuthenticated;
  }

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

    this.isUserAuthenticated()
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
                path="/login"
                component={Login}
              />

              <NoUser
                path="/signup"
                component={Signup}
              />

              {/* PRIVATE ROUTES (USER NEEDS TO BE AUTHENTICATED) */}
              
              <PrivateRoute
                path="/chat"
                component={Chat}
              />

              {/* JOBSEEKER PAGES */}
              <PrivateRoute
                path="/myprofile"
                component={ProfilePage}
              />

              <PrivateRoute
                path="/profilesetup"
                component={ProfileSetup}
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
                path="/about"
                render={(props) => <About {...props} auth={authProps} />}
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
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.user !== null ? (
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
function NoUser({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        Auth.user === null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/myprofile" }} />
        )
      }
    />
  );
}

export default App;
