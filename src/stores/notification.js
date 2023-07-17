import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
    unread: []
  }),
  actions: {
    markAsRead(notificationId) {
      const notification = this.notifications.find(
        (notification) => notification.id === notificationId
      )
      if (notification) {
        notification.read = true
        this.unread = this.unread.filter(
          (unreadNotification) => unreadNotification.id !== notificationId
        )
      }
    },
    markAllNotificationsAsRead() {
      this.notifications.forEach((notification) => {
        notification.read = true
      })
      this.unread = []
    }
  }
})
