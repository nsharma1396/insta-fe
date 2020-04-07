import React, { useState } from "react";
import PostsGrid from "./PostsGrid";

const tabComponentMapper = {
  grid: {
    id: "grid",
    icon: "fa fa-grid",
    component: PostsGrid,
  },
  list: {
    id: "list",
    icon: "fa fa-list",
    component: PostsGrid,
  },
  tagged: {
    id: "tagged",
    icon: "fa fa-tagged",
    component: PostsGrid,
  },
};

function TabsetHeader({ currentTab, changeTab }) {
  return (
    <div className="tabsets">
      {Object.values(tabComponentMapper).map((tab) => (
        <div
          key={tab.id}
          className={`tabset ${currentTab === tab.id ? "tabset-selected" : ""}`}
          title={tab.id}
        >
          <i className={tab.icon} />
        </div>
      ))}
    </div>
  );
}

function TabsetBody({ currentTab, profile }) {
  const Component = tabComponentMapper[currentTab].component;
  return <Component profile={profile} />;
}

function ProfilePosts({ profile }) {
  const [currentTab, changeTab] = useState("grid");
  return (
    <div className="posts">
      <TabsetHeader currentTab={currentTab} changeTab={changeTab} />
      <TabsetBody currentTab={currentTab} profile={profile} />
    </div>
  );
}

export default ProfilePosts;
