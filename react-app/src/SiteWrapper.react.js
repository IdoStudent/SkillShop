// @flow

import * as React from "react";
import { NavLink, Redirect, withRouter } from "react-router-dom";

import Auth from "@aws-amplify/auth";

import { AccountDropdown, Icon as IconAlt, Notification } from "tabler-react";
import { Menu, Sidebar, Icon as IconMain } from "semantic-ui-react";

class SiteWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: " ",
      userFirstName: null,

      noData: false,

      redirect: false,
    };

    this.signOut = this.signOut.bind(this);
  }

  getUserData = (email) => {
    console.log(email);
    fetch(
      `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +
        email
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // If length is undefined, that means for some reason it's not returning data at all, so dont try and access fields that dont exist
        if (result.Item !== undefined) {
          let name = result.Item.userFirstName;

          this.setState({ userFirstName: name });
        } else {
          this.props.history.push({
            pathname: "/profilesetup",
          });
        }
      });
  };

  componentDidMount() {
    var date = new Date();
    var hour = date.getHours();

    // Work out the current time to determine what message to display
    if (hour < 12) {
      this.setState({ msg: "Good Morning, " });
    } else if (hour >= 12 && hour <= 17) {
      this.setState({ msg: "Good Afternoon, " });
    } else if (hour >= 17 && hour <= 24) {
      this.setState({ msg: "Good Evening, " });
    }

    this.getUserData(Auth.user.attributes.email);
  }

  async signOut() {
    try {
      await Auth.signOut();
      localStorage.clear();
      this.setState({ redirect: true });

      console.log(Auth.user);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }

    const userType = Auth.user.attributes["custom:role"];
    return (
      <div className="wrapper">
        {/* SIDEBAR */}
        <Sidebar as={Menu} vertical visible width="thin" className="sidebar">
          {/* MAIN LOGO */}
          <div className="siteLogo" />

          {/* MENU ITEMS */}
          <div className="menuItems">
            {/* If the user is an employer, show the navigation link for the candidates page, otherwise show the navigation link for the profile page */}
            {userType == "employer" ? (
              <NavLink exact activeClassName="active" to="/candidates">
                <Menu.Item>
                  <IconMain name="users" className="icon" />
                </Menu.Item>
              </NavLink>
            ) : (
              <NavLink exact activeClassName="active" to="/myprofile">
                <Menu.Item>
                  <IconMain name="home" className="icon" />
                </Menu.Item>
              </NavLink>
            )}

            {/* Both users can access chat */}
            <NavLink exact activeClassName="active" to="/chat">
              <Menu.Item>
                <IconMain name="comments" className="icon" />
              </Menu.Item>
            </NavLink>
          </div>

          <div className="logout">
            <IconAlt name="log-out" className="icon" onClick={this.signOut} />
          </div>
        </Sidebar>
        {/* TOP BAR */}
        <div className="topNav">
          <p className="heading">
            Skill
            <b>Shop</b>
          </p>

          <div className="accountInfo">
            {this.state.msg}
            <div className="accountDropdown">
              <AccountDropdown
                className="accountDropdown"
                name={this.state.userFirstName}
                options={[
                  { icon: "user", value: "Profile", to: "/myprofile" },
                  "divider",
                  { icon: "info", value: "About SkillShop", to: "/about" },
                  {
                    icon: "log-out",
                    value: "Logout",
                    onClick: () => this.signOut(),
                  },
                ]}
              />
            </div>

            <div className="verticalDivider" />

            <div className="notifications">
              <Notification.Tray unread={false}>
                <Notification
                  message={
                    <React.Fragment>
                      <i>You have no new notifications</i>
                    </React.Fragment>
                  }
                />
              </Notification.Tray>
            </div>
          </div>
        </div>

        <div className="sitecontent">{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(SiteWrapper);
