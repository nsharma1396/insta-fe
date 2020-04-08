import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
import Post from "./components/Post";
import "./App.css";
import "./services/auth";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {/* Load all the data
        </Route>
        <Route path="/profile/:userId"> */}
          <Profile />
        </Route>
        <Route path="/post/:userId/:postId">
          <Post />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
