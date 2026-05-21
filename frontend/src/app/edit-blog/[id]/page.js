"use client";

import {
  use,
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {

  useQuery,

  useMutation,

  useQueryClient,

} from
  "@tanstack/react-query";

import toast
  from "react-hot-toast";

import {

  getSingleBlog,

  updateBlog,

} from
  "@/services/blog.service";

import RichTextEditor
  from "@/components/editor/RichTextEditor";

export default function
  EditBlogPage({

    params,

  }) {

  // PARAMS

  const resolvedParams =
    use(params);

  const blogId =
    resolvedParams.id;

  // ROUTER

  const router =
    useRouter();

  const queryClient =
    useQueryClient();

  // FORM STATE

  const [

    title,

    setTitle,

  ] = useState("");

  const [

    content,

    setContent,

  ] = useState("");

  const [

    category,

    setCategory,

  ] = useState("");

  const [

    tags,

    setTags,

  ] = useState("");

  const [

    coverImage,

    setCoverImage,

  ] = useState(null);

  // FETCH BLOG

  const {

    data,

    isLoading,

    error,

  } = useQuery({

    queryKey: [
      "blog",
      blogId,
    ],

    queryFn: () =>
      getSingleBlog(
        blogId
      ),

  });

  const blog =
    data?.blog;

  // PREFILL FORM

  useEffect(() => {

    if (blog) {

      setTitle(
        blog.title || ""
      );

      setContent(
        blog.content || ""
      );

      setCategory(
        blog.category || ""
      );

      setTags(

        Array.isArray(
          blog.tags
        )

          ? blog.tags.join(",")

          : blog.tags || ""

      );

    }

  }, [blog]);

  // UPDATE MUTATION

  const {

    mutate:
    updateBlogMutation,

    isPending:
    isUpdating,

  } = useMutation({

    mutationFn:
      updateBlog,

    onSuccess: async () => {

      toast.success(
        "Blog updated"
      );

      // REFRESH BLOG LIST

      await queryClient.invalidateQueries({

        queryKey: [
          "blogs",
        ],

      });

      // REMOVE OLD BLOG CACHE

      queryClient.removeQueries({

        queryKey: [
          "blog",
          blogId,
        ],

      });

      // REDIRECT TO FRESH BLOG PAGE

      router.replace(
        `/blogs/${blogId}`
      );

    },

    onError: () => {

      toast.error(
        "Failed to update blog"
      );

    },

  });

  // SUBMIT

  const handleSubmit =
    (e) => {

      e.preventDefault();

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "content",
        content
      );

      formData.append(
        "category",
        category
      );

      formData.append(
        "tags",
        tags
      );

      if (coverImage) {

        formData.append(
          "coverImage",
          coverImage
        );

      }

      updateBlogMutation({

        id: blogId,

        formData,

      });

    };

  // LOADING

  if (isLoading) {

    return (

      <div
        className="
        p-10
      "
      >

        Loading...

      </div>

    );

  }

  // ERROR

  if (error) {

    return (

      <div
        className="
        p-10
        text-red-500
      "
      >

        Failed to load blog

      </div>

    );

  }

  return (

    <div
      className="
      max-w-4xl
      mx-auto
      px-4
      py-10
    "
    >

      {/* TITLE */}

      <h1
        className="
        text-4xl
        font-black
        mb-10
      "
      >

        Edit Blog

      </h1>

      {/* FORM */}

      <form

        onSubmit={
          handleSubmit
        }

        className="
        space-y-6
      "
      >

        {/* TITLE */}

        <div>

          <label
            className="
            block
            mb-2
            font-medium
          "
          >

            Blog Title

          </label>

          <input

            type="text"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            placeholder="
            Enter blog title
            "

            className="
            w-full
            border
            rounded-2xl
            p-4
            outline-none
            focus:ring-2
            focus:ring-black
          "
          />

        </div>

        {/* CATEGORY */}

        <div>

          <label
            className="
            block
            mb-2
            font-medium
          "
          >

            Category

          </label>

          <input

            type="text"

            value={category}

            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }

            placeholder="
            Enter category
            "

            className="
            w-full
            border
            rounded-2xl
            p-4
            outline-none
            focus:ring-2
            focus:ring-black
          "
          />

        </div>

        {/* TAGS */}

        <div>

          <label
            className="
            block
            mb-2
            font-medium
          "
          >

            Tags

          </label>

          <input

            type="text"

            value={tags}

            onChange={(e) =>
              setTags(
                e.target.value
              )
            }

            placeholder="
            react,nextjs,nodejs
            "

            className="
            w-full
            border
            rounded-2xl
            p-4
            outline-none
            focus:ring-2
            focus:ring-black
          "
          />

        </div>

        {/* IMAGE */}

        <div>

          <label
            className="
            block
            mb-3
            font-medium
          "
          >

            Cover Image

          </label>

          {/* CURRENT IMAGE */}

          {blog?.coverImage && (

            <img

              src={
                blog.coverImage
              }

              alt="cover"

              className="
              w-full
              h-64
              object-cover
              rounded-2xl
              mb-4
              border
            "
            />

          )}

          {/* FILE INPUT */}

          <label
            className="
            flex
            items-center
            justify-center
            w-full
            border-2
            border-dashed
            rounded-2xl
            p-8
            cursor-pointer
            hover:bg-gray-50
            transition
          "
          >

            <input

              type="file"

              hidden

              onChange={(e) =>
                setCoverImage(
                  e.target.files[0]
                )
              }

            />

            <span
              className="
              text-gray-500
            "
            >

              {coverImage

                ? coverImage.name

                : "Click to upload new image"}

            </span>

          </label>

        </div>

        {/* CONTENT */}

        <div>

          <label
            className="
            block
            mb-2
            font-medium
          "
          >

            Content

          </label>

          <RichTextEditor

            value={content}

            setValue={setContent}

          />

        </div>

        {/* BUTTON */}

        <button

          disabled={
            isUpdating
          }

          className="
          px-8
          py-4
          rounded-2xl
          bg-black
          text-white
          font-medium
          disabled:opacity-50
        "
        >

          {isUpdating

            ? "Updating..."

            : "Update Blog"}

        </button>

      </form>

    </div>

  );

}