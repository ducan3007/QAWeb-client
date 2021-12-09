import React from "react";
import './TagBadge.styles.scss'

const TagBadge = ({ tag_name, size, display, float, link, href }) => {
  return (
    <div className="tags-badge" style={{ display, float }}>
      {href === true ? (
        <a className="m-tag" href={link ? link : `/tags/${encodeURIComponent(tag_name)}`}>
          {decodeURIComponent(tag_name)}
        </a>
      ) : (
        <a className="m-tag" href={link ? link : `/tags/${encodeURIComponent(tag_name)}`}>
          {decodeURIComponent(tag_name)}
        </a>
      )}
    </div>
  );
};

export default TagBadge;
