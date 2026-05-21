export default function
BlogCardSkeleton() {

  return (

    <div
      className="
      animate-pulse
      border
      rounded-2xl
      overflow-hidden
      bg-white
    "
    >

      {/* IMAGE */}

      <div
        className="
        h-56
        bg-gray-200
      "
      />

      {/* CONTENT */}

      <div
        className="
        p-5
        space-y-4
      "
      >

        <div
          className="
          h-6
          bg-gray-200
          rounded
          w-3/4
        "
        />

        <div
          className="
          h-4
          bg-gray-200
          rounded
          w-full
        "
        />

        <div
          className="
          h-4
          bg-gray-200
          rounded
          w-5/6
        "
        />

        <div
          className="
          flex
          gap-3
          pt-2
        "
        >

          <div
            className="
            h-8
            w-20
            rounded-full
            bg-gray-200
          "
          />

          <div
            className="
            h-8
            w-20
            rounded-full
            bg-gray-200
          "
          />

        </div>

      </div>

    </div>

  );

}