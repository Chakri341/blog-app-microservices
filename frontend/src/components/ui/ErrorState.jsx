export default function
ErrorState({

  message =
    "Something went wrong",

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

        ⚠️

      </div>

      {/* TITLE */}

      <h2
        className="
        mt-6
        text-2xl
        font-bold
      "
      >

        Oops!

      </h2>

      {/* MESSAGE */}

      <p
        className="
        mt-3
        text-gray-500
      "
      >

        {message}

      </p>

    </div>

  );

}