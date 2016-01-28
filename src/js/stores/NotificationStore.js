import alt from '../alt'

class NotificationStore {
  constructor() {
    this.notifications = [];

    this.bindListeners({
      handleUpdateNotifications: NotificationActions.UPDATE_NOTIFICATION
    });
  }

  handleUpdateNotifications(notifications) {
    this.notifications = notifications;
  }
}

export alt.createStore(NotificationStore, 'NotificationStore');