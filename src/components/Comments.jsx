import { useContext, useEffect } from "react"
// import { createComment, getComments } from "../utils/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AuthContext } from "../utils/auth";
import * as yup from "yup";
import { addComment, fetchComments } from "../redux/slice/commentSlice";
import { useDispatch, useSelector } from "react-redux";

const CommentSchema = yup.object().shape({
    content: yup.string().required('Comment is required'),
  });

const Comments = ({postId}) => {
    const {isAuthenticated} = useContext(AuthContext);
    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comments);

    useEffect(() => {
            // console.log(comments);
            return async () => {
                fetchComments(dispatch, postId, comments);
            }

    }, [])

    const handleSubmit = async (values, {resetForm}) => {
        addComment(dispatch, values, postId)
        resetForm();
    }

    return (
        <div>
            
            {isAuthenticated && 
                <Formik 
                    initialValues={{content: ""}}
                    validationSchema={CommentSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form>
                        <div>
                            <Field type="text" placeholder="comment..." name="content" className="input"/>
                            <button type="submit" className="button" style={{marginLeft: 10, fontSize: "0.8rem"}} disabled={isSubmitting}>Comment</button>
                            <ErrorMessage name="content" component="div" className="error"/>
                        </div>
                        </Form>
                    )}
                    
                </Formik>
            }
            <div style={{
                    marginLeft: 50
                }}>
            Comments<br />
            {comments.values?.map((comment) => (
                <div key={comment.id} >
                    {postId === comment.postId && (
                        <>
                            {comment.content}
                        </>
                    )}
                    
                </div>
            ))}
            </div>
        </div>

    )
}

export default Comments;