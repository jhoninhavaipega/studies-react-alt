import React, { Component } from 'react';
import { Dropdown } from '../dropdown/app.js';
import { Notifications } from '../notifications/app.js';

export class ListNotifications extends Component {
  render() {
    return (
      <Dropdown content={ <Notifications /> } />
    )
  }
}