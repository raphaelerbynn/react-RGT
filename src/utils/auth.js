import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_URL } from "./api";
import { createContext, useEffect, useState } from "react";

const TOKEN_KEY = "token";
const AuthContext = createContext();

const AuthProvider = ({children}) =>
{
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    
    useEffect(() => {
        const token = localStorage.getItem(TOKEN_KEY);
        setIsAuthenticated(token ? true : false);
        if (token){
            const {email} = jwt_decode(token);
            setUserId(email)
        }
    }, []);

    const login = async (email, password) => {
        try {
            
            const response = await axios.post(`${API_URL}/login`, { email, password });
            const { token } = response.data;
            // console.log(token)
            if (!token){
                return false
            }

            localStorage.setItem(TOKEN_KEY, token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAuthenticated(true);
            return true;
            
        } catch (error) {
            return false;
        }
    }

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
    };

    
    return (
        <AuthContext.Provider value={{login, logout, isAuthenticated, userId}}>
            {children}
        </AuthContext.Provider>
    )

}

const getAuthToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export {
    getAuthToken,
    AuthContext,
    AuthProvider,
}