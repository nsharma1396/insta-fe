import React from "react";

function TaggedPosts({ profile }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      {profile.name} was not tagged in any post.
    </div>
  );
}

export default TaggedPosts;
