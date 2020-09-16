// @flow

import * as React from "react";
import { NavLink, Redirect } from "react-router-dom";

import Auth from "@aws-amplify/auth";

import {
  AccountDropdown,
  Icon as IconAlt,
  Notification,
} from "tabler-react";

import { Menu, Sidebar, Icon as IconMain } from "semantic-ui-react";

// acc details
// tkt27786@cuoly.com
// 12345678



class SiteWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: " ",
      userFirstName: null,
  
      redirect: false,
    };

    this.signOut = this.signOut.bind(this);
}


  async getUserData(email) {
    fetch(
      `https://ezha2ns0bl.execute-api.ap-southeast-2.amazonaws.com/prod/userdata?userEmail=` +
        email )
      .then((res) => res.json())
      .then((result) => {
        // If length is undefined, that means for some reason it's not returning data at all, so dont try and access fields that dont exist
        if (result.Item !== undefined) {
          this.setState({userFirstName: result.Item.userFirstName})
        }  
  })}

  componentDidMount() {
    var date = new Date();
    var hour = date.getHours();
    console.log(date.getHours());

    if (hour < 12) {
      this.setState({ msg: "Good Morning, " });
    } else if (hour >= 12 && hour <= 17) {
      this.setState({ msg: "Good Afternoon, " });
    } else if (hour >= 17 && hour <= 24) {
      this.setState({ msg: "Good Evening, " });
    }

    this.getUserData(Auth.user.attributes.email)
  }

  async signOut() {
    try {
        // UNCOMMENT BELOW LINE TO ACTUALLY SIGN OUT USERS
        //await Auth.signOut();

        this.setState({redirect: true});
    } catch (error) {
        console.log('error signing out: ', error);
    }
}


  render() {
    if (this.state.redirect) {
      return <Redirect push to="/login" />;
    }
    return (
      <div className="wrapper">
        {/* SIDEBAR */}
        <Sidebar as={Menu} vertical visible width="thin" className="sidebar">
          {/* MAIN LOGO */}
          <div className="siteLogo" />

          {/* MENU ITEMS */}
          <div className="menuItems"> 
          <NavLink exact activeClassName="active" to="/myprofile">
            <Menu.Item>
              <IconMain name="home" className="icon" />
            </Menu.Item>
          </NavLink>

          <NavLink exact activeClassName="active" to="/candidates">
            <Menu.Item>
              <IconMain name="users" className="icon" />
            </Menu.Item>
          </NavLink>
          </div>

          <div className="logout">
            <IconAlt name="log-out" className="icon" onClick={this.signOut}/>
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
                  "profile",
                  { icon: "settings", value: "Settings", to: "/settings" },
                  "divider",
                  "help",
                  { icon: "log-out", value: "Logout", onClick: () => this.signOut() },
                ]}
              />
            </div>

            <div className="verticalDivider" />

            <div className="notifications">
             <Notification.Tray unread={true}>
              <Notification
                avatarURL="demo/faces/male/41.jpg"
                message={
                  <React.Fragment>
                    <strong>Nathan</strong> pushed new commit: Fix page load
                    performance issue.
                  </React.Fragment>
                }
                time="10 minutes ago"
              />
              <Notification
                avatarURL="demo/faces/female/1.jpg"
                message={
                  <React.Fragment>
                    <strong>Alice</strong> started new task: Tabler UI design.
                  </React.Fragment>
                }
                time="1 hour ago"
              />
              <Notification
                avatarURL="demo/faces/female/18.jpg"
                message={
                  <React.Fragment>
                    <strong>Rose</strong> deployed new version of NodeJS REST
                    Api // V3
                  </React.Fragment>
                }
                time="2 hours ago"
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

export default SiteWrapper;
