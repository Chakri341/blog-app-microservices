"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import authStore from "../../store/auth.store";

import { getComments, createComment } from "../../services/blog.service";

import CommentItem from "./CommentItem";

import CommentForm from "./CommentForm";

export default function CommentSection({ blogId }) {
  const token = authStore((state) => state.token);

  const queryClient = useQueryClient();

  const {
    data,

    isLoading,
  } = useQuery({
    queryKey: ["comments", blogId],

    queryFn: () => getComments(blogId),
  });

  const mutation = useMutation({
    mutationFn: createComment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", blogId],
      });
    },
  });

  // CREATE COMMENT

  const handleComment = (data) => {
    mutation.mutate({
      blogId,

      content: data.content,
    });
  };

  // TOP LEVEL COMMENTS

  const topLevelComments =
    data?.comments?.filter((comment) => !comment.parentComment) || [];

  return (
    <div
      className="
      mt-20
      border-t
      pt-12
    "
    >
      {/* HEADER */}

      <div
        className="
        flex
        items-center
        justify-between
        mb-10
      "
      >
        <h2
          className="
          text-3xl
          font-bold
        "
        >
          Comments{" "}
          <span
            className="
            text-gray-500
            text-2xl
          "
          >
            {data?.comments?.length || 0}
          </span>
        </h2>
      </div>

      {/* ADD COMMENT */}

      {token && (
        <div
          className="
          mb-12
        "
        >
          <CommentForm
            onSubmit={handleComment}
            isPending={mutation.isPending}
            placeholder="Add a comment..."
            buttonText="Comment"
          />
        </div>
      )}

      {/* COMMENTS */}

      {isLoading ? (
        <p>Loading comments...</p>
      ) : (
        <div
          className="
          space-y-10
        "
        >
          {topLevelComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              allComments={data.comments}
              blogId={blogId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
