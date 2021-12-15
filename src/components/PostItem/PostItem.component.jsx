import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import htmlSubstring from "../../services/htmlSubstring";
import injectEllipsis from "../../services/injectEllipsis";

import UserCard from "../UserCard/UserCard.component";
import TagBadge from "../TagBadge/TagBadge.component";

import "./PostItem.styles.scss";

const PostItem = ({
  post: {
    id,
    title,
    body,
    tagname,
    votes,
    username,
    user_id,
    answer_count,
    views,
    created_at,
  },
}) => {
  const answerVoteUp = (
    <div className="vote answer">
      <span className="vote-count" style={{color:"white"}}>{answer_count}</span>
      <div className="count-text" style={{color:"white"}}>Answers</div>
    </div>
  );

  const answerVoteDown = (
    <div className="vote">
      <span className="vote-count">{answer_count}</span>
      <div className="count-text">Answer</div>
    </div>
  );
  const vote_count = (votes||['']).reduce((count,v)=>{
    return count + v.vote
  },0)
  return (
    <div className="posts">
      <div className="stats-container fc-black-500">
        <div className="stats">
          <div className="vote">
            <span className="vote-count">{vote_count}</span>
            <div className="count-text"><span style={{color:"#6eb183",fontSize:"1.3em"}}>{vote_count <= 1 ? 'Vote' : 'Votes'}</span> </div>
          </div>
          {answer_count > 0 ? answerVoteUp : answerVoteDown}
          <div className="vote">
            <div className="count-text" style={{color:'#f77d25',fontSize:"1.3em"}}>{views} {views <= 1 ? 'View' : 'Views'}</div>
          </div>
        </div>
      </div>
      <div className="summary">
        {body === undefined ? body = '': true}
        <h3>
          <Link to={`/questions/${id}`}>{htmlSubstring(title,150)}</Link>
        </h3>
        <div
          className="brief"
          dangerouslySetInnerHTML={{
            __html: injectEllipsis(htmlSubstring(body, 200)),
          }}
        ></div>

        <div className="tags-container" >
          {(tagname || []).map((tag) => (
            <div className="tags-field">
              <TagBadge tag_name={(tag)} size={"s-tag"} float={"left"} />
            </div>
          ))}
        </div>

        <UserCard
          created_at={created_at}
          user_id={user_id}
          username={username}
          float={"right"}
          backgroundColor={"transparent"}
        />
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};

export default connect(null)(PostItem);
