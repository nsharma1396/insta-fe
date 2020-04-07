import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Axios from "axios";
import Layout from "../../common/Layout";
import ProfileDetails from "./ProfileDetails";
import ProfilePosts from "./ProfilePosts";
import "./Profile.sass";

function Post() {
  const match = useRouteMatch();
  const [profileData, updateProfileData] = useState({
    status: "loading",
    data: undefined,
  });

  useEffect(() => {
    async function getProfileData() {
      try {
        const profile = await Axios.get("/users/5e8c9fdf9a3a4315cfafb5f3");
        if (profile.status === 200) {
          updateProfileData({ status: "success", data: profile.data.data });
        }
      } catch (exception) {
        updateProfileData({
          status: "error",
          data: undefined,
        });
      }
    }
    const userId = match.params.userId;
    getProfileData(userId);
    // fetch the data here
  }, [match.params.userId]);

  if (profileData.status === "loading") {
    return <div>Loading...</div>;
  } else if (profileData.status === "success") {
    const profile = profileData.data;
    return (
      <Layout>
        <Layout.Navbar>
          <div className="back-icon">
            Icon
            <i className="fa fa-left-caret" />
          </div>
          <div className="username">
            <h5>{profile.username}</h5>
          </div>
          <div className="options">...</div>
        </Layout.Navbar>
        <Layout.Body>
          <div className="profile-content">
            <ProfileDetails profile={profile} />
            <div className="call-button">
              <a href="#call">Call</a>
            </div>
            <ProfilePosts profile={profile} />
          </div>
        </Layout.Body>
        <Layout.Footer></Layout.Footer>
      </Layout>
    );
  } else {
    return <div>Error in loading user...</div>;
  }
}

export default Post;
