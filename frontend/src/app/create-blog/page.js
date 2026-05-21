"use client";

import {
  useState,
} from "react";

import {
  useForm,
} from
"react-hook-form";

import {
  useMutation,
} from
"@tanstack/react-query";

import {
  useRouter,
} from
"next/navigation";

import toast
from "react-hot-toast";

import useProtectedRoute
from "../../hooks/useProtectedRoute";

import RichTextEditor
from "@/components/editor/RichTextEditor";

import {
  createBlog,
} from
"../../services/blog.service";

export default function
CreateBlogPage() {

  useProtectedRoute();

  const router =
    useRouter();

  const [

    content,

    setContent,

  ] = useState("");

  const {

    register,

    handleSubmit,

  } = useForm();

  const mutation =
    useMutation({

      mutationFn:
        createBlog,

      onSuccess: () => {

        toast.success(
          "Blog Created"
        );

        router.push("/");

      },

      onError: (error) => {

        toast.error(

          error.response
            ?.data?.message

        );

      },

    });

  const onSubmit =
    (data) => {

      const formData =
        new FormData();

      formData.append(
        "title",
        data.title
      );

      formData.append(
        "content",
        content
      );

      formData.append(
        "category",
        data.category
      );

      formData.append(
        "status",
        data.status
      );

      formData.append(
        "tags",
        data.tags
      );

      if (
        data.coverImage?.[0]
      ) {

        formData.append(
          "coverImage",
          data.coverImage[0]
        );

      }

      mutation.mutate(
        formData
      );

    };

  return (

    <div
      className="
      max-w-3xl
      mx-auto
      px-4
      py-10
    "
    >

      <form

        onSubmit={handleSubmit(
          onSubmit
        )}

        className="
        space-y-6
      "
      >

        {/* TITLE */}

        <h1
          className="
          text-4xl
          font-black
          mb-8
        "
        >

          Create Blog

        </h1>

        <input

          {...register("title")}

          placeholder="
          Blog title
          "

          className="
          w-full
          border
          rounded-2xl
          p-4
          outline-none
        "
        />

        {/* CATEGORY */}

        <input

          {...register(
            "category"
          )}

          placeholder="
          Category
          "

          className="
          w-full
          border
          rounded-2xl
          p-4
          outline-none
        "
        />

        {/* TAGS */}

        <input

          {...register("tags")}

          placeholder="
          react,nextjs,nodejs
          "

          className="
          w-full
          border
          rounded-2xl
          p-4
          outline-none
        "
        />

        {/* STATUS */}

        <select

          {...register(
            "status"
          )}

          className="
          w-full
          border
          rounded-2xl
          p-4
          outline-none
        "
        >

          <option value="draft">

            Draft

          </option>

          <option
            value="published"
          >

            Published

          </option>

        </select>

        {/* IMAGE */}

        <label
          className="
          flex
          items-center
          justify-center
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

            {...register(
              "coverImage"
            )}

          />

          <span
            className="
            text-gray-500
          "
          >

            Upload Cover Image

          </span>

        </label>

        {/* CONTENT */}

        <RichTextEditor

          value={content}

          setValue={setContent}

        />

        {/* BUTTON */}

        <button

          disabled={
            mutation.isPending
          }

          className="
          bg-black
          text-white
          px-8
          py-4
          rounded-2xl
          font-medium
          disabled:opacity-50
        "
        >

          {mutation.isPending

            ? "Creating..."

            : "Create Blog"}

        </button>

      </form>

    </div>

  );

}