import React, { Component } from 'react';
import { Notification } from './notification.js';
import NotificationStore from '../../stores/NotificationStore.js';
import NotificationActions from '../../actions/NotificationActions.js';

export class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
      errorMessage: null
    };

    this.onChange = this.onChange.bind(this);
  }

  getInitialState() {
    return NotificationStore.getState();
  }

  componentDidMount() {
    NotificationStore.listen(this.onChange);
    NotificationActions.fetchNotifications();
  }

  componentWillUnmount() {
    NotificationStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    if (this.state.errorMessage) {
      return (
        <div>Something is wrong</div>
      );
    }

    if (!this.state.notifications.length) {
      return (
        <div>
          <img src="/my-cool-spinner.gif" />
        </div>
      );
    }

    return (
      <ul className="notifications">
        {this.state.notifications.map((notification) => {
          return (
            <Notification data={ notification } />
          );
        })}
      </ul>
    );
  }
}