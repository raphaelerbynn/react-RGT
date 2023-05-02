import { useContext } from "react";
import { AuthContext } from "../utils/auth";
import HButton from "./HButton";
import { useNavigate } from "react-router-dom";


const Header = () => {
    const {isAuthenticated, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    const nav = (path) => {
        navigate(path);
    }
    
    const logoutFunc = () => {
        logout();
        alert("Logged out");
        console.log(localStorage.getItem("TOKEN_KEY"))
        console.log(isAuthenticated);
        
    }

    return (
        <div style={{
            background: "#d2d2d2",
            display: "flex",
            justifyContent: "right",
        }}>
            {isAuthenticated ? ( 
                <div style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    margin: 10
                }}>
                    <HButton text="Create Post" color="##" path="/post" nav={() => nav("/post")}/>
                    <HButton text="Logout" color="#e31d1d" path="/dashboard" nav={logoutFunc}/>
                </div>
            ) : (
                <div style={{
                    display: "flex",
                    justifyContent: "right",
                    alignItems: "center",
                    margin: 10
                }}>
                    <HButton text="Sign in" color="##" path="/login" nav={() => nav("/login")}/>
                    <HButton text="Sign up" color="#2ac549" path="/login" nav={() => nav("/login")}/>
                </div>
            )}
            
        </div>
    )
}

export default Header;