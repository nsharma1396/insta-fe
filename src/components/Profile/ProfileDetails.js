import React from "react";

function ProfileDetails({ profile }) {
  return (
    <div className="profile-details">
      <div className="overview">
        <div className="profile-picture">
          <img src={profile.profilePicture} alt="user profile" />
        </div>
        <div className="follow-user">
          <div className="follow-data">
            <div className="count">
              <h3>{profile.postCount}</h3>
              <span>posts</span>
            </div>
            <div className="count">
              <h3>{profile.followerCount}</h3>
              <span>followers</span>
            </div>
            <div className="count">
              <h3>{profile.followingCount}</h3>
              <span>following</span>
            </div>
          </div>
          <button className="follow-btn">Follow</button>
        </div>
      </div>
      <div className="about">
        <div className="name">
          {profile.name}
          {profile.isVerified && (
            <span className="verified-user">
              <i className="fa fa-tick" />v
            </span>
          )}
        </div>
        {!!profile.type && <div className="profile-type">{profile.type}</div>}
        {!!profile.bio && <div className="bio">{profile.bio}</div>}
        {!!profile.website && (
          <div className="website">
            <a href={profile.website}>{profile.website}</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
