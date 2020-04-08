import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { useRouteMatch, Link } from "react-router-dom";
import Layout from "../../common/Layout";
import { AddComment } from "./AddComment";
import { CommentItem } from "./CommentItem";
import { FaChevronLeft, FaInstagram } from "react-icons/fa";
import "./Comments.sass";
import LoadError from "../../common/LoadError";

function Comments() {
  const match = useRouteMatch();
  const [commentsData, updateCommentsData] = useState({
    status: "loading",
    data: undefined,
    post: undefined,
  });
  const commentsContainer = useRef();
  const isScrollRequired = useRef(false);

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
      isScrollRequired.current = true;
      updateCommentsData({ ...commentsData, data: updatedCommentsData });
      return true;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    if (isScrollRequired.current) {
      isScrollRequired.current = false;
      try {
        // try to scroll to the new message element
        commentsContainer.current.children[commentsContainer.current.children.length - 1].scrollIntoView();
      } catch (err) {
        // ignore the error
      }
    }
  }, [commentsData.data]);

  async function toggleLike(commentObj) {
    try {
      const commentData = await Axios.post(`/comments/like/${commentObj._id}`, {
        ...match.params,
        hasLiked: commentObj.hasLiked,
      });
      const updatedCommentsData = commentsData.data.slice();
      const index = updatedCommentsData.findIndex(
        (commentObject) => commentObject._id === commentObj._id
      );
      updatedCommentsData[index] = commentData.data.data;
      updateCommentsData({ ...commentsData, data: updatedCommentsData });
    } catch (err) {
      console.error(err);
    }
  }

  if (commentsData.status === "loading") {
    return (
      <div className="loader">
        <FaInstagram size="2.5em" />
      </div>
    );
  } else if (commentsData.status === "success") {
    const comments = commentsData.data;
    const post = commentsData.post;
    return (
      <Layout>
        <Layout.Navbar>
          <div className="back-btn">
            <Link to={`/post/${match.params.userId}/${match.params.postId}`}>
              <FaChevronLeft />
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
                <Link to="/" style={{ color: "#000" }}>
                  <b>{post.username}</b>
                </Link>
                {post.caption}
              </div>
            </div>
            <div ref={commentsContainer} className="comments">
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
    return <LoadError />;
  }
}

export default Comments;
