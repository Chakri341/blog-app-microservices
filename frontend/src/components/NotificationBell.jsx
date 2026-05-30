"use client";

import { useState } from "react";

import notificationStore from "../store/notification.store";

import { useMutation } from "@tanstack/react-query";

import { markNotificationRead } from "../services/notification.service";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);

  const notifications = notificationStore((state) => state.notifications);

  const unreadCount = notificationStore((state) => state.unreadCount);

  const markAsRead = notificationStore((state) => state.markAsRead);

  // MUTATION

  const mutation = useMutation({
    mutationFn: markNotificationRead,
  });

  // CLICK HANDLER

  const handleRead = (notification) => {
    if (notification.read) {
      return;
    }

    // UI UPDATE FIRST

    markAsRead(notification._id);

    // BACKEND UPDATE

    mutation.mutate(notification._id);
  };

  return (
    <div
      className="
      relative
      z-50
    "
    >
      {/* BELL */}

      <button
        onClick={() => setOpen(!open)}
        className="
        relative
        w-12
        h-12
        rounded-full
        bg-black
        text-white
        flex
        items-center
        justify-center
        text-xl
        shadow-lg
        cursor-pointer
      "
      >
        🔔
        {/* COUNT */}
        {unreadCount > 0 && (
          <span
            className="
            absolute
            -top-1
            -right-1
            bg-red-500
            text-white
            text-xs
            w-5
            h-5
            rounded-full
            flex
            items-center
            justify-center
          "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* DROPDOWN */}

      {open && (
        <div
          className="
          absolute
          right-0
          mt-3
          w-80
          bg-white
          border
          rounded-2xl
          shadow-2xl
          overflow-hidden
        "
        >
          {/* HEADER */}

          <div
            className="
            px-5
            py-4
            border-b
            flex
            items-center
            justify-between
          "
          >
            <h2
              className="
              font-semibold
            "
            >
              Notifications
            </h2>

            {unreadCount > 0 && (
              <span
                className="
                text-xs
                bg-red-500
                text-white
                px-2
                py-1
                rounded-full
              "
              >
                {unreadCount}
              </span>
            )}
          </div>

          {/* LIST */}

          <div
            className="
            max-h-96
            overflow-y-auto
          "
          >
            {notifications.length === 0 ? (
              <p
                className="
                p-5
                text-sm
                text-gray-500
              "
              >
                No notifications
              </p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleRead(notification)}
                  className={`
                      px-5
                      py-4
                      border-b
                      cursor-pointer
                      transition

                      ${notification.read ? "bg-white" : "bg-blue-50"}
                    `}
                >
                  <div
                    className="
                      flex
                      items-start
                      gap-3
                    "
                  >
                    {/* BLUE DOT */}

                    {!notification.read && (
                      <div
                        className="
                          w-2
                          h-2
                          rounded-full
                          bg-blue-500
                          mt-2
                          shrink-0
                        "
                      />
                    )}

                    {/* MESSAGE */}

                    <p
                      className="
                        text-sm
                        leading-6
                        text-gray-800
                      "
                    >
                      {notification.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
