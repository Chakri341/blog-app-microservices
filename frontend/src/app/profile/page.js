"use client";

import { useQuery } from "@tanstack/react-query";

import authStore from "@/store/auth.store";

import { getBlogs } from "@/services/blog.service";

import BlogCard from "@/components/BlogCard";

import BlogCardSkeleton from "@/skeletons/BlogCardSkeleton";

import EmptyState from "@/components/ui/EmptyState";

export default function ProfilePage() {
  // USER

  const user = authStore((state) => state.user);

  // FETCH BLOGS

  const {
    data,

    isLoading,
  } = useQuery({
    queryKey: ["blogs"],

    queryFn: getBlogs,
  });

  // FILTER USER BLOGS

  const myBlogs =
    data?.blogs?.filter(
      (blog) => (blog.authorId?._id || blog.authorId) === user?.id,
    ) || [];

  // LOADING

  if (isLoading) {
    return (
      <div
        className="
        max-w-7xl
        mx-auto
        p-6
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
      >
        {Array.from({
          length: 3,
        }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      py-10
    "
    >
      {/* PROFILE HEADER */}

      <div
        className="
        border
        rounded-3xl
        p-8
        mb-12
        bg-white
      "
      >
        {/* TOP */}

        <div
          className="
          flex
          items-center
          gap-6
          flex-wrap
        "
        >
          {/* AVATAR */}

          <div
            className="
            w-24
            h-24
            rounded-full
            bg-black
            text-white
            flex
            items-center
            justify-center
            text-4xl
            font-bold
          "
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>

          {/* INFO */}

          <div>
            <h1
              className="
              text-4xl
              font-black
            "
            >
              {user?.name}
            </h1>

            <p
              className="
              mt-2
              text-gray-500
            "
            >
              {user?.email}
            </p>
          </div>
        </div>

        {/* STATS */}

        <div
          className="
          mt-10
          flex
          gap-10
          flex-wrap
        "
        >
          <div>
            <p
              className="
              text-3xl
              font-black
            "
            >
              {myBlogs.length}
            </p>

            <p
              className="
              text-gray-500
            "
            >
              Blogs
            </p>
          </div>
        </div>
      </div>

      {/* MY BLOGS */}

      <div>
        <div
          className="
          flex
          items-center
          justify-between
          mb-8
          flex-wrap
          gap-4
        "
        >
          <h2
            className="
            text-3xl
            font-black
          "
          >
            My Blogs
          </h2>
        </div>

        {/* EMPTY */}

        {myBlogs.length === 0 ? (
          <EmptyState
            title="
            No Blogs Yet
            "
            description="
            Start creating your first blog.
            "
            buttonText="
            Create Blog
            "
            buttonLink="
            /create-blog
            "
          />
        ) : (
          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-6
          "
          >
            {myBlogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
