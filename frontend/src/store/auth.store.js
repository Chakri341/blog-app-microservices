import { create }
from "zustand";

const authStore =
  create((set) => ({

    // INITIAL STATE

    user:

      typeof window !==
      "undefined"

        ? JSON.parse(

            localStorage.getItem(
              "user"
            ) || "null"

          )

        : null,

    token:

      typeof window !==
      "undefined"

        ? localStorage.getItem(
            "token"
          )

        : null,


    // LOGIN
    login: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      set({ token: data.token, user: data.user });
    },

    // SET AUTH (for direct setting from login page)
    setAuth: (user, token) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ token, user });
    },

    // LOGOUT

    logout: () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      set({
        token: null,
        user: null,
      });

    },

  }));

export default
authStore;