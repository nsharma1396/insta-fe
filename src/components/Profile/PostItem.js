import React, { useState } from "react";
import { Link } from "react-router-dom";

function PostItem({ post, userId }) {
  const [isHovered, toggleHover] = useState(false);

  return (
    <Link
      to={`/post/${userId}/${post.id}`}
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
    </Link>
  );
}

export default PostItem;
