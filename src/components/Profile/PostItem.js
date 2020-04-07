import React, { useState } from "react";

function PostItem({ post }) {
  const [isHovered, toggleHover] = useState(false);

  return (
    <div
      className="post-item"
      onMouseOver={() => toggleHover(true)}
      onMouseLeave={() => toggleHover(false)}
    >
      <img src={`${post.url}/640`} alt="post" />
      {isHovered && (
        <div className="post-item-overlay">
          <span className="likes">
            L<span className="count">{post.likesCount}</span>
          </span>
          <span className="comments">
            C<span className="count">{post.commentsCount}</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default PostItem;
