"use client";

import { use } from "react";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { getSingleBlog, deleteBlog } from "@/services/blog.service";

import authStore from "@/store/auth.store";

import CommentSection from "@/components/comments/CommentSection";

import BlogCardSkeleton from "@/skeletons/BlogCardSkeleton";

import ErrorState from "@/components/ui/ErrorState";

export default function SingleBlogPage({ params }) {
  // PARAMS

  const resolvedParams = use(params);

  const blogId = resolvedParams.id;

  // ROUTER

  const router = useRouter();

  const queryClient = useQueryClient();

  // FETCH BLOG

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => getSingleBlog(blogId),
    staleTime: 0,
  });

  const blog = data?.blog;

  // USER

  const user = authStore((state) => state.user);

  // OWNER CHECK

  const isOwner = user?.id === (blog?.authorId?._id || blog?.authorId);

  // DELETE MUTATION

  const {
    mutate: deleteBlogMutation,

    isPending: isDeleting,
  } = useMutation({
    mutationFn: deleteBlog,

    onSuccess: async () => {
      toast.success("Blog deleted");

      // REMOVE SINGLE BLOG CACHE

      queryClient.removeQueries({
        queryKey: ["blog", blogId],
      });

      // REFRESH BLOG LIST

      await queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });

      // REDIRECT

      router.replace("/");
    },

    onError: () => {
      toast.error("Failed to delete blog");
    },
  });

  // DELETE HANDLER

  const handleDelete = () => {
    const confirmed = window.confirm("Delete this blog?");

    if (!confirmed) return;

    deleteBlogMutation(blog._id);
  };

  // LOADING

  if (isLoading) {
    return (
      <div
        className="
        max-w-5xl
        mx-auto
        px-4
        md:px-6
        py-10
      "
      >
        <BlogCardSkeleton />
      </div>
    );
  }

  // ERROR

  if (error) {
    return (
      <ErrorState
        message="
        Failed to load blog
        "
      />
    );
  }

  return (
    <div
      className="
      max-w-5xl
      mx-auto
      px-4
      md:px-6
      py-10
    "
    >
      {/* COVER IMAGE */}

      <div
        className="
        overflow-hidden
        rounded-3xl
        mb-10
        border
      "
      >
        <img
          src={
            blog?.coverImage ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
          }
          alt={blog?.title}
          className="
          w-full
          h-75
          md:h-125
          object-cover
        "
        />
      </div>

      {/* BLOG INFO */}

      <div
        className="
        max-w-4xl
        mx-auto
      "
      >
        {/* CATEGORY */}

        <div
          className="
          inline-block
          px-4
          py-2
          rounded-full
          bg-gray-100
          text-sm
          font-medium
          mb-6
        "
        >
          {blog?.category}
        </div>

        {/* TITLE */}

        <h1
          className="
          text-4xl
          md:text-6xl
          font-black
          leading-tight
        "
        >
          {blog?.title}
        </h1>

        {/* AUTHOR */}

        <div
          className="
          mt-8
          flex
          items-center
          justify-between
          flex-wrap
          gap-5
          pb-8
          border-b
        "
        >
          {/* LEFT */}

          <div
            className="
            flex
            items-center
            gap-4
          "
          >
            {/* AVATAR */}

            <div
              className="
              w-14
              h-14
              rounded-full
              bg-black
              text-white
              flex
              items-center
              justify-center
              text-lg
              font-bold
            "
            >
              {blog?.authorName?.charAt(0)?.toUpperCase()}
            </div>

            {/* AUTHOR INFO */}

            <div>
              <p
                className="
                font-semibold
                text-lg
              "
              >
                {blog?.authorName}
              </p>

              <p
                className="
                text-sm
                text-gray-500
              "
              >
                Blog Author
              </p>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
            flex
            flex-wrap
            items-center
            gap-3
          "
          >
            {/* ACTIONS */}

            {isOwner && (
              <div
                className="
                flex
                items-center
                gap-3
              "
              >
                {/* EDIT */}

                <Link
                  href={`
                    /edit-blog/${blog._id}
                  `}
                >
                  <button
                    className="
                    px-5
                    py-2
                    rounded-xl
                    border
                    font-medium
                    hover:bg-gray-100
                    transition
                  "
                  >
                    Edit
                  </button>
                </Link>

                {/* DELETE */}

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="
                  px-5
                  py-2
                  rounded-xl
                  bg-red-500
                  text-white
                  font-medium
                  hover:bg-red-600
                  transition
                  disabled:opacity-50
                "
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}

            {/* TAGS */}

            {(Array.isArray(blog?.tags)
              ? blog?.tags
              : blog?.tags?.split(",")
            )?.map((tag) => (
              <span
                key={tag}
                className="
                px-3
                py-1
                rounded-full
                bg-black
                text-white
                text-xs
              "
              >
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* CONTENT */}

        <div
          className="
          mt-12
          text-lg
          leading-9
          text-gray-800
          whitespace-pre-wrap
        "
          dangerouslySetInnerHTML={{
            __html: blog.content,
          }}
        ></div>
      </div>

      {/* COMMENTS */}

      <div
        className="
        max-w-4xl
        mx-auto
        mt-20
      "
      >
        <CommentSection blogId={blog._id} />
      </div>
    </div>
  );
}
