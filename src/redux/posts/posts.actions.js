import axios from 'axios';
import { setAlert } from '../alert/alert.actions';
import { getTags } from '../tags/tags.actions';
import {
    GET_POSTS,
    GET_POST,
    GET_TOP_POSTS,
    GET_TAG_POSTS,
    POST_ERROR,
    DELETE_POST,
    ADD_POST,
} from './posts.types';

// Get posts
export const getPosts = (searchQuery) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/posts/?search=${encodeURIComponent(searchQuery)}`);

        dispatch({
            type: GET_POSTS,
            payload: res.data.data,
        });

    } catch (err) {
        dispatch(setAlert((err.response.data.message || ''), 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};
// Get post
// export const searchPost = (searchQuery) => async(dispatch) => {
//     try {
//         const res = await axios.get(`/api/posts/?search=${searchQuery}`);

//         dispatch({
//             type: SEARCH_POSTS,
//             payload: res.data.data,
//         });

//     } catch (err) {
//         dispatch(setAlert(err.response.data.message, 'danger'));

//         dispatch({
//             type: POST_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status },
//         });
//     }
// };

export const getPost = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data.data,
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};
//Get userpost
export const getUserPost = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/users/${id}/posts`);

        dispatch({
            type: GET_POSTS,
            payload: res.data.data,
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};
//GET TOP POSTS
export const getTopPosts = () => async(dispatch) => {
    try {
        const res = await axios.get('/api/posts/top');

        dispatch({
            type: GET_TOP_POSTS,
            payload: res.data.data,
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

//GET TAG POSTS
export const getTagPosts = (tagName) => async(dispatch) => {
    try {
        const res = await axios.get(`/api/posts/tag/${encodeURIComponent(tagName)}`);

        dispatch({
            type: GET_TAG_POSTS,
            payload: res.data.data,
        });
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};

// Add post
export const addPost = (formData, cb) => async(dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const res = await axios.post('/api/posts', formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data.data,
        });

        dispatch(setAlert(res.data.message, 'success'));
        dispatch(getPosts());
        cb(null, res.data);

    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
        cb(err, null);
    }
};

// Delete post
export const deletePost = (id) => async(dispatch) => {
    try {
        const res = await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id,
        });

        dispatch(setAlert(res.data.message, 'success'));
        dispatch(getTags());
    } catch (err) {
        dispatch(setAlert(err.response.data.message, 'danger'));

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        });
    }
};