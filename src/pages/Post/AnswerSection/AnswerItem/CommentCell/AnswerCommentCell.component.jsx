import React, {Fragment, useState} from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  deleteAnswerComment,
  addAnswerComment,
} from '../../../../../redux/comments/comments.actions';
import Spinner from '../../../../../components/Spinner/Spinner.component';
import TagBadge from '../../../../../components/TagBadge/TagBadge.component';
import LinkButton from '../../../../../components/LinkButton/LinkButton.component';

import './CommentCell.styles.scss';

const AnswerCommentCell = ({
  deleteAnswerComment,
  addAnswerComment,
  auth,
  comment,
  answerId,
  postId,
}) => {
  const [formData, setFormData] = useState({
    body: '',
  });

  const {body} = formData;

  const handleChange = (e) =>
    setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();
    addAnswerComment(postId,answerId, {body});
    setFormData({
      body: '',
    });
  };
  
  const handleDeleteComment = (e,post_id,answer_id,comment_id)=>{
    const confirm = window.confirm("Are you sure delete this comment?");
    if(confirm){
      deleteAnswerComment(post_id,answer_id,comment_id);
    }else{
      e.preventDefault();
      return;
    }
  }

  return (
    <Fragment>
      <div className='answer-comments-cell'>
        <div className='answer-comments'>
          <ul className='answer-comments-list'>
            {(comment || '').loading === null ? (
              <Spinner width='25px' height='25px' />
            ) : (
              (comment || []).map((comment) => (
                
                <li className='answer-comments-item' key={comment?.id}>
                  <div className='comment-text fc-black-800'>
                    <div className='answer-comment-body'>
                      <span className='body'>{comment?.body}</span>
                      &nbsp;&ndash;&nbsp;
                      <TagBadge
                        tag_name={comment?.username}
                        size={'s-tag'}
                        link={`/users/${comment?.user_id}`}
                        display={'inline'}
                      />
                      <span
                        title={moment(comment?.created_at).format('lll')}
                        style={{color: '#959ca3 !important'}}
                        className='date fs-body1'
                      >
                        {moment(comment?.created_at).format('lll')} 
                      </span>
                    </div>
                    {!auth?.loading &&
                      auth?.isAuthenticated &&
                      (comment?.user_id) === auth?.user?.id && (
                        <Link
                          className='s-tag s-tag__moderator'
                          style={{marginTop: '4px'}}
                          title='Delete the comment'
                          onClick={(e) => handleDeleteComment(e,postId,answerId,comment?.id)}
                          to={`/questions/${postId}`}
                        >
                          delete
                        </Link>
                      )}
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className='add-comment'>
          {!auth?.loading && auth?.isAuthenticated ? (
            <Fragment>
              <form className='comment-form' onSubmit={(e) => handleSubmit(e)}>
                <div>
                  <input
                    className='title-input s-input'
                    type='text'
                    name='body'
                    value={body}
                    onChange={(e) => handleChange(e)}
                    id='title'
                    placeholder='Leave a comment'
                  />
                </div>
              </form>
            </Fragment>
          ) : (
            <Fragment>
              <LinkButton
                text={'You need to login to add a comment'}
                link={'/login'}
              />
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

AnswerCommentCell.propTypes = {
  auth: PropTypes.object.isRequired,
  addAnswerComment: PropTypes.func.isRequired,
  deleteAnswerComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  deleteAnswerComment,
  addAnswerComment,
})(AnswerCommentCell);
