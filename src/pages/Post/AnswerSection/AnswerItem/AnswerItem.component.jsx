import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteAnswer } from "../../../../redux/answers/answers.actions";
import { Vote } from "../../../../redux/answers/answers.actions";
import ArrowUp from "../../../../assets/ArrowUp";
import ArrowDown from "../../../../assets/ArrowDown";
// import { ReactComponent as DownVote } from "../../../../assets/ArrowDownLg.svg";

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
  let upVoted = (votes || []).find(
    (v) => v.user_id === auth.user.id && v.vote > 0
  );
  let downVoted = (votes || []).find(
    (v) => v.user_id === auth.user.id && v.vote < 0
  );
  let score = (votes || []).reduce((a, b) => {
    return a + b.vote;
  }, 0);
  console.log("voted: ");
  console.log(`${body} ${upVoted}`);
  // "#df7015"

  // dsfs ? asdfs : sdfdasf ? sdfsdf :
  return (
    <Fragment>
      <div className="answer-layout">
        <div className="vote-cell">
          <div className="vote-container">
            {!auth.loading && auth.isAuthenticated && (upVoted===undefined) ? (
              <button
                className="vote-up"
                title="This answer is usefull"
                onClick={(e)=> Vote(postId,answerId,"upvote") }
              >
                <ArrowUp />
              </button>
            ) : 
            !auth.loading && auth.isAuthenticated && (upVoted) ?
            (
              <Link
                className="vote-up"
                title="This answer is usefull"
                onClick={(e)=> Vote(postId,answerId,"unvote")}
                to={`/questions/${postId}` }
              >
                <ArrowUp props={"#df7015"}/>
              </Link>
            )
            :
            (
              <button
                className="vote-up"
                title="This answer is usefull"
              >
                <ArrowUp/>
              </button>
            )}

            <div className="vote-count fc-black-500">{score}</div>

            {!auth.loading && auth.isAuthenticated && (downVoted===undefined) ? (
              <button
                className="vote-down"
                title="This answer is not usefull"
                onClick={(e)=> Vote(postId,answerId,"downvote") }
              >
                <ArrowDown />
              </button>
            ) : 
            !auth.loading && auth.isAuthenticated && (downVoted) ?
            (
              <Link
                className="vote-down"
                title="This answer is not usefull"
                onClick={(e)=> Vote(postId,answerId,"unvote")}
                to={`/questions/${postId}` }
              >
                <ArrowDown props={"#df7015"}/>
              </Link>
            )
            :
            (
              <button
                className="vote-up"
              >
                <ArrowUp/>
              </button>
            )}
          </div>




          
        </div>

        <div className="answer-item">
          <div
            className="answer-content fc-black-800"
            dangerouslySetInnerHTML={{ __html: body }}
          ></div>
          <div className="answer-actions">
            <div className="action-btns">
              <div className="answer-menu">
                {!auth.loading &&
                  auth.isAuthenticated &&
                  user_id === auth.user.id && (
                    <Link
                      className="s-link s-link__danger"
                      style={{ paddingLeft: "4px" }}
                      title="Delete the answer"
                      onClick={(e) => deleteAnswer(postId, id)}
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
              dateType={"answered"}
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
  Vote:PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
};

export default connect(null, { deleteAnswer,Vote })(AnswerItem);
