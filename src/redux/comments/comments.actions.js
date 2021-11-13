import {
    GET_COMMENTS,
    COMMENT_ERROR,
    ADD_COMMENT,
    ADD_ANSWER_COMMENT,
    DELETE_COMMENT,
} from './comments.types';

import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { getAnswers } from '../answers/answers.actions';
import { getPost } from '../posts/posts.actions';
export const getComments = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/posts/comments/${id}`);

        dispatch({
            type: GET_COMMENTS,
            payload: res.data.data,
        });
    } catch (err) {
        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Add COMMENT
export const addComment = (postId, formData) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post(
            `/api/posts/comments/${postId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_COMMENT,
            payload: res.data.data,
        });

        dispatch(setAlert(res?.data?.message, 'success'));
        dispatch(getPost(postId));
        dispatch(getComments(postId));
    } catch (err) {
        //  dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Delete Comment
export const deleteComment = (PostId, CommentId) => async(dispatch) => {
    try {
        const res = await axios.delete(`/api/posts/comments/${PostId}/${CommentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: CommentId,
        });

        dispatch(setAlert(res.data.message, 'success'));
        dispatch(getPost(PostId));
    } catch (err) {
        dispatch(setAlert((err?.response?.data?.message || ''), 'danger'));

        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

export const addAnswerComment = (PostId, answerId, formData) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post(`/api/answers/comments/${answerId}`,
            formData,
            config
        );

        dispatch({
            type: ADD_ANSWER_COMMENT,
            payload: res.data.data,
        });

        dispatch(setAlert(res.data.message, 'success'));
        dispatch(getAnswers(PostId));

    } catch (err) {
        dispatch(setAlert((err?.response?.data?.message || ''), 'danger'));

        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// export const getAnswerComments = (id) => async(dispatch) => {
//     try {
//         const res = await axios.get(`/api/answers/comments/${id}`);

//         dispatch({
//             type: GET_COMMENTS,
//             payload: res.data.data,
//         });
//     } catch (err) {
//         dispatch({
//             type: COMMENT_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status },
//         });
//     }
// };

export const deleteAnswerComment = (PostId, AnswerId, CommentId) => async(dispatch) => {
    try {

        const res = await axios.delete(`/api/answers/comments/${AnswerId}/${CommentId}`);

        dispatch({
            type: DELETE_COMMENT,
            payload: CommentId,
        });

        dispatch(setAlert(res.data.message, 'success'));
        dispatch(getAnswers(PostId));
    } catch (err) {
        dispatch(setAlert((err?.response?.data?.message || ''), 'danger'));

        dispatch({
            type: COMMENT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};