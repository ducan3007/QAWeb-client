import React, { Fragment } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./UserPanel.styles.scss";

const UserPanel = ({
  user: { id, username, created_at, posts_count, votes, views },
}) => {
  return (
    <Fragment>
      <div className="user-panel-info s-card bs-sm h:bs-md fc-black-500">
        <div className="user-gravatar">
          <Link to={`/users/${id}`}>
            <div className="logo-wrapper">
              <img
                alt="user-logo"
                src={`https://secure.gravatar.com/avatar/${id}?s=164&d=identicon`}
              />
            </div>
          </Link>
        </div>
        <div className="user-details">
          <Link className="fc-blue-800" to={`/users/${id}`}>
            {username}
          </Link>
          <span className="item">
            <span className="count">
              {posts_count}{" "}
              <span className="count-info">
                {posts_count === 1 ? "Question" : "Questions"}
              </span>
            </span>
          </span>
          <span className="item">
            <span className="count">
              {votes}{" "}
              <span className="count-info">
                {votes <= 1 ? "Vote" : "Votes"}
              </span>
            </span>
          </span>
          <span className="item user-time" style={{ paddingTop: "1px" }}>
            <span className="count">
              {views}{" "}
              <span className="count-info">
                {views === 1 ? "Views" : "Views"}
              </span>
            </span>
            <span className="count" style={{ fontWeight: "400" }}>
              {moment(created_at).fromNow(false)}
            </span>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

UserPanel.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(null)(UserPanel);
