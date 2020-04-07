import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Comments from "../Comments";

function PostRenderer({ postId }) {
  return <div>Post Id: {postId}</div>;
}

function Post() {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
      <Route path={`${match.path}`}>
        <PostRenderer postId={match.params.postId} />
      </Route>
    </Switch>
  );
}

export default Post;
