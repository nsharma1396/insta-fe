import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import Axios from "axios";
import Layout from "../../common/Layout";
import ProfileDetails from "./ProfileDetails";
import ProfilePosts from "./ProfilePosts";
import { FaInstagram } from "react-icons/fa";
import "./Profile.sass";
import LoadError from "../../common/LoadError";

function Post() {
  const match = useRouteMatch();
  const [profileData, updateProfileData] = useState({
    status: "loading",
    data: undefined,
  });

  useEffect(() => {
    async function getProfileData(userId) {
      try {
        const profile = await Axios.get(`/users/${userId}`);
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
    const userId = "5e8c9fdf9a3a4315cfafb5f3"; // match.params.userId;
    getProfileData(userId);
    // fetch the data here
  }, [match.params.userId]);

  if (profileData.status === "loading") {
    return (
      <div className="loader">
        <FaInstagram size="2.5em" />
      </div>
    );
  } else if (profileData.status === "success") {
    const profile = profileData.data;
    return (
      <Layout>
        <Layout.Navbar>
          <div className="back-icon">
            <FaInstagram size="2em" />
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
    return <LoadError />;
  }
}

export default Post;
