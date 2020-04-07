import React from "react";

function PostsList({ profile }) {
  return (
    <div className="posts-list">
      {profile.posts.map((post) => (
        <div key={post.id} className="post-item">
          <img src={post.url} alt="post" />
        </div>
      ))}
    </div>
  );
}

export default PostsList;
