import React from "react";
import { useRouteMatch } from "react-router-dom";

function Comments() {
  const match = useRouteMatch();
  return <div>Comments for post {match.params.postId}</div>;
}

export default Comments;
