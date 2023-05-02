import { useNavigate } from "react-router-dom";
import "../style/LoginForm.css";


const LoginBtn = () => {
    const navigate = useNavigate();
    
    const sendToPost = () => {
        navigate("/login")
    }

    return (
        <button onClick={sendToPost} className="button"
        style={{
            padding: 10,
            margin: 5
        }}>
            Sign in
        </button>
    )
}

export default LoginBtn;