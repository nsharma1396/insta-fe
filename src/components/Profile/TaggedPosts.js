import React from "react";
import noTags from "../../assets/no_tags.svg";

function TaggedPosts({ profile }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "50vh",
      }}
    >
      <img src={noTags} width="35%" height="35%" alt="no tags" />
      <p>{profile.name} was not tagged in any post.</p>
    </div>
  );
}

export default TaggedPosts;
