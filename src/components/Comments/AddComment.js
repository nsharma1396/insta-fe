import React, { useEffect, useState, useRef } from "react";
import { FiSend } from "react-icons/fi";
export function AddComment({ addComment }) {
  const inputRef = useRef();
  const [comment, updateComment] = useState("");
  const [submitStatus, updateSubmitStatus] = useState("");
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  function handleChange(ev) {
    updateComment(ev.target.value);
    updateSubmitStatus("");
  }
  async function handleSubmit(ev) {
    ev.preventDefault();
    if (submitStatus !== "loading") {
      updateSubmitStatus("loading");
      const isSuccess = await addComment(comment);
      if (isSuccess) {
        updateComment("");
        updateSubmitStatus("success");
      } else {
        updateSubmitStatus("error");
      }
    }
  }
  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <div className="icon">
        <FiSend size="1.5em" />
      </div>
      <input
        ref={inputRef}
        onChange={handleChange}
        value={comment}
        placeholder={`Add a comment`}
      />
      <div className="add-comment-btn">
        <button type="submit" className={`submit-${submitStatus}`}>
          {submitStatus === "loading" ? "Posting" : "Post"}
        </button>
      </div>
    </form>
  );
}
