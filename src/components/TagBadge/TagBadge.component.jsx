import React from "react";
import { Link } from "react-router-dom";
import './TagBadge.styles.scss'

const TagBadge = ({ tag_name, size, display, float, link, href }) => {
  return (
    <div className="tags-badge" style={{ display, float }}>
      {href === true ? (
        <a className="m-tag" href={link ? link : `/tags/${encodeURIComponent(tag_name)}`}>
          {decodeURIComponent(tag_name)}
        </a>
      ) : (
        <Link className="m-tag" to={link ? link : `/tags/${encodeURIComponent(tag_name)}`}>
          {decodeURIComponent(tag_name)}
        </Link>
      )}
    </div>
  );
};

export default TagBadge;
