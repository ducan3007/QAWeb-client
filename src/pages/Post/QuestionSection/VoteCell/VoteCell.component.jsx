import React, { Fragment } from "react";

import "./VoteCell.styles.scss";

const VoteCell = ({
  getVote,
  UpVote,
  DownVote,
  Unvote,
  PostId,
  auth,
  answerCount,
  commentCount,
  tagname,
}) => {
  return (
    <Fragment>
      <div className="vote-cell fc-black-1000">
        <div className="stats">
          <div className="vote">
            <span className="vote-count">{answerCount}</span>
            <div className="">Answers</div>
          </div>
          <div className="vote">
            <span className="vote-count">{commentCount}</span>
            <div className="count-text">Comments</div>
          </div>
          <div className="vote">
            <span className="vote-count">{(tagname || ['']).length}</span>
            <div className="count-text">Tags</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default VoteCell;
