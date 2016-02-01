import alt from '../alt.js';
import NotificationSource from '../sources/NotificationSource.js';

class NotificationActions {
  updateNotifications(notifications) {
    return notifications;
  }

  failedNotifications(errorMessage) {
    return errorMessage;
  }

  fetchNotifications() {
    return (dispatch) => {
      dispatch();

      NotificationSource.fetch()
        .then((notifications) => {
          this.updateNotifications(notifications);
        })
        .catch((errorMessage) => {
          this.failedNotifications(errorMessage);
        });
    }
  }
}

export default alt.createActions(NotificationActions);