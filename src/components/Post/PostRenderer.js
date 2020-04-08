import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "../../common/Layout";
import { useRouteMatch, Link } from "react-router-dom";
import {
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaHeart,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoIosOptions } from "react-icons/io";

export function PostRenderer({ postId }) {
  const match = useRouteMatch();
  const [postData, updatePostData] = useState({
    status: "loading",
    data: undefined,
  });
  useEffect(() => {
    async function getPostData(userId) {
      try {
        const profile = await Axios.get(`/posts/${userId}/${postId}`);
        if (profile.status === 200) {
          updatePostData({ status: "success", data: profile.data.data });
        }
      } catch (exception) {
        updatePostData({
          status: "error",
          data: undefined,
        });
      }
    }
    const userId = match.params.userId;
    getPostData(userId);
    // fetch the data here
  }, [match.params.userId, postId]);

  async function toggleLike() {
    try {
      const postResponse = await Axios.post(
        `/posts/like/${match.params.userId}/${postId}`,
        {
          hasLiked: postData.data.hasLiked,
        }
      );
      if (postResponse.data.success) {
        updatePostData({ ...postData, data: postResponse.data.data });
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (postData.status === "loading") {
    return <div>Loading...</div>;
  } else if (postData.status === "success") {
    const post = postData.data;
    return (
      <Layout>
        <Layout.Navbar>
          <div className="post-meta">
            <Link to="/">
              <img src={`${post.profilePicture}/64`} alt="User profile" />
            </Link>
            <div className="user-details">
              <h5>{post.username}</h5>
              <span>{post.location}</span>
            </div>
          </div>
          <div className="options">
            <IoIosOptions />
          </div>
        </Layout.Navbar>
        <Layout.Body>
          <div className="post-content">
            <div className="post-img">
              <img src={`${post.url}/480`} alt="Post" />
            </div>
            <div className="post-data">
              <div className="actions">
                <div className="like-actions">
                  {!postData.data.hasLiked ? (
                    <FaRegHeart
                      size="1.5em"
                      onClick={toggleLike}
                      title="Like"
                    />
                  ) : (
                    <FaHeart
                      size="1.5em"
                      onClick={toggleLike}
                      className="liked"
                      title="Unlike"
                    />
                  )}
                  <Link to={`${match.url}/comments`}>
                    <FaRegComment size="1.5em" title="Comment" />
                  </Link>
                  <FiSend size="1.5em" title="Send" />
                </div>
                <div className="save-action">
                  <FaRegBookmark size="1.5em" title="Save" />
                </div>
              </div>
              {!!post.likesCount && (
                <div className="info">
                  Liked by <b>John Doe</b> and <b>{post.likesCount - 1}</b>{" "}
                  others
                </div>
              )}
              <div className="caption">
                <Link to="/" style={{ color: "#000" }}>
                  <b>{post.username}</b>
                </Link>
                {post.caption}. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </div>
              {!!post.commentsCount && (
                <Link className="show-comments" to={`${match.url}/comments`}>
                  View all {post.commentsCount} comments
                </Link>
              )}
            </div>
          </div>
        </Layout.Body>
      </Layout>
    );
  } else {
    return <h1>There was an error in loading the post...</h1>;
  }
}
