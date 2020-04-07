import React from "react";
import PostItem from "./PostItem";

function PostsList({ profile }) {
  return (
    <div className="posts-list">
      {profile.posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostsList;
