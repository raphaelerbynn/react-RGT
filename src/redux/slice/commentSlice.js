import { createSlice } from "@reduxjs/toolkit"
import { getComments, createComment } from "../../utils/api";

const initialState = {
    values: [],
    status: "idle",
    loading: false,
    error: null
}

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        fetchCommentStart: (state) => {
            state.loading = true;
            state.status = "loading";
            // state.values: []
        },
        fetchCommentsSuccess: (state, action) => {
            state.loading = false;
            state.status = "success";
            // console.log(action.payload)
            
            state.values = state.values.concat(action.payload)
        },
        failedCommentAction: (state, action) => {
            state.loading = false;
            state.status = 'failed';
            state.error = action.payload;
        },
        addCommentSuccess: (state, action) => {
            state.status = "success";
            state.values.push(action.payload);
        }
    }
});

export const fetchComments = async (dispatch, postId, {status, loading}) => {
    if (status !== "idle" || loading){
        return;
    }
    dispatch(fetchCommentStart());
    try {
        const data = await getComments(postId);
        // console.log(data)
        dispatch(fetchCommentsSuccess(data));
        // console.log(data)
    } catch (error) {
        dispatch(failedCommentAction(error.message));
    }
}

export const addComment = async (dispatch, data, postId) => {
    try {
        await createComment(data, postId);
        dispatch(addCommentSuccess(data));
    } catch(error) {
        dispatch(failedCommentAction(error.message));
    }
}


export const {fetchCommentsSuccess, failedCommentAction, addCommentSuccess, fetchCommentStart} = commentSlice.actions;
export default commentSlice.reducer;


