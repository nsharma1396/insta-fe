import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useRouteMatch, Link } from "react-router-dom";
import Layout from "../../common/Layout";
import { formatTimeStamp } from "./formatTimeStamp";
import "./Comments.sass";

function AddComment({ addComment }) {
  const inputRef = useRef();
  const [comment, updateComment] = useState("");
  const [submitStatus, updateSubmitStatus] = useState("");

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleChange(ev) {
    updateComment(ev.target.value);
    updateSubmitStatus("");
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (submitStatus !== "loading") {
      updateSubmitStatus("loading");
      const isSuccess = await addComment(comment);
      if (isSuccess) {
        updateComment("");
        updateSubmitStatus("success");
      } else {
        updateSubmitStatus("error");
      }
    }
  }

  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <div className="icon">Icon</div>
      <input
        ref={inputRef}
        onChange={handleChange}
        value={comment}
        placeholder={`Add a comment`}
      />
      <div className="add-comment-btn">
        <button type="submit" className={`submit-${submitStatus}`}>
          {submitStatus === "loading" ? "Posting" : "Post"}
        </button>
      </div>
    </form>
  );
}

function CommentItem({ commentData, toggleLike }) {
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
        L
      </div>
    </div>
  );
}

function Comments() {
  const match = useRouteMatch();
  const [commentsData, updateCommentsData] = useState({
    status: "loading",
    data: undefined,
    post: undefined,
  });
  useEffect(() => {
    async function getCommentsData(userId, postId) {
      try {
        const comments = await Axios.get(`/comments/${userId}/${postId}`);
        if (comments.data.success) {
          updateCommentsData({
            status: "success",
            data: comments.data.data.commentData,
            post: comments.data.data.postData,
          });
        } else {
          updateCommentsData({
            status: "error",
            data: undefined,
          });
        }
      } catch (exception) {
        updateCommentsData({
          status: "error",
          data: undefined,
        });
      }
    }
    const { userId, postId } = match.params;
    getCommentsData(userId, postId);
    // fetch the data here
  }, [match.params]);

  async function addComment(newComment) {
    try {
      const commentData = await Axios.post("/comments/addcomment", {
        ...match.params,
        commentObj: {
          comment: newComment,
          createdAt: new Date().getTime(),
        },
      });

      const updatedCommentsData = commentsData.data.concat(
        commentData.data.data
      );
      updateCommentsData({ ...commentsData, data: updatedCommentsData });
      return true;
    } catch (err) {
      return false;
    }
  }

  async function toggleLike(commentObj) {
    try {
      console.log(commentObj);
      const commentData = await Axios.post(`/comments/like/${commentObj._id}`, {
        ...match.params,
        hasLiked: commentObj.hasLiked,
      });
      const updatedCommentsData = commentsData.data.slice();
      const index = updatedCommentsData.findIndex(
        (commentObject) => commentObject._id === commentObj._id
      );
      console.log(commentData.data.data);
      updatedCommentsData[index] = commentData.data.data;
      updateCommentsData({ ...commentsData, data: updatedCommentsData });
    } catch (err) {
      console.error(err);
    }
  }

  if (commentsData.status === "loading") {
    return <div>Loading...</div>;
  } else if (commentsData.status === "success") {
    const comments = commentsData.data;
    const post = commentsData.post;
    return (
      <Layout>
        <Layout.Navbar>
          <div className="back-btn">
            <Link to={`/post/${match.params.userId}/${match.params.postId}`}>
              --
            </Link>
          </div>
          <h4>Comments</h4>
        </Layout.Navbar>
        <Layout.Body>
          <div className="post-comments">
            <div className="post-caption">
              <div className="profile-pic">
                <img src={`${post.profilePicture}/64`} alt="comment-user" />
              </div>
              <div className="post-content">
                <b>{post.username}</b> {post.caption}
              </div>
            </div>
            <div className="comments">
              {comments
                .sort((a, b) =>
                  a.createdAt > b.createdAt
                    ? 1
                    : a.createdAt < b.createdAt
                    ? -1
                    : 0
                )
                .map((commentData) => (
                  <CommentItem
                    key={commentData._id}
                    commentData={commentData}
                    toggleLike={() => toggleLike(commentData)}
                  />
                ))}
            </div>
          </div>
          <AddComment addComment={addComment} />
        </Layout.Body>
      </Layout>
    );
  } else {
    return <h1>There was an error in loading the comments...</h1>;
  }
}

export default Comments;
