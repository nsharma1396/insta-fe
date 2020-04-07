import React from "react";
import PostItem from "./PostItem";

function PostsGrid({ profile }) {
  return (
    <div className="posts-grid">
      {profile.posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsGrid;
