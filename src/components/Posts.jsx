import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../style/Dashboard.css";
import "../style/LoginForm.css";
import { AuthContext } from "../utils/auth";
import Comments from "./Comments";
import { deletePost, fetchPosts } from "../redux/slice/postSlice";

const Post = () => {
  // const [posts, setPosts] = useState([]);
  const { userId, isAuthenticated } = useContext(AuthContext);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    return async () => {fetchPosts(dispatch, posts.status)};
  }, []);

  return (
    <>
      {" "}
      {posts.values.length > 0 ? (
        posts.values?.map((post) => (
          <div key={post.id} className="card" style={{ position: "relative" }}>
            <h2 className="cardHeading">{post.title}</h2>
            <p
              style={{
                whiteSpace: "pre-wrap",
              }}
              className="cardContent"
            >
              {post.content}
            </p>
            {/* {console.log(getDivRow())} */}
            {(isAuthenticated && post.userId===userId) && (
              <>
                <span
                  style={{
                    background: "#6f3131",
                    position: "absolute",
                    right: 20,
                    width: "12px",
                    height: "12px",
                    borderRadius: "15px",
                  }}
                ></span>
                <button className="button" 
                    onClick={() => deletePost(dispatch, post.id)}
                    style={{
                        fontSize: "0.8rem",
                        padding: 5,
                        background: "#e36c6c"
                    }}
                >del</button>
              </>
            )}

            <Comments postId={post.id} />
          </div>
        ))
      ) : (
        <div>No data</div>
      )}
    </>
  );
};

export default Post;
