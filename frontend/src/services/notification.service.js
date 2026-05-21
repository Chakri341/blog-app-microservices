import axios from "axios";

import authStore
from "../store/auth.store";

const API =
  "http://localhost:8000/api/notifications";

// GET NOTIFICATIONS

export const
getNotifications =
  async () => {

    const token =
      authStore
        .getState()
        .token;

    const response =
      await axios.get(

        API,

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

    return response.data;

  };

// MARK READ

export const
markNotificationRead =
  async (id) => {

    const token =
      authStore
        .getState()
        .token;

    const response =
      await axios.put(

        `${API}/${id}/read`,

        {},

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

    return response.data;

  };