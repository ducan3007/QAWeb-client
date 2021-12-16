import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPosts } from "../../redux/posts/posts.actions";
import handleSorting from "../../services/handleSorting";

import LinkButton from "../../components/LinkButton/LinkButton.component";
import PostItem from "../../components/PostItem/PostItem.component";
import Spinner from "../../components/Spinner/Spinner.component";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup.component";

import PageTitle from "../../components/PageTitle/PageTitle.component";

import ReactPaginate from "react-paginate";

import "./QuestionsPage.styles.scss";

const QuestionsPage = ({ getPosts, post: { posts, loading } }) => {
  let searchQuery = new URLSearchParams(useLocation().search).get("search");

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
    getPosts(searchQuery, pages);
  }, [getPosts, searchQuery, pages]);
  
  return loading || posts === null ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
    <Fragment>
      {searchQuery ? (
        <PageTitle title={`Search Results for ${searchQuery}`} />
      ) : (
        ""
      )}

      <div className="questions-page fc-black-800 main-bar">
        <div className="questions-grid">
          <h3 className="questions-headline">
            {searchQuery ? "Search Results" : "All Questions"}
          </h3>
          <div className="questions-btn">
            <LinkButton
              text={"Ask a question"}
              link={"/add/question"}
              type={"ask-btn"}
            />
          </div>
        </div>
        {searchQuery ? (
          <div className="search-questions">
            <span className="fc-light" style={{ fontSize: 15 }}>
              Results for{" "}
              <span style={{ color: "#21AFF1", fontSize: "1.2em" }}>
                {searchQuery}
              </span>
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="questions-tabs">
          <span>{total} Results</span>
          <ButtonGroup
            buttons={["Newest", "Vote", "View", "Oldest"]}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>

        <div className="questions">
          {
            posts[0]?.totalPost === 0
            ? ""
            : posts
                ?.sort(handleSorting(sortType))
                .map((post) => <PostItem key={post?.id} post={post} />)}


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

QuestionsPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(QuestionsPage);
