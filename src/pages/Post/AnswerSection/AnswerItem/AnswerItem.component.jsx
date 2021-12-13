import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteAnswer } from "../../../../redux/answers/answers.actions";
import { Vote } from "../../../../redux/answers/answers.actions";
import ArrowUp from "../../../../assets/ArrowUp";
import ArrowDown from "../../../../assets/ArrowDown";

import UserCard from "../../../../components/UserCard/UserCard.component";
import AnswerCommentCell from "./CommentCell/AnswerCommentCell.component";
import "./AnswerItem.styles.scss";

const AnswerItem = ({
  Vote,
  deleteAnswer,
  answer: { body, user_id, id, created_at, username, comments, votes },
  auth,
  postId,
  answerId,
}) => {
  let upVoted = (votes || []).find((v) => {
    if (!auth.loading && auth.isAuthenticated) {
      return v?.user_id === auth?.user?.id && v?.vote > 0;
    }
    return undefined;
  });
  let downVoted = (votes || []).find((v) => {
    if (!auth.loading && auth.isAuthenticated) {
      return v?.user_id === auth?.user?.id && v?.vote < 0;
    }
    return undefined;
  });
  let score = (votes || []).reduce((a, b) => {
    return a + b?.vote;
  }, 0);
  
  const handleDeleteAnswer = (e,post_id,_id)=>{
    const confirm = window.confirm("Are you sure delete this answer?");
    if(confirm){
      deleteAnswer(post_id,_id);
    }else{
      e.preventDefault();
      return;
    }
  }

  return (
    <Fragment>
      <div className="answer-layout">
        <div className="vote-cell">
          <div className="vote-container">
            {!auth?.loading && auth?.isAuthenticated && upVoted === undefined ? (
              <button
                className="vote-up"
                title="This answer is usefull"
                onClick={(e) => Vote(postId, answerId, "upvote")}
              >
                <ArrowUp />
              </button>
            ) : !auth?.loading && auth?.isAuthenticated && upVoted ? (
              <Link
                className="vote-up"
                title="This answer is usefull"
                onClick={(e) => Vote(postId, answerId, "unvote")}
                to={`/questions/${postId}`}
              >
                <ArrowUp props={"#f59964"} />
              </Link>
            ) : (
              <Link
                className="vote-up"
                title="This answer is usefull"
                to={`/login`}
              >
                <ArrowUp />
              </Link>
            )}

            <div className="vote-count fc-black-500">{score}</div>

            {!auth?.loading &&
            auth?.isAuthenticated &&
            downVoted === undefined ? (
              <button
                className="vote-down"
                title="This answer is not usefull"
                onClick={(e) => Vote(postId, answerId, "downvote")}
              >
                <ArrowDown />
              </button>
            ) : !auth?.loading && auth?.isAuthenticated && downVoted ? (
              <Link
                className="vote-down"
                title="This answer is not usefull"
                onClick={(e) => Vote(postId, answerId, "unvote")}
                to={`/questions/${postId}`}
              >
                <ArrowDown props={"#f59964"} />
              </Link>
            ) : (
              <Link
                className="vote-down"
                title="This answer is usefull"
                to={`/login`}
              >
                <ArrowDown />
              </Link>
            )}
          </div>
        </div>

        <div className="answer-item">
          <div
            className="answer-content"
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
          <div className="answer-actions">
            <div className="action-btns">
              <div className="answer-menu">
                {!auth?.loading &&
                  auth?.isAuthenticated &&
                  user_id === auth?.user?.id && (
                    <Link
                      className="s-tag s-tag__moderator"
                      style={{ paddingLeft: "4px" }}
                      title="Delete the answer"
                      onClick={(e) => handleDeleteAnswer(e,postId,id)}
                      to={`/questions/${postId}`}
                    >
                      delete
                    </Link>
                  )}
              </div>
            </div>
            <UserCard
              created_at={created_at}
              user_id={user_id}
              username={username}
              dateType={""}
            />
          </div>
          <AnswerCommentCell
            answerId={answerId}
            comment={comments}
            postId={postId}
          />
        </div>
      </div>
    </Fragment>
  );
};

AnswerItem.propTypes = {
  deleteAnswer: PropTypes.func.isRequired,
  Vote: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
};

export default connect(null, { deleteAnswer, Vote })(AnswerItem);
