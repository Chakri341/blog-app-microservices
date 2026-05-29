import { create } from "zustand";

const notificationStore = create((set) => ({
  notifications: [],

  unreadCount: 0,

  // SET INITIAL

  setNotifications: (notifications) =>
    set({
      notifications,

      unreadCount: notifications.filter((n) => !n.read).length,
    }),

  // ADD REALTIME

  addNotification: (notification) =>
    set((state) => {
      const updated = [notification, ...state.notifications];

      return {
        notifications: updated,

        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),

  // MARK READ

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((notification) => {
        if (notification._id === id) {
          return {
            ...notification,

            read: true,
          };
        }

        return notification;
      });

      return {
        notifications: [...updated],

        unreadCount: updated.filter((n) => !n.read).length,
      };
    }),
}));

export default notificationStore;
