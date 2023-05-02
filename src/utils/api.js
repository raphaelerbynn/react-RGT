import axios from "axios";
import { getAuthToken } from "./auth";

const API_URL = 
    "http://localhost:5000"
    // "http://172.20.10.5:5000"
    

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, 
    (err) => {
        console.error(err);
        return Promise.reject(err);
    }
);

const getPost = async () => {
    try{
        const response = await api.get("/post");
        return response.data;
    }catch(err){
        console.log(err);
        throw err;
    }
};

const createPost = async (data) => {
    try {
        const response = await api.post("/post", data);
        return response.data;
    } catch (err) {
        console.log(err)
        throw err;
    }
};

const _deletePost = async (postId) => {
    try {
        const response = await api.delete(`/post/${postId}`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

const getComments = async (postId) => {
    try {
        const response = await api.get(`/post/${postId}/comment`);
        return response.data;
    } catch (err) {
        throw err;
    }
};

const createComment = async (data, postId) => {
    try {
        const response = await api.post(`/post/${postId}/comment`, data);
        return response.data;
    } catch (err) {
        console.log(err)
        throw err;
    }
}

export {
    API_URL,
    getPost,
    createPost,
    _deletePost,
    getComments,
    createComment
};