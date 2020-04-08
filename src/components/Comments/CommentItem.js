import React from "react";
import { formatTimeStamp } from "./formatTimeStamp";
import { FaHeart, FaRegHeart } from "react-icons/fa";
export function CommentItem({ commentData, toggleLike }) {
  return (
    <div className="comment-item">
      <div className="profile-pic">
        <img
          src={`https://picsum.photos/seed/${commentData.username}/64`}
          alt="comment-user"
        />
      </div>
      <div className="comment-content">
        <div className="main-content">
          <b>{commentData.username}</b> {commentData.comment}
        </div>
        <div className="meta-content">
          <span className="created">
            {formatTimeStamp(commentData.createdAt)}
          </span>
          {!!commentData.likesCount && (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a href="#" className="created">
              {commentData.likesCount || "1"}{" "}
              {commentData.likesCount === 1 ? "Like" : "Likes"}{" "}
            </a>
          )}
          {
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a href="#" className="reply">
              Reply
            </a>
          }
        </div>
      </div>
      <div
        onClick={toggleLike}
        className={`like-comment ${commentData.hasLiked ? "liked" : ""}`}
      >
        {!commentData.hasLiked ? (
          <FaRegHeart size="1em" title="Like" />
        ) : (
          <FaHeart size="1em" color="red" title="Unlike" />
        )}
      </div>
    </div>
  );
}
