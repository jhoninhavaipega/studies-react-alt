import alt from '../alt.js';
import NotificationActions from '../actions/NotificationActions.js';

class NotificationStore {
  constructor() {
    this.bindListeners({
      handleUpdateNotifications: NotificationActions.UPDATE_NOTIFICATIONS,
      handleFailedNotifications: NotificationActions.FAILED_NOTIFICATIONS,
      handleFetchNotifications: NotificationActions.UPDATE_NOTIFICATIONS
    });

    this.notifications = [];
    this.errorMessage = null;
  }

  handleUpdateNotifications(notifications) {
    this.notifications = notifications;
    this.errorMessage = null;
  }

  handleFailedNotifications(errorMessage) {
    this.errorMessage = errorMessage;
  }

  handleFetchNotifications() {}
}

export default alt.createStore(NotificationStore, 'NotificationStore');