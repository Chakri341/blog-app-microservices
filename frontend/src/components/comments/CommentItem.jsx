"use client";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { formatDistanceToNow } from "date-fns";

import authStore from "../../store/auth.store";

import { createComment } from "../../services/blog.service";

import CommentForm from "./CommentForm";

export default function CommentItem({
  comment,

  allComments,

  blogId,

  isReply = false,
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);

  const [showReplies, setShowReplies] = useState(false);

  const token = authStore((state) => state.token);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createComment,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", blogId],
      });

      setShowReplyBox(false);

      setShowReplies(true);
    },
  });

  // REPLY SUBMIT

  const handleReply = (data) => {
    mutation.mutate({
      blogId,

      content: data.content,

      parentComment: comment._id,
    });
  };

  // DIRECT REPLIES

  const replies = allComments.filter((reply) => {
    if (!reply.parentComment) {
      return false;
    }

    // OBJECT CASE

    if (typeof reply.parentComment === "object") {
      return reply.parentComment._id === comment._id;
    }

    // STRING CASE

    return reply.parentComment === comment._id;
  });

  return (
    <div>
      {/* COMMENT */}

      <div
        className="
        flex
        gap-3
      "
      >
        {/* AVATAR */}

        <div
          className={`
          rounded-full
          bg-black
          text-white
          flex
          items-center
          justify-center
          font-semibold
          shrink-0

          ${isReply ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm"}
        `}
        >
          U
        </div>

        {/* BODY */}

        <div
          className="
          flex-1
        "
        >
          {/* HEADER */}

          <div
            className="
            flex
            items-center
            gap-2
            flex-wrap
          "
          >
            <p
              className="
              font-semibold
              text-sm
            "
            >
              @user
            </p>

            <p
              className="
              text-xs
              text-gray-500
            "
            >
              {formatDistanceToNow(
                new Date(comment.createdAt),

                {
                  addSuffix: true,
                },
              )}
            </p>
          </div>

          {/* CONTENT */}

          <p
            className="
            mt-1
            text-[15px]
            text-gray-800
            leading-7
          "
          >
            {comment.content}
          </p>

          {/* ACTIONS */}

          <div
            className="
            flex
            items-center
            gap-6
            mt-2
          "
          >
            {/* REPLY */}

            {token && (
              <button
                onClick={() => setShowReplyBox(!showReplyBox)}
                className="
                text-sm
                font-medium
                text-gray-600
                hover:text-black
              "
              >
                Reply
              </button>
            )}
          </div>

          {/* REPLY FORM */}

          {showReplyBox && (
            <div
              className="
              mt-4
            "
            >
              <CommentForm
                onSubmit={handleReply}
                isPending={mutation.isPending}
                placeholder="Reply..."
                buttonText="Reply"
              />
            </div>
          )}

          {/* VIEW REPLIES */}

          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="
              mt-4
              text-sm
              font-semibold
              text-blue-600
              hover:text-blue-800
            "
            >
              {showReplies
                ? "Hide replies"
                : `${replies.length} ${
                    replies.length > 1 ? "replies" : "reply"
                  }`}
            </button>
          )}
        </div>
      </div>

      {/* REPLIES SECTION */}

      {showReplies && replies.length > 0 && (
        <div
          className="
            ml-12
            mt-5
            space-y-5
            border-l
            border-gray-200
            pl-5
          "
        >
          {replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              allComments={allComments}
              blogId={blogId}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
