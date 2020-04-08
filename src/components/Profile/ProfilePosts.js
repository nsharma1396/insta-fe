import React, { useState } from "react";
import PostsGrid from "./PostsGrid";
import PostsList from "./PostsList";
import TaggedPosts from "./TaggedPosts";
import { IoMdGrid } from "react-icons/io";
import { FaListUl, FaUserTag } from "react-icons/fa";

const tabComponentMapper = {
  grid: {
    id: "grid",
    icon: IoMdGrid,
    component: PostsGrid,
  },
  list: {
    id: "list",
    icon: FaListUl,
    component: PostsList,
  },
  tagged: {
    id: "tagged",
    icon: FaUserTag,
    component: TaggedPosts,
  },
};

function TabsetHeader({ currentTab, changeTab }) {
  return (
    <div className="tabsets">
      {Object.values(tabComponentMapper).map((tab) => {
        const TabIcon = tab.icon;
        return (
          <div
            key={tab.id}
            className={`tabset ${
              currentTab === tab.id ? "tabset-selected" : ""
            }`}
            onClick={() => changeTab(tab.id)}
            title={tab.id}
            tabIndex="1"
          >
            <TabIcon size="1.5em" title={tab.id} />
          </div>
        );
      })}
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
