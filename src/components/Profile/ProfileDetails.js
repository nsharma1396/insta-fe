import React from "react";

function ProfilePicture({ url }) {
  return (
    <div className="profile-picture">
      <img src={`${url}/240`} alt="user profile" />
    </div>
  );
}

function ProfileDetails({ profile }) {
  return (
    <div className="profile-details">
      <div className="overview">
        <ProfilePicture url={profile.profilePicture} />
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
            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              {profile.website}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetails;
