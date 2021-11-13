import { GET_USERS, GET_USER, USER_ERROR } from './users.types';

const initialState = {
    users: [],
    user: {
        id: '',
        username: '',
        views: 0,
        created_at: '',
        post_count: 0,
        answer_count: 0,
        votes: 0,
        tag_count: 0,
        comment_count: 0,
    },
    loading: true,
    error: {},
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        case USER_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}