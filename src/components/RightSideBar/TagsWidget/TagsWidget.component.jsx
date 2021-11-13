import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { getTags } from "../../../redux/tags/tags.actions";
import TagBadge from "../../TagBadge/TagBadge.component";

import "./TagsWidget.styles.scss";

const TagsWidget = ({ getTags, tag: { tags, loading } }) => {
  useEffect(() => {
    getTags();
  }, [getTags]);

  return loading || (tags || ['']).length === 0 ? (
    ""
  ) : (
    <Fragment>
      <div className="side-bar-tags">
        <h4 className="tag-headline">List of tags</h4>
        {tags
          .sort((a, b) => {
            return b.posts_count - a.posts_count;
          })
          .slice(0, 15)
          .map((tag) => (
            <div key={tag.tagname} className="tag-content">
              <TagBadge
                tag_name={tag.tagname}
                size={"s-tag s-tag__md"}
                display={"inline"}
                href={true}
              />
              &nbsp;
              <span className="tag-mult">
                <span>&times;</span>
                &nbsp;
                <span>{tag.posts_count}</span>
              </span>
            </div>
          ))}
        <Link className="show-tags" to="/tags">
          show more tags
        </Link>
      </div>
    </Fragment>
  );
};

TagsWidget.propTypes = {
  getTags: PropTypes.func.isRequired,
  tag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tag: state.tag,
});

export default connect(mapStateToProps, { getTags })(TagsWidget);
