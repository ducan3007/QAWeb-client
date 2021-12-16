import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { getTagPosts } from "../../redux/posts/posts.actions";
import { getTag } from "../../redux/tags/tags.actions";
import handleSorting from "../../services/handleSorting";

import LinkButton from "../../components/LinkButton/LinkButton.component";
import PostItem from "../../components/PostItem/PostItem.component";
import Spinner from "../../components/Spinner/Spinner.component";
import PageTitle from "../../components/PageTitle/PageTitle.component";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup.component";

import ReactPaginate from "react-paginate";
import "./TagPage.styles.scss";

const TagPage = ({
  getTag,
  getTagPosts,
  tag,
  post: { posts, loading },
  match,
}) => {
  const [pages, setPage] = useState(1);
  const [sortType, setSortType] = useState("Newest");

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  let total;
  for(let p of posts){
    if(p.totalPost !== undefined){
      total = p.totalPost;
      break;
    }
  }
  console.log(posts);
  useEffect(() => {
    getTagPosts(match.params.tagname, pages);
    getTag(match.params.tagname);
    // eslint-disable-next-line
  }, [getTag, getTagPosts, pages]);

  if (tag?.redirect) {
    return <Redirect to="/tags" />;
  }

  return tag?.tag === null || tag?.loading || loading ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
    <Fragment>
      <PageTitle title={`${tag?.tag?.tagname}`} />
      <div id="mainbar" className="questions-page fc-black-800">
        <div className="questions-grid">
          <h3
            className="questions-headline"
            style={{ wordBreak: "break-word" }}
          >
            <span style={{ color: "#0088cc", fontSize: "1.5em" }}>
              {decodeURIComponent(tag?.tag?.tagname)}
            </span>
          </h3>
          <div className="questions-btn">
            <LinkButton
              text={"Ask a question"}
              link={"/add/question"}
              type={"s-btn__primary"}
            />
          </div>
        </div>
        <p
          className="fs-body"
          dangerouslySetInnerHTML={{ __html: tag?.tag?.description }}
        />
        <div className="questions-tabs">
          <span>
            {new Intl.NumberFormat("en-IN").format(tag?.tag?.posts_count)}{" "}
            {tag?.tag?.posts_count <= 1 ? "Question" : "Questions"}
          </span>
          <ButtonGroup
            buttons={["Newest", "Vote", "View", "Oldest"]}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
        <div className="questions">
          {tag?.tag?.posts_count === 0 || posts[0].totalPost===0? (
           ''
          ) : (
            posts
              ?.sort(handleSorting(sortType))
              .map((post) => <PostItem key={post?.id} post={post} />)
          )}
          <div className="pag-container">
            {posts[0]?.totalPost === 0 ? (
              ""
            ) : (
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(total / 5)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={
                  "pagination pagination-lg justify-content-center"
                }
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

TagPage.propTypes = {
  getTag: PropTypes.func.isRequired,
  getTagPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  tag: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  tag: state.tag,
});

export default connect(mapStateToProps, { getTagPosts, getTag })(TagPage);
