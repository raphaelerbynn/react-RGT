import { createSlice } from "@reduxjs/toolkit"
import { _deletePost, createPost, getPost } from "../../utils/api";

const initialState = {
    values: [],
    loading: false,
    status: "idle",
    error: null
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        fetchPostStart: (state) => {
            state.loading = true;
            state.status = "fetching"
        },
        fetchPostsSuccess: (state, action) => {
            state.loading = false;
            state.status = "success";
            console.log(action.payload)
            state.values = state.values.concat(action.payload);
            
        },
        failedPostAction: (state, action) => {
            state.loading = false;
            state.status = 'failed';
            state.error = action.payload;
        },
        addPostsSuccess: (state, action) => {
            state.status = "success";
            state.values.push(action.payload);
        },
        deletePostsSuccess: (state, action) => {
            state.status = "success";
            state.values = state.values.filter((post) => post.id !== action.payload);
        }
    }
});

export const fetchPosts = async (dispatch, status) => {
    if (status !== "idle"){
        return
    }
    dispatch(fetchPostStart());
    
    try {

        const data = await getPost();
        // console.log(data)
        dispatch(fetchPostsSuccess(data));
        // console.log(data)
    } catch (error) {
        dispatch(failedPostAction(error.message));
    }
}

export const addPost = async (dispatch, data) => {
    try {
        await createPost(data);
        dispatch(addPostsSuccess(data));
    } catch(error) {
        dispatch(failedPostAction(error.message));
    }
}

export const deletePost = async (dispatch, postId) => {
    try {
        
        await _deletePost(postId);
        dispatch(deletePostsSuccess(postId));
    } catch (error) {
        dispatch(failedPostAction(error.message));
    }
  };

export const {fetchPostsSuccess, failedPostAction, addPostsSuccess, deletePostsSuccess, fetchPostStart} = postSlice.actions;
export default postSlice.reducer;


