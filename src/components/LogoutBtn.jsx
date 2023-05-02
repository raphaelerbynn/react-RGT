import { useContext } from "react";
import { AuthContext } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import "../style/LoginForm.css";

const LogoutBtn = () => {
    const navigate = useNavigate();
    const {logout, isAuthenticated} = useContext(AuthContext);

    const logoutFunc = () => {
        logout();
        alert("Logged out");
        console.log(localStorage.getItem("TOKEN_KEY"))
        console.log(isAuthenticated)
        navigate("/dashboard")
    }

    return (
        <button onClick={logoutFunc} className="button"
        style={{
            padding: 10,
            background: "#e31d1d",
            fontSize: "0.8rem"
        }}>
            Logout
        </button>
    )
}

export default LogoutBtn;