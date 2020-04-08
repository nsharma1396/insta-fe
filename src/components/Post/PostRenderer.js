import React, { useEffect, useState } from "react";
import Axios from "axios";
import Layout from "../../common/Layout";
import { useRouteMatch, Link } from "react-router-dom";

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
  if (postData.status === "loading") {
    return <div>Loading...</div>;
  } else if (postData.status === "success") {
    const post = postData.data;
    return (
      <Layout>
        <Layout.Navbar>
          <div className="post-meta">
            <img src={`${post.profilePicture}/64`} alt="User profile" />
            <div className="user-details">
              <h5>{post.username}</h5>
              <span>{post.location}</span>
            </div>
          </div>
          <div className="options">|</div>
        </Layout.Navbar>
        <Layout.Body>
          <div className="post-content">
            <div className="post-img">
              <img src={`${post.url}/480`} alt="Post" />
            </div>
            <div className="post-data">
              <div className="actions">
                <div className="like-actions">
                  <span>L</span>
                  <span>C</span>
                  <span>S</span>
                </div>
                <div className="save-action">
                  <span>S</span>
                </div>
              </div>
              <div className="info">
                Liked by <b>John Doe</b> and <b>{post.likesCount - 1}</b> others
              </div>
              <div className="caption">
                <b>{post.username}</b>
                {post.caption}. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit.
              </div>
              <Link className="show-comments" to={`${match.url}/comments`}>
                View all {post.commentsCount} comments
              </Link>
            </div>
          </div>
        </Layout.Body>
      </Layout>
    );
  } else {
    return <h1>There was an error in loading the post...</h1>;
  }
}
