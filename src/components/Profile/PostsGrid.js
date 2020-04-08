import React from "react";
import PostItem from "./PostItem";

function PostsGrid({ profile }) {
  return (
    <div className="posts-grid">
      {profile.posts.map((post) => (
        <PostItem key={post.id} post={post} userId={profile.id} />
      ))}
    </div>
  );
}

export default PostsGrid;
