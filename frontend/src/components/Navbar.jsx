"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { Menu, X } from "lucide-react";

import authStore from "../store/auth.store";

import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const token = authStore((state) => state.token);

  const logout = authStore((state) => state.logout);

  const user = authStore((state) => state.user);

  // PREVENT HYDRATION ERROR

  if (!mounted) {
    return null;
  }

  return (
    <header
      className="
      sticky
      top-0
      z-40
      bg-white/90
      backdrop-blur-md
      border-b
    "
    >
      {/* MAIN NAVBAR */}

      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        h-16
        flex
        items-center
        justify-between
      "
      >
        {/* LEFT */}

        <div
          className="
          flex
          items-center
          gap-10
        "
        >
          {/* LOGO */}

          <Link
            href="/"
            className="
            text-2xl
            font-bold
          "
          >
            Blogify
          </Link>

          {/* DESKTOP NAV */}

          <nav
            className="
            hidden
            md:flex
            items-center
            gap-6
            text-sm
            text-gray-700
          "
          >
            {user && (
              <Link href="/profile">
                <button
                  className="
                    px-4
                    py-2
                    rounded-xl
                    border
                  hover:bg-gray-100
                    transition
                    cursor-pointer"
                >
                  Profile
                </button>
              </Link>
            )}

            {token && (
              <Link href="/create-blog">
                <button
                  className="
                    px-4
                    py-2
                    rounded-xl
                    border
                  hover:bg-gray-100
                    transition
                    cursor-pointer
    "
                >
                  Create
                </button>
              </Link>
            )}
          </nav>
        </div>

        {/* RIGHT */}

        <div
          className="
          flex
          items-center
          gap-5
        "
        >
          {/* MOBILE MENU BUTTON */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
            md:hidden
          "
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* NOTIFICATIONS */}

          {token && <NotificationBell />}

          {/* DESKTOP AUTH */}

          <div
            className="
            hidden
            md:flex
            items-center
            gap-3
          "
          >
            {token ? (
              <button
                onClick={logout}
                className="
                px-4
                py-2
                rounded-xl
                bg-black
                text-white
                text-sm
              "
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login">
                  <button
                    className="
                    px-4
                    py-2
                    rounded-xl
                    border
                    text-sm
                  "
                  >
                    Login
                  </button>
                </Link>

                <Link href="/register">
                  <button
                    className="
                    px-4
                    py-2
                    rounded-xl
                    bg-black
                    text-white
                    text-sm
                  "
                  >
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}

      {mobileOpen && (
        <div
          className="
          md:hidden
          border-t
          bg-white
        "
        >
          <div
            className="
            px-6
            py-5
            flex
            flex-col
            gap-5
            text-sm
          "
          >
            <Link href="/" onClick={() => setMobileOpen(false)}>
              Home
            </Link>

            <Link href="/blogs" onClick={() => setMobileOpen(false)}>
              Blogs
            </Link>

            {token && (
              <Link href="/create-blog" onClick={() => setMobileOpen(false)}>
                Create Blog
              </Link>
            )}

            {token ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="
                w-fit
                px-4
                py-2
                rounded-xl
                bg-black
                text-white
                cursor-pointer
              "
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>

                <Link href="/register" onClick={() => setMobileOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
