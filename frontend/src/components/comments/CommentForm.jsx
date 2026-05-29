"use client";

import { useForm } from "react-hook-form";

export default function CommentForm({
  onSubmit,

  isPending,

  placeholder = "Add to discussion...",

  buttonText = "Comment",
}) {
  const {
    register,

    handleSubmit,

    reset,
  } = useForm();

  const submitHandler = (data) => {
    onSubmit(data);

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="
      mt-4
    "
    >
      <textarea
        {...register("content")}
        placeholder={placeholder}
        rows={3}
        className="
        w-full
        border-b
        border-gray-300
        outline-none
        resize-none
        pb-3
        text-[15px]
      "
      />

      <div
        className="
        flex
        justify-end
        mt-4
      "
      >
        <button
          disabled={isPending}
          className="
          bg-black
          text-white
          px-5
          py-2
          rounded-full
          text-sm
        "
        >
          {isPending ? "Posting..." : buttonText}
        </button>
      </div>
    </form>
  );
}
