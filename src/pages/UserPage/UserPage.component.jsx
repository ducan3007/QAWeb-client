import React, { useEffect, Fragment } from "react";
import moment from "moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getUser } from "../../redux/users/users.actions";
import { Link } from "react-router-dom";
import { getUserPost } from "../../redux/posts/posts.actions";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import Spinner from "../../components/Spinner/Spinner.component";
import PostItem from "../../components/PostItem/PostItem.component";

import "./UserPage.styles.scss";

const UserPage = ({
  getUser,
  getUserPost,
  post: { posts },
  user: { user, loading },
  match,
}) => {
  useEffect(() => {
    getUser(match.params.id);
    getUserPost(match.params.id);

    // eslint-disable-next-line
  }, [getUser, getUserPost]);

  return loading || user === null ? (
    <Spinner type="page" width="55px" height="55px" />
  ) : (
    <Fragment>
      <PageTitle title={`User ${user?.username}`} />
      <div id="mainbar" className="user-main-bar pl24 pt24">
        <div className="user-card">
          <div className="grid">
            <div className="img-card">
              <div className="avatar-card">
                <div className="avatar">
                  <Link className="avatar-link" to={`/users/${user?.id}`}>
                    <div className="logo-wrapper">
                      <img
                        src={`https://secure.gravatar.com/avatar/${user?.id}?s=164&d=identicon`}
                        alt="user-logo"
                      />
                    </div>
                  </Link>
                </div>
                <div className="title">
                  <div className="grid fc-black-800">
                    {user?.views}
                    &nbsp;
                    <span className="fc-black-800">PROFILE VIEWS</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-card">
              <div className="content-grid">
                <div className="info-cell">
                  <div className="info">
                    <div className="details fc-black-800">
                      <h2>{user?.username}</h2>
                    </div>
                    <div className="date" style={{fontSize:"1.5em"}}>
                      <p>
                        Member for&nbsp;
                        {moment(user?.created_at).toNow(true)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="stats-cell">
                  <div className="count-sec">
                    <div className="counts">
                    <div className="cells">
                        <div className="column-grid">
                          <div className="head fc-black-700">
                            {user?.votes}
                          </div>
                          <div className="foot fc-black-500">Votes</div>
                        </div>
                      </div>
                      <div className="cells">
                        <div className="column-grid">
                          <div className="head fc-black-700">
                            {user?.answer_count}
                          </div>
                          <div className="foot fc-black-500">Answers</div>
                        </div>
                      </div>
                      <div className="cells">
                        <div className="column-grid">
                          <div className="head fc-black-700">
                            {user?.post_count}
                          </div>
                          <div className="foot fc-black-500">Questions</div>
                        </div>
                      </div>
                      <div className="cells">
                        <div className="column-grid">
                          <div className="head fc-black-700">
                            {user?.comment_count}
                          </div>
                          <div className="foot fc-black-500">Comments</div>
                        </div>
                      </div>
                      <div className="cells">
                        <div className="column-grid">
                          <div className="head fc-black-700">
                            {user?.tag_count}
                          </div>
                          <div className="foot fc-black-500">Tags</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fc-black-800 fs-headline1">All Questions</div>
        <div className="questions">
          {posts?.map((post) => (
            <PostItem key={post?.id} post={post} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

UserPage.propTypes = {
  getUser: PropTypes.func.isRequired,
  getUserPost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  post: state.post,
});

const mapActionToProps = {
  getUser,
  getUserPost,
};

export default connect(mapStateToProps, mapActionToProps)(UserPage);
