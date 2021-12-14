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

// import React from "react";
// import htmlSubstring from "../../services/htmlSubstring";
// import './TagBadge.styles.scss'

// const TagBadge = ({ tag_name, size, display, float, link, href }) => {
//   return (
//     <div className="tags-badge" style={{ display, float }}>
//       {href === true ? (
//        <p className="tags-text"><a className="m-tag " href={link ? link : `/tags/${encodeURIComponent(tag_name)}`}>
//           {htmlSubstring(decodeURIComponent(tag_name),10)}
//         </a></p> 
//       ) : (
//         <p className="tags-text"><a className="m-tag" href={link ? link : `/tags/${encodeURIComponent(tag_name)}`}>
//         {htmlSubstring(decodeURIComponent(tag_name),10)}
//         </a></p> 
//       )}
//     </div>
//   );
// };

// export default TagBadge;
