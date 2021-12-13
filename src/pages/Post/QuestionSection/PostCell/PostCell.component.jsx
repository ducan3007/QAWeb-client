import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getPost, deletePost} from '../../../../redux/posts/posts.actions';

import TagBadge from '../../../../components/TagBadge/TagBadge.component';
import UserCard from '../../../../components/UserCard/UserCard.component';

import './PostCell.styles.scss';

const PostCell = ({
  deletePost,
  auth,
  post: {
    post: {id, body, tagname, user_id, username, created_at},
  },
  postId,
}) => {
  useEffect(() => {
    getPost(postId);
    // eslint-disable-next-line
  }, [getPost]);

  const handleDeletePost = (event,post_id)=>{
    const confirm = window.confirm("Are you sure delete this question?");
    if(confirm){
      deletePost(post_id);
    }else{
      event.preventDefault();
    }
  }

  return (
    <Fragment>
      <div className='post-cell'>
        <div className='post-text fc-black-300' dangerouslySetInnerHTML={{__html: body}}></div>
        <div className='post-tags fc-black-800'>

        <div className="tags-container" >
          {(tagname || []).map((tag) => (
            <div className="tags-field">
              <TagBadge tag_name={(tag)} size={"s-tag"} float={"left"} />
            </div>
          ))}
        </div>

        </div>
        <div className='post-actions fc-black-800'>
          <div className='post-actions-extended'>
            <div className='post-btns'>
              <div className='post-menu'>
                {!auth?.loading &&
                  auth?.isAuthenticated &&
                  (user_id) === auth?.user?.id && (
                    <Link
                      className='s-link s-link__danger'
                      style={{paddingLeft: '4px',paddingRight: '4px',backgroundColor:'#FDF2F2',border:"1px solid #F9D2D3"}}
                      title='Delete the post'
                      onClick={(e) => handleDeletePost(e,id)}
                      to='/questions'
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
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostCell.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, {getPost, deletePost})(PostCell);
