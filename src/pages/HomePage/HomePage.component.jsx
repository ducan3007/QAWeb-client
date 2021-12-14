import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTopPosts } from "../../redux/posts/posts.actions";

import LinkButton from "../../components/LinkButton/LinkButton.component";
import PostItem from "../../components/PostItem/PostItem.component";
import Spinner from "../../components/Spinner/Spinner.component";


import "./HomePage.styles.scss";

const HomePage = ({ getTopPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getTopPosts();
  }, [getTopPosts]);

  return loading || posts === undefined ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
      <div id="mainbar" className="homepage fc-black-800">
        <div className="questions-grid">
          <h3 className="questions-headline">Top Questions</h3>
          <div className="questions-btn">
            <LinkButton
              text={"Ask a question"}
              link={"/add/question"}
              type={"ask-btn"}
            />
          </div>
        </div>
        <div className="questions-tabs">
        </div>
        <div className="questions">
        {posts[0] === undefined ||  posts[0].id === undefined
          ? ""
          : (posts || []).map((post) => (
              <PostItem key={post?.id} post={post} />
            ))}
        </div>
      </div>
  );
};

HomePage.propTypes = {
  getTopPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getTopPosts })(HomePage);
