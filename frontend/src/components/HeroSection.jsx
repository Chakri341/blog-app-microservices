import Link
from "next/link";

export default function
HeroSection() {

  return (

    <section
      className="
      py-24
      px-6
    "
    >

      <div
        className="
        max-w-6xl
        mx-auto
        text-center
      "
      >

        {/* BADGE */}

        <div
          className="
          inline-block
          px-4
          py-2
          rounded-full
          bg-gray-100
          text-sm
          mb-6
        "
        >

          🚀 Modern Blogging Platform

        </div>

        {/* TITLE */}

        <h1
          className="
          text-5xl
          md:text-7xl
          font-black
          leading-tight
        "
        >

          Share Your

          <span
            className="
            block
          "
          >

            Ideas With The World

          </span>

        </h1>

        {/* SUBTITLE */}

        <p
          className="
          mt-8
          text-lg
          text-gray-600
          max-w-2xl
          mx-auto
          leading-8
        "
        >

          Create blogs, engage in
          discussions, receive realtime
          notifications, and build your
          developer presence.

        </p>

        {/* BUTTONS */}

        <div
          className="
          mt-10
          flex
          flex-col
          sm:flex-row
          items-center
          justify-center
          gap-4
        "
        >

          <Link
            href="/create-blog"
          >

            <button
              className="
              px-8
              py-4
              rounded-2xl
              bg-black
              text-white
              font-medium
            "
            >

              Start Writing

            </button>

          </Link>

          <Link
            href="/"
          >

            <button
              className="
              px-8
              py-4
              rounded-2xl
              border
              font-medium
            "
            >

              Explore Blogs

            </button>

          </Link>

        </div>

      </div>

    </section>

  );

}