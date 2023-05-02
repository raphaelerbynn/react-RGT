
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup"
import "../style/LoginForm.css";
import { addPost } from "../redux/slice/postSlice";
import { useDispatch } from "react-redux";

const PostSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
  });

const PostForm = () => {
    const dispatch = useDispatch();

    const handleSubmit = async (values, {resetForm}) => {
        addPost(dispatch, values);
        resetForm();
    }

    return (
        <div>
            <h2 style={{textAlign: "center"}}>Create Post</h2>
            <Formik
                initialValues={{ title: '', content: '' }}
                validationSchema={PostSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                <Form className="form">
                    
                    {/* <label htmlFor="title" className="label">Title</label> */}
                    <ErrorMessage name="title" component="div" className="error"/>
                    <Field type="text" placeholder="title..." name="title" className="input"/>
                    
                    
                    {/* <label htmlFor="content" className="label">Content</label> */}
                    <ErrorMessage name="content" component="div" className="error"/>
                    <Field component="textarea" rows={20} placeholder="content..."  name="content" className="input"/>
                    
                    <button type="submit" disabled={isSubmitting} className="button">
                    Create Post
                    </button>
                </Form>
                )}
            </Formik>
        
        </div>
    )
}

export default PostForm;