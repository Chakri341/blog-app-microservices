import Link
from "next/link";

export default function
EmptyState({

  title =
    "Nothing Found",

  description =
    "No data available.",

  buttonText,

  buttonLink,

}) {

  return (

    <div
      className="
      py-24
      flex
      flex-col
      items-center
      justify-center
      text-center
    "
    >

      {/* ICON */}

      <div
        className="
        text-6xl
      "
      >

        📭

      </div>

      {/* TITLE */}

      <h2
        className="
        mt-6
        text-2xl
        font-bold
      "
      >

        {title}

      </h2>

      {/* DESCRIPTION */}

      <p
        className="
        mt-3
        text-gray-500
        max-w-md
      "
      >

        {description}

      </p>

      {/* BUTTON */}

      {buttonText &&
        buttonLink && (

          <Link
            href={buttonLink}
          >

            <button
              className="
              mt-8
              px-6
              py-3
              rounded-xl
              bg-black
              text-white
              font-medium
              hover:opacity-90
              transition
            "
            >

              {buttonText}

            </button>

          </Link>

      )}

    </div>

  );

}