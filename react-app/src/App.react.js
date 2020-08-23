import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Error404,
  ProfilePage,
  ProfileSetup,
  EmployerSetup
} from "./pages";

import "tabler-react/dist/Tabler.css";
import "semantic-ui-css/semantic.min.css";

type Props = {||};

function App(props: Props): React.Node {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" component={ProfilePage} />
          <Route exact path="/setup" component={ProfileSetup} />
          <Route exact path="/employersetup" component={EmployerSetup} />
          <Route component={Error404} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
