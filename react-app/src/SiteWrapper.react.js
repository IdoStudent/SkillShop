// @flow

import * as React from "react";
import { NavLink, withRouter } from "react-router-dom";

import {
  Site,
  RouterContextProvider,
} from "tabler-react";

import type { NotificationProps } from "tabler-react";

type Props = {|
  +children: React.Node,
|};

type State = {|
  notificationsObjects: Array<NotificationProps>,
|};

type subNavItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +LinkComponent?: React.ElementType,
  +useExact?: boolean,
|};

type navItem = {|
  +value: string,
  +to?: string,
  +icon?: string,
  +active?: boolean,
  +LinkComponent?: React.ElementType,
  +subItems?: Array<subNavItem>,
  +useExact?: boolean,
|};

const navBarItems: Array<navItem> = [
  {
    value: "Home (Jobseeker - Placeholder)",
    to: "/",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },
  {
    value: "Candidates Screen (Employer - Placeholder)",
    to: "/candidates",
    icon: "home",
    LinkComponent: withRouter(NavLink),
    useExact: true,
  },

    /* Example of how to use a sub-nav dropdown (if we need it)
    subItems: [
      {
        value: "Cards Design",
        to: "/cards",
        LinkComponent: withRouter(NavLink),
      },
      { value: "Charts", to: "/charts", LinkComponent: withRouter(NavLink) },
      {
        value: "Pricing Cards",
        to: "/pricing-cards",
        LinkComponent: withRouter(NavLink),
      },
    ],
    */
];

const accountDropdownProps = {
  avatarURL: "./demo/faces/female/25.jpg",
  name: "Jane Pearson",
  description: "Administrator",
  options: [
    { icon: "user", value: "Profile", to: "/", LinkComponent: withRouter(NavLink) },
    { icon: "mail", value: "Inbox", badge: "6" },
    { isDivider: true },
    { icon: "log-out", value: "Sign out" },
  ],
};

class SiteWrapper extends React.Component<Props, State> {
  state = {
    notificationsObjects: [
      {
        unread: true,
        //avatarURL: "demo/faces/male/41.jpg",
        message: (
          <React.Fragment>
            You have a new match! <strong>Marketing Consultant</strong> at <strong>Deloitte</strong>
          </React.Fragment> 
        ),
        time: "10 minutes ago",
      },
      {
        unread: true,
        //avatarURL: "demo/faces/female/1.jpg",
        message: (
          <React.Fragment>
            You have a new match! <strong>Creative Intern</strong> at <strong>Envato</strong>
          </React.Fragment> 
        ),
        time: "1 hour ago",
      },
      {
        unread: false,
        //avatarURL: "demo/faces/female/18.jpg",
        message: (
          <React.Fragment>
            You've received a new message.  <u>Click to view</u>
          </React.Fragment>
        ),
        time: "2 hours ago",
      },
    ],
  };

  render(): React.Node {
    const notificationsObjects = this.state.notificationsObjects || [];
    const unreadCount = this.state.notificationsObjects.reduce(
      (a, v) => a || v.unread,
      false
    );
    return (
      <Site.Wrapper
        headerProps={{
          notificationsTray: {
            notificationsObjects,
            markAllAsRead: () =>
              this.setState(
                () => ({
                  notificationsObjects: this.state.notificationsObjects.map(
                    v => ({ ...v, unread: false })
                  ),
                }),
                () =>
                  setTimeout(
                    () =>
                      this.setState({
                        notificationsObjects: this.state.notificationsObjects.map(
                          v => ({ ...v, unread: true })
                        ),
                      }),
                    5000
                  )
              ),
            unread: unreadCount,
          },
          accountDropdown: accountDropdownProps,
        }}
        navProps={{ itemsObjects: navBarItems }}
        routerContextComponentType={withRouter(RouterContextProvider)}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
