import React, { Component } from 'react';
import { Notification } from './notification.js';

export class Notifications extends Component {
  renderNotification() {
    return (
      <Notification />
    )
  }

  render() {
    return (
      <ul className="notifications">
        { this.renderNotification() }
      </ul>
    )
  }
}