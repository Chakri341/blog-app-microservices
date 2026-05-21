"use client";

import {
  useEffect,
} from "react";

import {
  useQuery,
} from
"@tanstack/react-query";

import socket
from "../socket/socket";

import notificationStore
from "../store/notification.store";

import {
  getNotifications,
} from "../services/notification.service";

export default function
RealtimeNotifications() {

  const {

    addNotification,

    setNotifications,

  } = notificationStore();

  // FETCH OLD NOTIFICATIONS

  const { data } =
    useQuery({

      queryKey: [
        "notifications",
      ],

      queryFn:
        getNotifications,

    });

  // SET INITIAL DATA

  useEffect(() => {

    if (
      data?.notifications
    ) {

      setNotifications(
        data.notifications
      );

    }

  }, [data]);

  // REALTIME LISTENER

  useEffect(() => {

    socket.on(

      "new_notification",

      (notification) => {

        console.log(
          "Realtime Notification:",
          notification
        );

        addNotification(
          notification
        );

      }

    );

    return () => {

      socket.off(
        "new_notification"
      );

    };

  }, []);

  return null;

}