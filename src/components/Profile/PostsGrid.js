import React from "react";

function PostsGrid({ profile }) {
  return (
    <div className="posts-grid">
      {profile.posts.map((post) => (
        <div key={post.id} className="post-item">
          <img src={post.url} alt="post" />
        </div>
      ))}
    </div>
  );
}

export default PostsGrid;
