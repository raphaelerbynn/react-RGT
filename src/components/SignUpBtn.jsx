import { useNavigate } from "react-router-dom";
import "../style/LoginForm.css";


const SignUpBtn = () => {
    const navigate = useNavigate();
    
    const sendToPost = () => {
        navigate("/")
    }

    return (
        <button onClick={sendToPost} className="button"
        style={{
            padding: 10,
            background: "#2ac549",
            margin: 0
        }}>
            Sign up
        </button>
    )
}

export default SignUpBtn;