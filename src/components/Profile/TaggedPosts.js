import React from "react";

function TaggedPosts({ profile }) {
  return <div>{profile.name} was not tagged in any post.</div>;
}

export default TaggedPosts;
