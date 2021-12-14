import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import Spinner from "../../components/Spinner/Spinner.component";

import "./PostForm.styles.scss";
import AskForm from "./AskForm/AskForm.component";

const PostForm = ({ auth: { isAuthenticated, loading } }) => {
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return loading === null ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
    <Fragment>
      <div className="post-form-container">
        <div className="post-form-content">
          <div className="post-form-section">
            <div className="postform" style={{ width: "100%" }}>
              <AskForm />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(PostForm);
