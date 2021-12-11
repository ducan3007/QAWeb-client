import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ArrowUp from "../../../../assets/ArrowUp";
import ArrowDown from "../../../../assets/ArrowDown";
import "./VoteCell.styles.scss";
import { Vote } from "../../../../redux/posts/posts.actions";

const VoteCell = ({
  Vote,
  auth,
  post: {
    post: { votes },
  },
  postId,
}) => {
  let upVoted = (votes || []).find((v) => {
    if (!auth.loading && auth.isAuthenticated) {
      return v.user_id === auth.user.id && v.vote > 0;
    }
    return undefined;
  });
  let downVoted = (votes || []).find((v) => {
    if (!auth.loading && auth.isAuthenticated) {
      return v.user_id === auth.user.id && v.vote < 0;
    }
    return undefined;
  });
  let score = (votes || []).reduce((a, b) => {
    return a + b.vote;
  }, 0);

  return (
    <Fragment>
      <div className="vote-cell">
        <div className="vote-container">
          {!auth.loading && auth.isAuthenticated && upVoted === undefined ? (
            <button
              className="vote-up"
              title="This question is usefull"
              onClick={(e) => Vote(postId, "upvote")}
            >
              <ArrowUp />
            </button>
          ) : !auth.loading && auth.isAuthenticated && upVoted ? (
            <Link
              className="vote-up"
              title="This question is usefull"
              onClick={(e) => Vote(postId, "unvote")}
              to={`/questions/${postId}`}
            >
              <ArrowUp props={"#f59964"} />
            </Link>
          ) : (
            <Link
              className="vote-up"
              title="This question is usefull"
              to={`/login`}
            >
              <ArrowUp />
            </Link>
          )}

          <div className="vote-count fc-black-500">{`${score}`}</div>

          {!auth.loading && auth.isAuthenticated && downVoted === undefined ? (
            <button
              className="vote-down"
              title="This answer is not usefull"
              onClick={(e) => Vote(postId, "downvote")}
            >
              <ArrowDown />
            </button>
          ) : !auth.loading && auth.isAuthenticated && downVoted ? (
            <Link
              className="vote-down"
              title="This answer is not usefull"
              onClick={(e) => Vote(postId, "unvote")}
              to={`/questions/${postId}`}
            >
              <ArrowDown props={"#f59964"} />
            </Link>
          ) : (
            <Link
              className="vote-down"
              title="This question is usefull"
              to={`/login`}
            >
              <ArrowDown />
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

VoteCell.propTypes = {
  Vote: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});
export default connect(mapStateToProps, { Vote })(VoteCell);
