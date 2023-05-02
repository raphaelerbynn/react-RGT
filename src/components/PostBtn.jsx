
import { useNavigate } from "react-router-dom";
import "../style/LoginForm.css";


const PostBtn = () => {
    const navigate = useNavigate();
    
    const sendToPost = () => {
        navigate("/post")
    }

    return (
        <button onClick={sendToPost} className="button"
        style={{
            padding: 10,
            background: "#44a767",
            fontSize: "0.8rem"
        }}>
            Make a post
        </button>
    )
}

export default PostBtn;