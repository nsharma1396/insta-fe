import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useRouteMatch, Link } from "react-router-dom";
import differenceInWeeks from "date-fns/differenceInWeeks";
import differenceInDays from "date-fns/differenceInDays";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
import Layout from "../../common/Layout";
import "./Comments.sass";

function formatTimeStamp(timestamp) {
  const createdTime = new Date(timestamp);
  let weeks = differenceInWeeks(new Date(), createdTime);
  if (weeks === 0) {
    let days = differenceInDays(new Date(), createdTime);
    if (days === 0) {
      let hours = differenceInHours(new Date(), createdTime);
      if (hours === 0) {
        let minutes = differenceInMinutes(new Date(), createdTime);
        if (minutes === 0) {
          let seconds = differenceInSeconds(new Date(), createdTime);
          return `${seconds}s`;
        }
        return `${minutes}m`;
      }
      return `${hours}h`;
    }
    return `${days}d`;
  }
  return `${weeks}w`;
}

function CommentItem({ commentData }) {
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
      <div className="like-comment">L</div>
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
    async function getcommentsData(userId, postId) {
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
    getcommentsData(userId, postId);
    // fetch the data here
  }, [match.params]);
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
                  <CommentItem key={commentData.id} commentData={commentData} />
                ))}
            </div>
          </div>
        </Layout.Body>
      </Layout>
    );
  } else {
    return <h1>There was an error in loading the comments...</h1>;
  }
}

export default Comments;
