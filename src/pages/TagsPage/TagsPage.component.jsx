import React, { useEffect, Fragment, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import handleSorting from "../../services/handleSorting";

import TagPanel from "./TagPanel/TagPanel.component";
import Spinner from "../../components/Spinner/Spinner.component";
import SearchBox from "../../components/SearchBox/SearchBox.component";

import ReactPaginate from "react-paginate";

import "./TagsPage.styles.scss";

const TagsPage = ({ tag: { loading } }) => {
  const [fetchSearch, setSearch] = useState("");

  const [tagList, setTagList] = useState([]);

  const [totalTags, setTotalTags] = useState(0);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const getTagList = async (page) => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/tags?page=${page}`
      );
      const data = res.data.data;
      const total = data[0].totalTags;
      setTotalTags(total);
      setTagList(data);
    };
    getTagList(page);
  }, [page]);

  const handlePageClick = async (data) => {
    let page = data.selected + 1;
    setPage(page);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  return loading || tagList === null ? (
    <Spinner type="page" width="75px" height="200px" />
  ) : (
    <Fragment>
      <div id="mainbar" className="tags-page fc-black-800">
        <h1 className="headline">All Tags</h1>

        <div className="headline-count">
          <span>{new Intl.NumberFormat("en-IN").format(totalTags)} Tags</span>
        </div>
        <div className="tags-box pl16 pr16 pb16">
          <SearchBox
            placeholder={"filter by tag name"}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            width={"200px"}
          />
        </div>
        <div className="user-browser">
          <div className="grid-layout">
            {tagList
              ?.filter((tag) =>
                tag.tagname.toLowerCase().includes(fetchSearch.toLowerCase())
              )
              ?.sort(handleSorting("Popular"))
              .map((tag) => (
                <TagPanel key={tag?.tagname} tag={tag} />
              ))}
          </div>
          <div className="pag-container">
            {tagList[0]?.totalTags === 0 ? (
              ""
            ) : (
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={Math.ceil(totalTags / 20)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination pagination-lg justify-content-center"}
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

TagsPage.propTypes = {
  tag: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  tag: state.tag,
});

export default connect(mapStateToProps)(TagsPage);
