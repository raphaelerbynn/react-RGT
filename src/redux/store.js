import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slice/postSlice";
import commentReducer from "./slice/commentSlice"

const store = configureStore({
    reducer: {
        posts: postReducer,
        comments: commentReducer,
    }
});


export default store;