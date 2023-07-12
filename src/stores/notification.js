import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    unreadNotifications: [],
    unread: []
  }),
  actions: {
    updateUnreadNotifications() {
      this.unread = this.unreadNotifications.filter((notification) => notification.read === 0)
      return this.unread
    }
  }
})
