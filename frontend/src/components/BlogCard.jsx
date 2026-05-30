"use client";

import Link from "next/link";

export default function BlogCard({ blog }) {
  const tags = Array.isArray(blog.tags) ? blog.tags : blog.tags?.split(",");

  return (
    <Link href={`/blogs/${blog._id}`}>
      <article
        className="
        group
        bg-white
        border
        border-gray-200
        rounded-2xl
        overflow-hidden
        transition-all
        duration-300
        hover:shadow-xl
        hover:border-gray-300
      "
      >
        {/* IMAGE */}

        <div
          className="
          relative
          overflow-hidden
        "
        >
          <img
            src={
              blog.coverImage ||
              "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
            }
            alt={blog.title}
            className="
            w-full
            h-56
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
          />

          {/* CATEGORY */}

          <div
            className="
            absolute
            top-4
            left-4
            px-3
            py-1
            rounded-full
            bg-white/90
            backdrop-blur
            text-xs
            font-medium
            shadow-sm
          "
          >
            {blog.category}
          </div>
        </div>

        {/* CONTENT */}

        <div
          className="
          p-6
        "
        >
          {/* TITLE */}

          <h2
            className="
            text-2xl
            font-bold
            leading-tight
            line-clamp-2
            text-gray-900
            transition-colors
            group-hover:text-black
          "
          >
            {blog.title}
          </h2>

          {/* TAGS */}

          {tags?.length > 0 && (
            <div
              className="
              mt-5
              flex
              flex-wrap
              gap-2
            "
            >
              {tags[0].split(",").splice(0,4).map((tag) => (
                <span
                  key={tag}
                  className="
                    text-xs
                    px-3
                    py-1
                    rounded-full
                    bg-gray-100
                    text-gray-700
                  "
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}

          {/* DESCRIPTION */}

          <p
            className="
            mt-4
            text-gray-600
            text-sm
            leading-7
            line-clamp-3
          "
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></p>

          {/* FOOTER */}

          <div
            className="
            mt-6
            pt-5
            border-t
            border-gray-100
            flex
            items-center
            justify-between
          "
          >
            {/* AUTHOR */}

            <div
              className="
              flex
              items-center
              gap-3
            "
            >
              <div
                className="
                w-11
                h-11
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                font-semibold
                text-sm
              "
              >
                {blog.authorName?.charAt(0)?.toUpperCase()}
              </div>

              <div>
                <p
                  className="
                  text-sm
                  font-semibold
                  text-gray-900
                "
                >
                  {blog.authorName}
                </p>

                <p
                  className="
                  text-xs
                  text-gray-500
                "
                >
                  Blog Author
                </p>
              </div>
            </div>

            {/* CTA */}

            <span
              className="
              text-sm
              font-medium
              text-black
              group-hover:translate-x-1
              transition-transform
            "
            >
              Read →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
